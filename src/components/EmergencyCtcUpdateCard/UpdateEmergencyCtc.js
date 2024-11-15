import { useState, useEffect } from 'react';
import Swal from "sweetalert2";

const UpdateEmergencyCtc = ({ onClose, emergencyContactId }) => {
    const [emergencyDetails, setEmergencyDetails] = useState({});
    const [originalData, setOriginalData] = useState({});
    const [userType, setUserType] = useState("");

    const fetchSpecificData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/emergency/get-specific-emergency/${emergencyContactId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            const fetchedData = data.data;
            setEmergencyDetails(fetchedData);
            setOriginalData(fetchedData);
        });
    };

    const fetchUserType = () => {
        // fetch data from db
        fetch(`${process.env.REACT_APP_API_URL}/main/user-profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            // if there is data passed go to if and if there is non else
            if (data.auth !== "Failed") {
              setUserType(data.data.userType);
            } else {
              console.log(data);
            }
          });
    }

    // const updateSpecificData = (e) => {
    //     e.preventDefault();
        
    //     const formData = new FormData();

    //     // Append only modified fields to formData
    //     if (emergencyDetails.name !== originalData.name) formData.append('name', emergencyDetails.name);
    //     if (emergencyDetails.phone !== originalData.phone) formData.append('phone', emergencyDetails.phone);
    //     if (emergencyDetails.email !== originalData.email) formData.append('email', emergencyDetails.email);
    //     if (emergencyDetails.address !== originalData.address) formData.append('address', emergencyDetails.address);
    //     if (emergencyDetails.latitude !== originalData.latitude) formData.append('latitude', emergencyDetails.latitude);
    //     if (emergencyDetails.longtitude !== originalData.longtitude) formData.append('longtitude', emergencyDetails.longtitude);

    //     // Check if a new image has been selected; if not, retain the original image
    //     if (emergencyDetails.emergencyImage instanceof File) {
    //         formData.append('emergencyImage', emergencyDetails.emergencyImage);
    //     }

    //     if (formData.entries().length === 0) {
    //         Swal.fire({
    //             title: "No changes detected",
    //             icon: "info",
    //             text: "No fields have been modified.",
    //             confirmButtonText: 'OK',
    //         });
    //         return;
    //     }

    //     fetch(`${process.env.REACT_APP_API_URL}/emergency/update-emergency/${emergencyContactId}`, {
    //         method: 'PUT',
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //         body: formData
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data.isSuccess) {
    //             Swal.fire({
    //                 title: "Update Successful",
    //                 icon: "success",
    //                 text: "Emergency Contact Updated Successfully",
    //                 confirmButtonText: 'OK',
    //                 willClose: () => {
    //                     onClose();
    //                     window.location.reload();
    //                 }
    //             });
    //         } else {
    //             Swal.fire({
    //                 title: "Update failed",
    //                 icon: "error",
    //                 text: "Check details and try again."
    //             });
    //         }
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //     });
    // };

    const updateSpecificData = (e) => {
        e.preventDefault(); // Prevent the form from refreshing the page
        
        const formData = new FormData();
    
        // Compare and append only modified fields to formData
        if (emergencyDetails.name !== originalData.name) formData.append('name', emergencyDetails.name);
        if (emergencyDetails.phone !== originalData.phone) formData.append('phone', emergencyDetails.phone);
        if (emergencyDetails.email !== originalData.email) formData.append('email', emergencyDetails.email);
        if (emergencyDetails.address !== originalData.address) formData.append('address', emergencyDetails.address);
        if (emergencyDetails.latitude !== originalData.latitude) formData.append('latitude', emergencyDetails.latitude);
        if (emergencyDetails.longtitude !== originalData.longtitude) formData.append('longtitude', emergencyDetails.longtitude);
    
        // Only append emergencyImage if a new file is selected
        if (emergencyDetails.emergencyImage && emergencyDetails.emergencyImage !== originalData.emergencyImage) {
            formData.append('emergencyImage', emergencyDetails.emergencyImage);
        } else if (!emergencyDetails.emergencyImage) {
            // If no new image is selected, send a flag to retain the current image
            formData.append('retainOriginalImage', 'true');
        }
    
        if (formData.entries().length === 0) {
            Swal.fire({
                title: "No changes detected",
                icon: "info",
                text: "No fields have been modified.",
                confirmButtonText: 'OK',
            });
            return;
        }
    
        fetch(`${process.env.REACT_APP_API_URL}/emergency/update-emergency/${emergencyContactId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.isSuccess === true) {
                Swal.fire({
                    title: "Updating Successfully",
                    icon: "success",
                    text: "Emergency Contact Updated Successfully",
                    confirmButtonText: 'OK',
                    willClose: () => {
                        onClose();
                        window.location.reload();
                    }
                });
            } else {
                Swal.fire({
                    title: "Updating failed",
                    icon: "error",
                    text: "Check details and try again."
                });
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };
    


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmergencyDetails({
            ...emergencyDetails,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEmergencyDetails({
                ...emergencyDetails,
                emergencyImage: file,
            });
        }
    };

    useEffect(() => {
        fetchSpecificData();
        fetchUserType();
    }, [emergencyContactId,userType]);

    return (
        <div>
            <form onSubmit={updateSpecificData}>
                <h1 className='mb-5'>Update Emergency Contacts</h1>

                <div className='d-flex'>
                    <div className='form-group'>
                        <label>Emergency Name</label>
                        <input 
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={emergencyDetails.name || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='form-group ml-2'>
                        <label>Phone Number</label>
                        <input 
                            type='text'
                            className='form-control'
                            id='phone'
                            name='phone'
                            value={emergencyDetails.phone || ''}
                            onChange={handleInputChange}
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
                            name='email'
                            value={emergencyDetails.email || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='form-group'>
                        <label>Address</label>
                        <input 
                            type='text'
                            className='form-control'
                            id='address'
                            name='address'
                            value={emergencyDetails.address || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className='d-flex'>
                    <div className='form-group ml-2'>
                        <label>Latitude</label>
                        <input 
                            type='text'
                            className='form-control'
                            id='latitude'
                            name='latitude'
                            value={emergencyDetails.latitude || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='form-group ml-2'>
                        <label>Longitude</label>
                        <input 
                            type='text'
                            className='form-control'
                            id='longtitude'
                            name='longtitude'
                            value={emergencyDetails.longtitude || ''}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            { userType === "admin" &&( 
                <div className='form-group ml-2'>
                    <label>Emergency Image</label>
                    <input 
                        type='file'
                        className='form-control'
                        id='emergencyImage'
                        name='emergencyImage'
                        accept='image/*'
                       onChange={handleFileChange}
                       required
                    />
                </div>
            )}

                <div className='d-flex'>
                { userType === "admin" &&( 
                    <input type="submit" value="Submit" className="btn btn-primary mr-3" />
                )}
                
                    <button onClick={onClose} className='btn btn-danger'>Close</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmergencyCtc;
