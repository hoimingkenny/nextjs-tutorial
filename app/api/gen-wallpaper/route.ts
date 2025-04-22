import { Modality } from "@google/genai";
import { getGoogleGenAI } from "@/app/service/geminiImagen";
import { uploadImage } from "@/lib/s3";
import * as fs from "node:fs";
import path from "node:path";

const IMAGE_DIR = path.join(process.cwd(), "public", "images");
const BASE_FILE_NAME = "gemini-native-image";

// Ensure the image directory exists
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Function to get the next file number
function getNextFileNumber() {
  const files = fs.readdirSync(IMAGE_DIR);
  const numbers = files
    .filter((file) => file.startsWith(BASE_FILE_NAME) && file.endsWith(".png"))
    .map((file) => {
      const match = file.match(/gemini-native-image-(\d+)\.png/);
      return match ? parseInt(match[1], 10) : 0;
    });
  const maxNumber = numbers.length ? Math.max(...numbers) : 0;
  return maxNumber + 1;
}

export async function POST(req: Request) {
  try {
    console.log("Generate image: /api/gen-wallpaper")

    const { description } = await req.json();
    if (!description) {
      return Response.json({
        code: 1,
        message: "Description is required",
      });
    }
    console.log(`Description: ${description}`);

    const client = getGoogleGenAI();
    const contents = `Hi, can you create a 3d rendered image of ${description}`;

    const response = await client.models.generateContent({
      // can only use in US
      model: "gemini-2.0-flash-exp-image-generation",
      contents: [{ parts: [{ text: contents }] }],
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate || !candidate.content || !candidate.content.parts) {
      throw new Error("Invalid response from Gimini API");
    }

    let imageData;
    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.mimeType === "image/png") {
        imageData = part.inlineData.data;
        break;
      }
    }

    if (!imageData) {
      throw new Error("No image data found in response");
    }

    // Generate unique file name
    const fileNumber = getNextFileNumber();
    const fileName = `${BASE_FILE_NAME}-${fileNumber
      .toString()
      .padStart(2, "0")}.png`;
    const filePath = path.join(IMAGE_DIR, fileName);

    // Save the image locally
    const buffer = Buffer.from(imageData, "base64");
    fs.writeFileSync(filePath, buffer);

    // Return the public URL (adjust based on your hosting setup)
    const imagePath = `/images/${fileName}`;

    console.log(`Image saved as ${imagePath}`);

    // upload to S3
    const s3Img = await uploadImage(
      fileName,
      process.env.AWS_BUCKET || "ai-wallpaper-hoimingkenny",
      `wallpapers/${fileName}`
    );

    return Response.json({
      code: 0,
      message: "SUCCESS",
      data: {
        img_des: description,
        img_path: imagePath,
        s3_location: s3Img.Location,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      {
        code: 1,
        message: "Failed to generate image",
      },
      { status: 400 }
    );
  }
}
