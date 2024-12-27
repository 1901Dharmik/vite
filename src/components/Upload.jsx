import React, { useEffect, useState } from "react";

const Upload = () => {
  const [images, setImages] = useState([]); // To store image data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  // Function to fetch image data
  const fetchImages = async () => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await fetch("http://localhost:8000/api/image/images");
      
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages(data); // Update the images state with fetched data
    } catch (err) {
      setError(err.message); // Set the error message if the fetch fails
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Use useEffect to fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Render the component based on the state
  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div>
      <h1>Image Gallery</h1>
      <div>
        {images.length > 0 ? (
          images?.map((image) => (
            <div key={image.id}>
              <img src={image.url} alt={image.name} />
              <p>{image.name}</p>
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default Upload;
