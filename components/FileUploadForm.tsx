"use client"; 

import React, { FormEvent, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import SelectedFilesPreview from "./SelectedFilesPreview";
import axios from "axios";
import classNames from "classnames";

const FileUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles = selectedFiles.filter(
        (file) => !selectedFiles.some((existingFile) => existingFile.name === file.name)
      );
      setSelectedFiles((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const handleRemoveFile = (fileName: string) => {
    setSelectedFiles((prevImages) => prevImages.filter((file) => file.name !== fileName));
  };

  const handleFilesSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Clicked")
    const formData = new FormData();
    selectedFiles.forEach((image) => {
      formData.append(image.name, image);
    });
    console.log(formData, "form data")
    setUploading(true);
    // await axios.post("/api/upload", formData);
    // setUploading(false);
  };

  return (
    <form className="w-full" onSubmit={handleFilesSubmit}>
      <div className="flex justify-between">
        <CustomFileSelector
          accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
          onChange={handleFileSelected}
        />
        <button
          type="submit"
          className={classNames({
            "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md": true,
            "disabled pointer-events-none opacity-40": uploading,
          })}
          disabled={uploading}
        >
          Upload
        </button>
      </div>
      <SelectedFilesPreview files={selectedFiles} onRemoveFile={handleRemoveFile} />
    </form>
  );
};

export default FileUploadForm;
