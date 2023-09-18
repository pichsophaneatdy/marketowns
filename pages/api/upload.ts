import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!,
    },
});

async function handler(req:any, res:any) {

    const bucketName = 'marketown-products';
    const key = 'image_' + new Date().getTime();
    try {
        const imageData = req.body;
        const imageBuffer = Buffer.from(JSON.stringify(imageData));
        const params = {
            Bucket: bucketName,
            Key: key,
            Body: imageBuffer,
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        res.status(200).json({ key: key });
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        res.status(500).json({ error: 'Unable to upload image to S3' });
    }
}

export default handler
