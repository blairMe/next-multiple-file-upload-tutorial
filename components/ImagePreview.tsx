import React from "react";
import Image from "next/image";

type Props = {
  images: File[];
};

const ImagePreview = ({ images: files }: Props) => {
  const isImage = (file: File) => {
    return file.type.startsWith('image/');
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        {files.map((file) => {
          const src = URL.createObjectURL(file);
          const fileType = file.type.split('/')[1];

          if (isImage(file)) {
            return (
              <div className="relative aspect-video col-span-4" key={file.name}>
                <Image src={src} alt={file.name} className="object-cover" fill />
              </div>
            );
          } else {
            return (
              <div className="flex items-center col-span-4 p-4 border rounded" key={file.name}>
                <div className="flex-shrink-0 mr-4">
                  {fileType === "pdf" ? (
                    <svg width="24" height="24" fill="currentColor" className="text-red-600">
                      <path d="M6 2h6v6h6v14H6V2zm8 0v6h6l-6-6zm-4 12h4v2H8v-2zm0-4h8v2H8v-2z"></path>
                    </svg>
                  ) : (
                    <svg width="24" height="24" fill="currentColor" className="text-blue-600">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-7V3.5L18.5 9H13z"></path>
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{file.name}</p>
                  <p className="text-xs text-gray-500">{fileType.toUpperCase()} File</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ImagePreview
