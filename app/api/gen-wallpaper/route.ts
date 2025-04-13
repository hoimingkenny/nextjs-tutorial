import { getGoogleGenAI } from "@/app/service/geminiImagen";
import * as fs from "node:fs";


export async function POST(req: Request) {
    const { description } = await req.json();
    console.log(description);

    const client = getGoogleGenAI();

    const contents = `Hi, can you create a 3d rendered image of ${description}`;
    // console.log(contents);

    const response = await client.models.generateContent({
        model: "gemini-2.0-flash-exp-image-generation",
        contents: contents,
        config: {
          responseModalities: ["Text", "Image"],
        },
      });

    console.log(response);

    console.log(response.candidates[0].content)
    for (const part of response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
        if (part.text) {
            console.log(part.text);
        } else if (part.inlineData) {
            console.log(part.inlineData)
            const imageData = part.inlineData.data;
            const buffer = Buffer.from(imageData, "base64");
            fs.writeFileSync("gemini-native-image.png", buffer);
            console.log("Image saved as gemini-native-image.png");
        }
    }

    return Response.json({
        code: 0,
        message: "SUCCESS",
        data: {
            img_url: "https://xxxx.xxx.com"
        }
    });
}