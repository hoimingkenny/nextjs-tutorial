import AWS from "aws-sdk";
import axios from "axios";
import fs from "fs";
import path from "node:path";


AWS.config.update({
  accessKeyId: process.env.AWS_AK,
  secretAccessKey: process.env.AWS_SK,
  region: process.env.AWS_REGION || "us-east-1",
});
const s3 = new AWS.S3();
const IMAGE_DIR = path.join(process.cwd(), "public", "images");


export async function uploadImage(
  fileName: string,
  bucketName: string,
  s3Key: string
) {
  try {
    const filePath = path.join(IMAGE_DIR, fileName);
    console.log(`Uploading file: ${filePath}`);
    const fileContent = fs.readFileSync(filePath);

    const uploadParams = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileContent,
      ContentType: "image/png",
    };

    const result = await s3.upload(uploadParams).promise();
    console.log(`File uploaded successfully: ${result.Location}`);
    return result; // Contains Location (URL), Bucket, Key
  } catch (e) {
    console.error("Upload failed");
    throw e;
  }
}

export async function downloadImage(imageUrl: string, outputPath: string) {
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      let error: Error | null = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });

      writer.on("close", () => {
        if (!error) {
          resolve(null);
        }
      });
    });
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}
