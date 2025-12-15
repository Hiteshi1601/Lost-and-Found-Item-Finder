import AWS from "aws-sdk";
import fs from "fs";
const s3 = new AWS.S3({
    accessKeyId: "YOUR_AWS_ACCESS_KEY",
    secretAccessKey: "YOUR_AWS_SECRET_KEY",
    region: "YOUR_AWS_REGION"
});
export const uploadToS3 = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);
    const params = {
        Bucket: "YOUR_BUCKET_NAME",
        Key: fileName,
        Body: fileContent,
        ACL: "public-read"
    };
    const data = await s3.upload(params).promise();
    return data.Location; // URL of uploaded image
};