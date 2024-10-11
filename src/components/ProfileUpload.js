import React, { useState } from 'react';

const ProfileUpload = ({ onFileSelect }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 100 * 1024; // 100 KB

    if (file) {
      // Check if the file size is greater than 100 KB
      if (file.size > maxSizeInBytes) {
        setErrorMessage('File size exceeds 100KB. Please upload a smaller file.');
        return; // Exit early if the file is too large
      }

      // Clear any previous error messages
      setErrorMessage('');

      // Convert file to base64 string or pass the file object directly
      const reader = new FileReader();
      reader.onloadend = () => {
        onFileSelect(reader.result); // You can pass the base64 string here
      };
      reader.readAsDataURL(file); // Converts file to base64
    }
  };

  return (
    <div className="form-group d-block mt-4">
      <label>Profile Picture: </label>
      <input type="file" id="profile" name="profile" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Show error message */}
    </div>
  );
};

export default ProfileUpload;
