import React, { useCallback, useState, useEffect, forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { FiX } from "react-icons/fi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

export const storeImage = async (file) => {
 
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloanURL) => {
          resolve(downloanURL);
        });
      }
    );
  });
};

// const ImageDropzone = ({ className, error, control, name, setValue }) => {
const ImageDropzone = forwardRef(
  ({ className, error, control, name, setValue, imagesURLs = [] }, ref) => {
    const { getValues } = useForm();

    const [files, setFiles] = useState(imagesURLs); //for uploading images
    console.log(imagesURLs);
   

    const onDrop = useCallback(
      async (acceptedFiles) => {
        try {
          // Upload all files and collect their URLs
          const newUrls = await Promise.all(
            acceptedFiles.map(async (file) => {
              try {
                const downloadURL = await storeImage(file);
                console.log(downloadURL);
                return downloadURL;
              } catch (error) {
                console.error("Error uploading file:", error);
                return null;
              }
            })
          );

          // Get the existing array of URLs from the form data
          const existingUrls = getValues(name) || [];
          console.log("Existing", existingUrls);

          // Combine the existing URLs with the new URLs
          const allUrls = [...existingUrls, ...newUrls];
          console.log("All", allUrls);

          // Set the updated array of URLs in the form data
          setValue(name, allUrls);

          // Update the state to include the uploaded files
          const uploadedFiles = acceptedFiles.map((file, index) => ({
            file,
            preview: URL.createObjectURL(file),
            downloadURL: newUrls[index],
          }));
          setFiles((previousFiles) => [...previousFiles, ...uploadedFiles]);
        } catch (error) {
          console.error("Error uploading files:", error);
        }
      },
      [setValue, name]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [],
      },
    });

   
    const removeFile = (name) => {
      setFiles((files) =>
        files.filter((file) => file?.file?.name || file !== name)
      );
    };

    useEffect(() => {
      console.log(files);
      //  console.log(allUrls);
    }, [files]); // Log files whenever it changes

    return (
      <>
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>

        <ul className="grid grid-cols-3 gap-3 mt-5">
          {files.map((file, index) => (
            <li key={file.name || index}>
              <Image
                src={file.preview || file}
                alt=""
                width={200}
                height={200}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview || file);
                }}
                // className="h-full w-full object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => removeFile(file?.file?.name || file)}
                className="w-7 h-7 border border-red-400 rounded-full"
                radius={10}
              >
                <FiX
                  className="w-5 h-5 fill-white "
                  style={{
                    color: "#dd1313",
                  }}
                />
              </button>
              <p>{file.name}</p>
            </li>
          ))}
        </ul>
        <p>{error}</p>
      </>
    );
  }
);

export default ImageDropzone;
