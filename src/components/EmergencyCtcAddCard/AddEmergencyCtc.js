import React, { useState } from 'react';
import Swal from "sweetalert2";
import addEmergencyModule from "./AddEmergencyCtc.module.css";

const AddEmergencyCtc = ({ onClose }) => {
  // State variables for each input field
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longtitude, setlongtitude] = useState('');
  const [emergencyImage, setEmergencyImage] = useState(null);

  // Handle form submission
  const saveEmergencyCtc = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('address', address);
    formData.append('emergencyImage', emergencyImage);
    formData.append('latitude', latitude);
    formData.append('longtitude', longtitude);
   

    // Print all data present in the form
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    fetch(`${process.env.REACT_APP_API_URL}/emergency/register-emergency-hotline`, {
      method:'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.isSuccess === true) {
        // Swal.fire({ title: "Registered Successfully", icon: "success", text: "Emergency Contact Saved Successfully" });
        Swal.fire({
          title: "Registered Successfully",
          icon: "success",
          text: "Emergency Contact Saved Successfully",
          confirmButtonText: 'OK',
          // Adding onClick event to the OK button
          willClose: () => {
            // Close the modal
            onClose();
            // Refresh the page
            window.location.reload();
          }
        });
      } else {
        console.log(data);
        Swal.fire({ title: "Registration failed", icon: "error", text: "Check details and try again." });
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <div className='d-flex'>
      <form action="" className='d-block' onSubmit={saveEmergencyCtc}>
        <h1 className='mb-5'>Add Emergency Contacts</h1>
        
        <div className='d-flex'>
          <div className='form-group'>
            <label>Emergency Name</label>
            <input 
              type='text'
              className='form-control'
              id='name'
              placeholder='Please input Emergency name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className='form-group ml-2'>
            <label>Phone Number</label>
            <input 
              type='text'
              className='form-control'
              id='phone'
              placeholder='Please input Phone Number'
              name='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='d-flex'>
          <div className='form-group'>
            <label>Email</label>
            <input 
              type='text'
              className='form-control'
              id='email'
              placeholder='Please input Emergency Email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-group ml-2'>
            <label>Address</label>
            <input 
              type='text'
              className='form-control'
              id='address'
              placeholder='Please input Emergency Address'
              name='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='d-flex'>
          <div className='form-group'>
            <label>Latitude</label>
            <input 
              type='text'
              className='form-control'
              id='latitude'
              placeholder='Please input Map latitude'
              name='latitude'
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>

          <div className='form-group ml-3'>
            <label>Longtitude</label>
            <input 
              type='text'
              className='form-control'
              id='longtitude'
              placeholder='Please input Map longtitude'
              name='longtitude'
              value={longtitude}
              onChange={(e) => setlongtitude(e.target.value)}
              required
            />
          </div>
        </div>

        <div className='form-group'>
          <label>Emergency Image</label>
          <input 
            type='file'
            className='form-control'
            id='emergencyImage'
            name='emergencyImage'
            accept='image/*'
            onChange={(e) => setEmergencyImage(e.target.files[0])}
            required
          />
        </div>

        <div className='d-flex'>
          <input type="submit" value="Submit" className="btn btn-primary mr-3" />
          <button onClick={onClose} className='btn btn-danger'>Close</button>
        </div>        
      </form>
    </div>
  );
};

export default AddEmergencyCtc;
