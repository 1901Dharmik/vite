import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  X,
  Upload,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageUploader() {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAllImages = () => {
    setImages([]);
  };

  const moveImage = (from, to) => {
    setImages((prev) => {
      const newImages = [...prev];
      const [removed] = newImages.splice(from, 1);
      newImages.splice(to, 0, removed);
      return newImages;
    });
  };

  const openPreview = (preview) => {
    setPreviewImage(preview);
    setZoomLevel(1);
  };

  const closePreview = () => {
    setPreviewImage(null);
    setZoomLevel(1);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-xl font-semibold mb-2">Drop or select file</p>
          <p className="text-sm text-gray-500">
            Drop files here or click to browse through your machine.
          </p>
        </div>
      </div>

      {images.length > 0 && (
        <div className="mt-8">
          <div className="grid grid-cols-6 gap-4">
            {images.map((image, index) => (
              <div key={image.preview} className="relative group">
                <img
                  src={image.preview}
                  alt={`Uploaded ${index + 1}`}
                  className="w-24 h-24 object-cover border rounded-lg cursor-pointer"
                  onClick={() => openPreview(image.preview)}
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                {index > 0 && (
                  <button
                    onClick={() => moveImage(index, index - 1)}
                    className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    onClick={() => moveImage(index, index + 1)}
                    className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white text-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={removeAllImages}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Remove all
            </button>
            <button
              onClick={() => {
                /* Handle upload logic here */
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Upload
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closePreview}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <motion.img
                src={previewImage}
                alt="Preview"
                className="max-w-full max-h-[90vh] object-contain"
                style={{ transform: `scale(${zoomLevel})` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              <button
                onClick={closePreview}
                className="absolute top-2 right-2 bg-white text-gray-800 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <button
                  onClick={() =>
                    setZoomLevel((prev) => Math.max(prev - 0.1, 0.1))
                  }
                  className="bg-white text-gray-800 rounded-full p-2"
                >
                  <ZoomOut className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setZoomLevel((prev) => Math.min(prev + 0.1, 3))
                  }
                  className="bg-white text-gray-800 rounded-full p-2"
                >
                  <ZoomIn className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
