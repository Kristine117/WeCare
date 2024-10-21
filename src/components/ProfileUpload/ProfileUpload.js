import React, { useState } from 'react';

const ProfileUpload = ({ onFileSelect }) => {
  const [errorMessage, setErrorMessage] = useState('');

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   const maxSizeInBytes = 400 * 1024 * 1024;

  //   if (file) {
  //     // Check if the file size exceeds 100 KB
  //     if (file.size > maxSizeInBytes) {
  //       setErrorMessage('File size exceeds 100KB. Please upload a smaller file.');
  //       return; // Exit early if the file is too large
  //     }

  //     // Clear any previous error messages
  //     setErrorMessage('');

  //     // Convert file to base64 string or pass the file object directly
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       onFileSelect(reader.result); // Pass the base64 string to the parent component
  //     };
  //     reader.readAsDataURL(file); // Converts file to base64
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 400 * 1024 * 1024;
  
    if (file) {
      if (file.size > maxSizeInBytes) {
        setErrorMessage('File size exceeds 100KB. Please upload a smaller file.');
        return;
      }
  
      setErrorMessage('');
      onFileSelect(file); // Pass the file object directly
    }
  };
  

  return (
    <div className="form-group d-block mt-4">
      <label htmlFor="profile">Profile Picture: </label>
      <input 
        type="file" 
        id="profile" 
        name="profile" 
        accept="image/*" // Limit file selection to images
        onChange={handleFileChange} 
      />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default ProfileUpload;
