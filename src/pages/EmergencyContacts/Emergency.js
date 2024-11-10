import { useState, useEffect, useRef, useContext } from 'react';
import SideMenu from "../../components/SideMenu/SideMenu";
import emergencyModule from "./Emergency.module.css";
import AddEmergencyCtc from '../../components/EmergencyCtcAddCard/AddEmergencyCtc';
import UpdateEmergencyCtc from '../../components/EmergencyCtcUpdateCard/UpdateEmergencyCtc';
import Swal from "sweetalert2";
import UserContext from "../../UserContext";

const Emergency = () => {
  const [isAddContactEmergency, setIsAddContactEmergency] = useState(false);
  const [isUpdateContactEmergency, setIsUpdateContactEmergency] = useState(false);
  const [isDeleteContactEmergency, setIsDeleteContactEmergency] = useState(false);
  const [emergencyData, setEmergencyData] = useState([]); // Store the fetched data
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // For storing the modal position
  const [selectedEmergencyId, setSelectedEmergencyId] = useState(null); // Store selected emergency contact ID
  const [openModalId, setOpenModalId] = useState(null); // Track which contact's modal is open
  const [userType, setUserType] = useState("");

  const addContactRef = useRef(null);
  const updateContactRef = useRef(null);
  const actionModalRef = useRef(null); // Ref for the "View" and "Delete" modal

  const openAction = (event, contactId) => {
    const { clientX, clientY } = event;

    setModalPosition({
      top: clientY + 20,
      left: clientX - 30,
    });

    setOpenModalId(openModalId === contactId ? null : contactId); // Toggle modal for the selected contact
  };

  const openAddEmergency = () => {
    setIsAddContactEmergency((prev) => !prev);
  };

  const openUpdateEmergency = (id) => {
    setSelectedEmergencyId(id); // Set the selected emergency contact ID
    setIsUpdateContactEmergency(true); // Open the update modal
  };

  const closeUpdateEmergency = () => {
    setIsUpdateContactEmergency(false);
    setSelectedEmergencyId(null); // Clear the selected ID when closing
  };

  const openDeleteEmergency = (id) => {
    setSelectedEmergencyId(id);
    setIsDeleteContactEmergency(true); // Open delete modal
  };

  const closeDeleteEmergency = () => {
    setIsDeleteContactEmergency(false); // Close the delete modal
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

  const fetchData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/emergency/get-emergency`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmergencyData(data.data); // Set the fetched data into state
      });
  };

  const deleteData = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/emergency/delete-emergency/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.isSuccess === true) {
        Swal.fire({
          title: "Deleted Successfully",
          icon: "success",
          text: "Emergency Contact Deleted Successfully",
          confirmButtonText: 'OK',
          willClose: () => {
            // Refresh data after successful deletion
            fetchData();
            setIsDeleteContactEmergency(false);
          }
        });
      } else {
        Swal.fire({ title: "Deletion failed", icon: "error", text: "Please try again." });
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  // Close modal if click is outside the add/update contact modal container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addContactRef.current && !addContactRef.current.contains(event.target) && isAddContactEmergency) {
        setIsAddContactEmergency(false);
      }
      if (updateContactRef.current && !updateContactRef.current.contains(event.target) && isUpdateContactEmergency) {
        setIsUpdateContactEmergency(false);
      }
      if (actionModalRef.current && !actionModalRef.current.contains(event.target) && openModalId !== null) {
        setOpenModalId(null); // Close "View" and "Delete" modal if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAddContactEmergency, isUpdateContactEmergency, openModalId]);

  useEffect(() => {
    fetchData();
    fetchUserType();
  }, [userType]);

  return (
    <main className='d-flex'>
      <SideMenu />
      <div className='d-block'>
        <div className={`${emergencyModule.headerContainer}`}>
          <div className={`${emergencyModule.headerTitle}`}>Emergency Contacts</div>
        </div>

        <div className='container m-5'>
          {emergencyData.length > 0 ? (
            emergencyData.map((contact, index) => (
              <div key={index} className={`${emergencyModule.emergencyContactContainer}`}>
                <div className='d-flex align-items-center'>
                  <img className={`${emergencyModule.imgSize}`} src={`http://localhost:4000/profilePictures${contact.emergencyImage}`} alt="Emergency" />
                  <div className='d-block ml-3'>
                    <p className={`${emergencyModule.labelEmergency}`}>{contact.name}</p>
                    <p className={`${emergencyModule.labelEmergency}`}>Hotline: {contact.phone}</p>
                  </div>
                </div>

                <div className={`${emergencyModule.threeDots}`} onClick={(e) => openAction(e, contact.emergencyId)}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                {openModalId === contact.emergencyId && (
                  <div
                    className={`${emergencyModule.card}`}
                    style={{
                      top: `${modalPosition.top}px`,
                      left: `${modalPosition.left}px`,
                    }}
                    ref={actionModalRef} // Attach the ref to the action modal container
                  >
                    <div className={`mt-1 ml-3`} onClick={() => openUpdateEmergency(contact.emergencyId)}>View</div>

                    { userType === "admin" ? (
                      <div className={`ml-3`} onClick={() => openDeleteEmergency(contact.emergencyId)}>Delete</div>
                    ) : (
                      <div className={`ml-3`}>Call</div>
                    )}  
                    
                  </div>
                )}

                {isUpdateContactEmergency && selectedEmergencyId === contact.emergencyId && (
                  <div className={`${emergencyModule.darkOverlay} d-flex align-items-center justify-content-center`}>
                    <div ref={updateContactRef} className={`${emergencyModule.AddEmergencycard}`}>
                      <UpdateEmergencyCtc onClose={closeUpdateEmergency} emergencyContactId={selectedEmergencyId} />
                    </div>
                  </div>
                )}

                {isDeleteContactEmergency && selectedEmergencyId === contact.emergencyId && (
                  <div className={`${emergencyModule.darkOverlay} d-flex align-items-center justify-content-center`}>
                    <div className={`${emergencyModule.AddEmergencycard} d-flex align-items-center`}>
                      <div className='mb-5'>Are you sure you want to delete this emergency contact?</div>
                      <div className='d-flex'>
                        <button onClick={() => deleteData(contact.emergencyId)} className="btn btn-danger mr-3">Delete</button>
                        <button onClick={closeDeleteEmergency} className='btn btn-secondary'>Close</button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))
          ) : (
            <p>No emergency contacts available</p>
          )}
        </div>


        { userType === "admin" &&(      
        <div className='container m-5' onClick={openAddEmergency}>
          <div className={`${emergencyModule.emergencyContainer}`}>
            <div className='d-flex align-items-center'>
              <span className={`material-symbols-outlined ${emergencyModule.customAddIcon}`}>add_circle</span>
              <div className='d-block ml-3'>
                <p className={`${emergencyModule.labelEmergency}`}>Add Contact</p>
              </div>
            </div>
          </div>
        </div>
        )}

      </div>
   

      {isAddContactEmergency && (
        <div className={`${emergencyModule.darkOverlay} d-flex align-items-center justify-content-center`}>
          <div ref={addContactRef} className={`${emergencyModule.AddEmergencycard}`}>
            <AddEmergencyCtc onClose={openAddEmergency} />
          </div>
        </div>
      )}
    </main>
  );
};

export default Emergency;
