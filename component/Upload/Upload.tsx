import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons';
import styles from "./Upload.module.scss";
// React Drop Zone
import {useDropzone} from "react-dropzone";
import {useCallback} from "react";

interface UploadProps {
    selectedImages: File[],
    setSelectedImages: (img: any) => void
}

const Upload = ({selectedImages, setSelectedImages} : UploadProps) => {
    // React Dropzone
    const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
        acceptedFiles.forEach((file: any) => {
            setSelectedImages((prevState: any) => [...prevState, file]);
        });
    }, []);
    // Remove an image
    const removeImage = (index: number) => {
        setSelectedImages((prevImages: any) => {
            const updateImage = [...prevImages];
            updateImage.splice(index, 1);
            return updateImage;
        })
    }
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({onDrop});
    return (
        <div className={styles.container}>
            <div className={styles.dropzone} {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                <p>Drop file(s) here ...</p>
                ) : (
                <p>Drag and drop file(s) here, or click to select files</p>
                )}
            </div>
            <div className={styles.images}>
                {selectedImages.length > 0 &&
                selectedImages.map((image, index) => (
                    <div key={index} className={styles.images__preview}>
                        <img className={styles.images__img} src={`${URL.createObjectURL(image)}`}  alt="" />
                        <div className={styles.images__delete__container}>
                            <DeleteIcon onClick={() => removeImage(index)} className="images__delete-icon"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Upload;
