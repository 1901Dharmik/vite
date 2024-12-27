import React, { useState, useEffect } from 'react';
import { Search, Download, Check, Eye, X, Trash2,Share2  } from 'lucide-react';

const API_URL = "http://localhost:8000/api/images";

export default function ImageListPage() {
  const [allImages, setAllImages] = useState([]);
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filteredImages = allImages.filter(image =>
        image.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setImages(filteredImages);
    } else {
      setImages(allImages);
    }
  }, [searchTerm, allImages]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      setAllImages(data);
      setImages(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleImageSelect = (_id) => {
    setSelectedImages(prev =>
      prev.includes(_id) ? prev.filter(imageId => imageId !== _id) : [...prev, _id]
    );
  };

  const handleDownload = async () => {
    const selectedFileNames = images
      .filter(image => selectedImages.includes(image._id))
      .map(image => image.fileName);

    for (const fileName of selectedFileNames) {
      const image = images.find(img => img.fileName === fileName);
      if (image) {
        try {
          const response = await fetch(image.url);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error(`Error downloading ${fileName}:`, error);
        }
      }
    }
  };
  const handleDownloadAll = async () => {
    for (const image of images) {
      try {
        const response = await fetch(image.url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = image.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error(`Error downloading ${image.fileName}:`, error);
      }
    }
  };

  const handlePreview = (image) => {
    setPreviewImage(image);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        const response = await fetch(`${API_URL}/${_id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete image');
        }
        setAllImages(prevImages => prevImages.filter(image => image._id !== _id));
        setImages(prevImages => prevImages.filter(image => image._id !== _id));
        setSelectedImages(prevSelected => prevSelected.filter(imageId => imageId !== _id));
      } catch (err) {
        console.error('Error deleting image:', err);
        alert('Failed to delete image. Please try again.');
      }
    }
  };

  const handleWhatsAppShare = () => {
    const selectedUrls = images
      .filter(image => selectedImages.includes(image._id))
      .map(image => image.url)
      .join('\n');
    
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(selectedUrls)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="relative flex-grow mr-4">
          <input
            type="text"
            placeholder="Search by filename"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={selectedImages.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
        >
          <Download className="mr-2" />
          Download Selected ({selectedImages.length})
        </button>
        {/* <button
          onClick={handleWhatsAppShare}
          disabled={selectedImages.length === 0}
          className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
        >
          <Share2 className="mr-2" />
          Share on WhatsApp
        </button> */}
        <button
          onClick={handleDownloadAll}
          disabled={images.length === 0}
          className="bg-purple-500 text-white px-4 py-2 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
        >
          <Download className="mr-2" />
          Download All ({images.length})
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(image => (
          <div key={image._id} className="relative cursor-pointer group">
            <img
              src={image.url}
              alt={image.fileName}
              className="w-full h-48 object-cover rounded-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <input
                type="checkbox"
                checked={selectedImages.includes(image._id)}
                onChange={() => handleImageSelect(image._id)}
                className="sr-only"
                id={`checkbox-${image._id}`}
              />
              <label
                htmlFor={`checkbox-${image._id}`}
                className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
                  selectedImages.includes(image._id) ? 'bg-blue-500 border-blue-500' : 'border-white'
                }`}
              >
                {selectedImages.includes(image._id) && <Check className="text-white w-4 h-4" />}
              </label>
              <button
                onClick={() => handlePreview(image)}
                className="ml-2 bg-white bg-opacity-75 p-1 rounded-full"
              >
                <Eye className="text-gray-800 w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(image._id)}
                className="ml-2 bg-red-500 bg-opacity-75 p-1 rounded-full"
              >
                <Trash2 className="text-white w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-md">
              {image.fileName}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No images found matching your search.</p>
      )}

      {previewImage && (
        <ImagePreviewPopup
          image={previewImage}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
}

const ImagePreviewPopup = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{image.fileName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <img src={image.url} alt={image.fileName} className="max-w-full h-auto" />
      </div>
    </div>
  );
};