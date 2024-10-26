import React, { useState,useEffect,useRef } from 'react';
import { FaPlus } from 'react-icons/fa'; 
import styles from './Notes.module.css';
import { FaThumbtack} from 'react-icons/fa'; 
import { PiNutFill } from 'react-icons/pi';
import Swal from 'sweetalert2';

function NotesComponent({loggedInUserId}) {
  const [notes, setNotes] = useState([]);
  const [list,setList] = useState([]);
  const [userId, setUserId] = useState(loggedInUserId);
  const [note, setNote] = useState({ appointmentId: 0, noteContent: "", isPinned: false, createdBy: userId });
  const [isFormActive, setIsFormActive] = useState(false);
  const [status,setStatus ]= useState("approve");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [reminderDate ,setReminderDate] = useState("")
  const [reminderTime ,setReminderTime] = useState("")

  const modalRef = useRef(null); // Create a reference for the modal
  const modalRef2 = useRef(null);
 


  useEffect(()=>{
    async function getAppointmentList(){

        const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/appointment-list`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "status": status
              },
        })
        const parseData = await data.json();
        setList(parseData?.data);
        console.log(list)
      
    }

      getAppointmentList();
  },[])

  // Fetch all notes function
  const fetchAllNotes = async () => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/notes/getALLNotes/${encodeURIComponent(userId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
    });

    const parseData = await data.json();
    setNotes(parseData.notes);
  };

  // UseEffect to fetch notes on component mount
  useEffect(() => {
    fetchAllNotes();
  }, []);

  const showForm = () => {
    setIsFormActive(true); // Toggle between true and false
  };

  const hideForm = () => {
    setIsFormActive(false); // Toggle between true and false
  };

  // Handle input change for note content
  const handleNoteContentChange = (e) => {

      setNote((prevNote) => ({
        ...prevNote,
        noteContent: e.target.value, // Only update noteContent
      }));
    
  };

  // Handle appointment selection
  const handleSelectChange = (e) => {
    setNote((prevNote) => ({
      ...prevNote,
      appointmentId: e.target.value, // Update appointmentId
    }));
  };

   // Handle clicks and touches outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalVisible && modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // Handle touch events

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [modalVisible]);

  useEffect(() => {

  const handleClickOutsideReminder = (event) => {
    if (modalVisible2 && modalRef2.current && !modalRef2.current.contains(event.target)) {
      handleCloseModalForReminder();
    }
    };

    // Add event listeners
    document.addEventListener('mousedown', handleClickOutsideReminder);
    document.addEventListener('touchstart', handleClickOutsideReminder); // Handle touch events

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideReminder);
      document.removeEventListener('touchstart', handleClickOutsideReminder);
    };
  }, [modalVisible2]);


  const handleOpenModal = (noteId) => {
    setSelectedNote(noteId);
    setModalVisible(true);
  };

  const handleOpenModalForReminder = (noteId) => {
    setSelectedNote(noteId);
    setModalVisible2(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedNote(null);
  };
  const handleCloseModalForReminder = () => {
    setModalVisible2(false);
    setSelectedNote(null);
  };


  const deleteNote = async (noteId) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ noteId }) // Send the noteId in the request body
        });

        const result = await response.json();
       
        if (result.isSuccess) {
          fetchAllNotes();
          Swal.fire({
            title: 'Note Deleted!',
            text: 'Note has been successfully deleted.',
            icon: 'success',
            confirmButtonText: 'OK',
          });    
           
        } else {
            console.error('Failed to delete note:', result.message);
        }
    } catch (error) {
        console.error('Error deleting note:', error);
        Swal.fire({
          title: 'Delete Failed',
          text: 'There was an error while deleting your note. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        
    }
};


const updateNote = async (noteItem) => {

  const isPinned = noteItem.isPinned ? false : true;
  const noteId =noteItem.noteId;

  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/updateNote`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ noteId,isPinned }) // Send the noteId in the request body
      });

        const result = await response.json();
        
        if (result.isSuccess) {
          handleCloseModal();
          fetchAllNotes();
        } else {
            console.error('Failed to update note:', result.message);
        }
    } catch (error) {
        console.error('Error deleting note:', error);
      
    }
};


  const submitNote = async (noteData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/notes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(noteData) 
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to submit note');
      }

      Swal.fire({
        title: 'Note Submitted!',
        text: 'Note has been successfully saved.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
  
      // Fetch all notes after the note has been submitted
      await fetchAllNotes(); // Wait for fetchAllNotes to complete
    } catch (error) {
      console.error('Error submitting note:', error);
        // Show error alert using SweetAlert2
        Swal.fire({
          title: 'Submission Failed',
          text: 'There was an error while saving your note. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
    }
  };

  const submitReminder = async (noteData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/reminders/createReminder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          appointmentId: noteData.appointmentId,
          reminderDate: reminderDate,
          reminderTime: reminderTime
        })
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to submit reminder');
      }
      // Show success alert using SweetAlert2
      Swal.fire({
        title: 'Reminder Set!',
        text: 'Your reminder has been successfully submitted.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      // Reset form fields
      setReminderTime("");
      setReminderDate("");
  
      // Close modal after success
      handleCloseModalForReminder();
  
      // Fetch all notes after reminder submission
      await fetchAllNotes();
      
    } catch (error) {
      console.error('Error submitting reminder:', error);
      
      // Show error alert using SweetAlert2
      Swal.fire({
        title: 'Submission Failed',
        text: 'There was an error while submitting your reminder. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(note.appointmentId !==0 && note.noteContent !== ""){

   const noteData = { ...note, createdBy: userId };
    submitNote(note)
     

    // Reset the note state after submission
    setNote({ appointmentId: 0, noteContent: "", isPinned: false, createdBy: userId });
    hideForm();
    }
    
  };

  const handleDateChange = (event) => {
    setReminderDate(event.target.value);  
  };

  const handleTimeChange = (event) => {
    setReminderTime(event.target.value);  
  };

  const handleSaveReminder = (noteItem) => {
    submitReminder(noteItem);


  }

  return(
    <div className={styles.mainContainer}>

      <h1 className={styles.header}>Notes</h1>

      {isFormActive && (
        <div className={styles.modalBackdrop}>

          <div className={styles.modal}>

            <form className={styles.noteform} onSubmit={handleSubmit}>
              <input
                className={styles.modernInput}
                onChange={handleNoteContentChange}
                type="text"
                value={note.noteContent}
                placeholder="Enter a note..."
                required
              />
              
             <select value={note.appointmentId} onChange={handleSelectChange}>
                <option value={0}>--Please Select Appointment--</option>
                {list.map((item) => (
                  <option key={item.appointmentId} value={item.appointmentId}>
                    {item.serviceDescription}
                  </option>
                ))}
              </select>
       
              <button type="submit"  onClick={handleSubmit}>
                Add
              </button>

              <button type="button"onClick={hideForm} >
                Cancel
              </button>

            </form>
          </div>
        </div>
      )}

      <div className={styles.notesAndAddButtonContainer}>
      <div className={styles.notescontainer}>
        <div className={styles.notelist}>
          {notes?.map((noteItem, index) => (
            <div key={index} className={styles.noteItem}>
              <div className={styles.pinDiv}>
                 <FaThumbtack  className={noteItem.isPinned? `${styles.showPin}`:`${styles.hidePin}`} />
              </div>
              <div>  
                <p>Note: {noteItem.noteContent}</p>
              </div>
              <div className={styles.modalButtonDiv} >
                <button  onClick={() => handleOpenModalForReminder(noteItem.noteId)}>
                    <img src="../../reminder.png" alt="reminderIcon" />
                </button>
                <button className={styles.deletePinModal} onClick={() => handleOpenModal(noteItem.noteId)}>...</button>
              </div>

              {modalVisible && selectedNote === noteItem.noteId && (
                    <div className={styles.modal2}  ref={modalRef}>
                      <div className={styles.modalContent}>
                        <button className={styles.pin} onClick={() => updateNote(noteItem)} >{noteItem.isPinned? "Unpin":"Pin"}</button>
                        <button className={styles.delete} onClick={() => deleteNote(selectedNote)}>Delete</button>                 
                      </div>
                </div>
              )}
          
              {modalVisible2 && selectedNote === noteItem.noteId && (
                <div className={styles.modalReminder} ref={modalRef2}>
                  <div className={styles.modalContent}>
                    
                   <p>REMINDER:</p>
                    <input 
                      id="date" 
                      type="date" 
                      value={reminderDate} 
                      onChange={handleDateChange} 
                      className={styles.hiddenInput} 
                    />                 
                  
                    <input 
                      id="time" 
                      type="time" 
                      value={reminderTime} 
                      onChange={handleTimeChange} 
                      className={styles.hiddenInput} 
                    />

                   {reminderDate != "" && reminderTime != "" &&(
                      <div className={styles.saveReminderbtnDiv} >
                      <button className={styles.saveReminderbtn} onClick={() => handleSaveReminder(noteItem)}>Save</button>
                    </div>
                   )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>  
           
      </div>
      <div className={styles.addButtonDiv}>
          <button className={styles.modernButton} onClick={showForm}>
            <FaPlus className={styles.plusIcon} />
          </button>
      </div>
      </div>
    </div>
    // <>
    //  <div className={`${styles.list}`}>
    //   <div className={`${styles.noteTitle}`}>
    //     <strong>Title</strong>
    //   </div>
    //   <div className={`${styles.noteContent}`}>
    //     <p>asdasdasdasd</p>
    //   </div>
    //   <div className={`${styles.noteDate}`}>
    //     01/20/2024
    //   </div>
    // </div>
    // </>
  );
}

export default NotesComponent;
