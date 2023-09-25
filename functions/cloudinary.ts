export const handleUpload = async (images: File[]): Promise<string[]> => {
    const uploadUrls: string[] = [];

    for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "UpDaily");

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        const data = await response.json();
        uploadUrls.push(data.secure_url);
    }
    return uploadUrls
}