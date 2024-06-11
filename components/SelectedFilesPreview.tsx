import React from "react";
import Image from "next/image";

// Props for ImagePreview component
type Props = {
  files: File[];
  onRemoveFile: (fileName: string) => void;
};

const SelectedFilesPreview = ({ files: files, onRemoveFile }: Props) => {
  const isImage = (file: File) => {
    return file.type.startsWith('image/');
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        {files.map((file) => {
          const src = URL.createObjectURL(file);
          const fileType = file.type.split('/')[1];

          return (
            <div className="relative aspect-video col-span-4" key={file.name}>
              {isImage(file) ? (
                <div className="relative aspect-video col-span-">
                  <Image src={src} alt={file.name} className="object-cover" fill />
                </div>
              ) : (
                <div className="flex items-center col-span-4 p-4 border rounded">
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
              )}
              <button type="button" 
                className="absolute top-1 right-1 text-white bg-red-500 hover:bg-white hover:text-red-600 rounded-lg text-sm w-5 h-5 ms-auto inline-flex justify-center items-center dark:hover:bg-red-600 dark:hover:text-white"
                onClick={() => onRemoveFile(file.name)}
                data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Remove</span>
                </button>        
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedFilesPreview;

