import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, ArrowLeft, ArrowRight, Upload, Folder } from 'lucide-react';

export default function Component() {
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setImages((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const removeAllImages = () => {
    setImages([]);
  };

  const moveImage = (index, direction) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      const [removed] = newImages.splice(index, 1);
      newImages.splice(direction === 'left' ? index - 1 : index + 1, 0, removed);
      return newImages;
    });
  };

  const uploadImages = async () => {
    setIsUploading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    console.log('Uploading images:', images);
  };

  return (
    <div className="max-w-2xl p-6 bg-white rounded-xl my-4 mx-3 lg:mx-0">
      <h2 className="text-2xl font-bold mb-4">Images</h2>
      <div
        {...getRootProps()}
        className={`border border-dashed bg-image-man rounded-lg p-8 mb-4 text-center cursor-pointer ${
          isDragActive ? 'border-emerald-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {/* <Folder className="mx-auto h-12 w-12 text-gray-400" /> */}
        <div className="flex justify-center items-center hover:opacity-65">
        <img src="./images/uploadfiles.svg" className='h-28 w-28' alt="" />
        </div>
        <p className="mt-4 text-lg font-semibold">Drop or select file</p>
        <p className="text-sm text-gray-500">
          Drop files here or click to{' '}
          <span className="text-emerald-500 hover:underline">browse</span> through your
          machine.
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.preview}
                alt={`preview ${index}`}
                className="bg-green-100 aspect-square h-30 w-40  object-cover rounded-xl"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-gray-500/80 rounded-full p-[3px] opacity-1 group-hover:opacity-100 transition-opacity hover:bg-gray-600"
              >
                <X className="h-3 w-3 text-white" />
              </button>
              <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 opacity-1 group-hover:opacity-100 transition-opacity">
                {index > 0 && (
                  <button
                    onClick={() => moveImage(index, 'left')}
                    className="bg-white rounded-full p-1 shadow-md"
                  >
                    <ArrowLeft className="h-4 w-4 text-gray-600" />
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    onClick={() => moveImage(index, 'right')}
                    className="bg-white rounded-full p-1 shadow-md"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-600" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={removeAllImages}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Remove all
        </button>
        <button
          onClick={uploadImages}
          disabled={images.length === 0 || isUploading}
          className={`px-4 py-1.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex items-center ${
            (images.length === 0 || isUploading) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {isUploading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-5 w-5" />
              Upload
            </>
          )}
        </button>
      </div>
    </div>
  );
}
