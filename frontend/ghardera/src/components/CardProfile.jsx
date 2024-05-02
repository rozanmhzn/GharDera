import React, { useEffect, useState } from "react";
import { storeImage } from "./ImageDropzone";
import { Controller } from "react-hook-form";

const ImgUpload = ({ onChange, src }) => (
  <label className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const CardProfile = ({ control, setValue, image }) => {
  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(image);

  const photoUpload = async (e) => {
    try {
      const downloadURL = await storeImage(e.target.files[0]);
      setValue("avatar", downloadURL);
      const reader = new FileReader();
      const newFile = e.target.files[0];
      reader.onloadend = () => {
        setFile(newFile);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(newFile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setImagePreviewUrl(image);
  }, [image]);

  return (
    <div>
      <Controller
        control={control}
        name={"avatar"}
        rules={{ required: "Image is required" }}
        render={({ field }) => (
          <ImgUpload {...field} onChange={photoUpload} src={imagePreviewUrl} />
        )}
      />
    </div>
  );
};

export default CardProfile;
