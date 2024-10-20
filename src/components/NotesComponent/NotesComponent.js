import React, { useState,useEffect,useRef } from 'react';
import { FaPlus } from 'react-icons/fa'; 
import styles from './Notes.module.css';
import { FaThumbtack} from 'react-icons/fa'; 

function NotesComponent({loggedInUserId}) {
  const [notes, setNotes] = useState([]);
  const [list,setList] = useState([]);
  const [userId, setUserId] = useState(loggedInUserId);
  const [note, setNote] = useState({ appointmentId: 0, noteContent: "", isPinned: false, createdBy: userId });
  const [isFormActive, setIsFormActive] = useState(false);
  const [status,setStatus ]= useState("approved");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const modalRef = useRef(null); // Create a reference for the modal

 
 


//   useEffect(()=>{
//     async function getAppointmentList(){

//         const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/appointment-list`,{
//             headers: {
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                 "status": status
//               },
//         })
//         const parseData = await data.json();
//         setList(parseData?.data);
//     }

//     getAppointmentList();
// },[status])

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

    console.log('Fetched notes:', parseData.notes); // Debugging output
    console.log(parseData.notes);
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
      appointmentId: Number(e.target.value), // Update appointmentId
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


  const handleOpenModal = (noteId) => {
    setSelectedNote(noteId);
    setModalVisible(true);
  };
  const handleCloseModal = () => {
    setModalVisible(false);
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
        console.log(result)
        if (result.isSuccess) {
          fetchAllNotes();
            console.log('Note deleted successfully:', result.message);
            // Optionally, refetch the notes or update the UI accordingly
        } else {
            console.error('Failed to delete note:', result.message);
        }
    } catch (error) {
        console.error('Error deleting note:', error);
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
      console.log(result)
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
  
      // Fetch all notes after the note has been submitted
      await fetchAllNotes(); // Wait for fetchAllNotes to complete
    } catch (error) {
      console.error('Error submitting note:', error);
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
              <select value={note.appointmentId}   onChange={handleSelectChange} >
                <option value={0}>--Please Select an appointment--</option>
                <option value={1}>Appointment1</option>
                <option value={2}>Appointment2</option>
                <option value={3}>Appointment3</option>
                <option value={4}>Appointment4</option>
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
              <div className={styles.pinDiv}> <FaThumbtack  className={noteItem.isPinned? `${styles.showPin}`:`${styles.hidePin}`} /></div>
              <div>
                <p>Appointment ID: {noteItem.appointmentId}</p>
                <p>Note: {noteItem.noteContent}</p>
                <p>Pinned: {noteItem.isPinned ? 'Yes' : 'No'}</p>
              </div>
              <div >
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
  );
}

export default NotesComponent;
