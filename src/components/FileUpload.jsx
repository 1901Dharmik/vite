import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentCompleted = Math.round((loaded * 100) / total);
        setUploadProgress({ ...uploadProgress, [progressEvent.config.data.get('files').name]: percentCompleted });
      },
    };

    try {
      const response = await axios.post('your-upload-url', formData, config);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>
        {filePreviews.map((preview, index) => (
          <div key={index}>
            <img src={preview} alt={`file-preview-${index}`} width="100" />
            <div>
              {uploadProgress[files[index]?.name] ? (
                <>
                  <p>Progress: {uploadProgress[files[index].name]}%</p>
                  {uploadProgress[files[index].name] === 100 && <p>Done</p>}
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
