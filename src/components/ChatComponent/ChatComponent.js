
import React, { useEffect, useState, useRef, useContext ,useLayoutEffect} from "react";
import io from 'socket.io-client';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputEmoji from "react-input-emoji";
import UserContext from "../../UserContext";
import { FaImage, FaPaperPlane , FaPlus,FaDownload} from 'react-icons/fa'; 
import style from "./ChatComponent.module.css"


const apiUrl =`${process.env.REACT_APP_API_URL}`;


const ChatComponent = ({recipientId}) => {
    const {user} = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(""); // State to store clicked image URL
    const [isModalOpen, setModalOpen] = useState(false); // State to toggle modal
    const messagesEndRef = useRef(null);
    const senderId = user.id;
    const [socket, setSocket] = useState(null);
    const [fileNames, setFileNames] = useState([]); // State to store selected filenames


   const socketRef = useRef(null); // Initialize socketRef
   const roomIdRef = useRef(null);




     // Initialize socket and pass userId
     useEffect(() => {
        const socketconnection= io(apiUrl);
       

       // setSocket(socketconnection)
       socketRef.current = socketconnection;

        grabRoomId();
        console.log("Room id in socket connection");
        console.log(roomIdRef)
        // Track connection status
        socketconnection.on('connect', () => {
            console.log('Socket connected:', socketconnection.id);
            socketconnection.emit('joinRoom', { roomId: roomIdRef.current, senderId });
        });

        // Handle socket disconnection
        socketconnection.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        // Handle incoming messages
        socketconnection.on('receiveMessage', (message) => {
        console.log("Message received:", message);

        setMessages((prevMessages) => {
            // Check if the message is already present to avoid duplication
            if (!prevMessages.some((msg) => msg.messageContent === message.messageContent && msg.senderId === message.senderId)) {
                return [...prevMessages, message];
            }
            return prevMessages;
        });

        scrollToBottom(); // Scroll to bottom on new message
    });
    // Cleanup on component unmount
    return () => {
        socketconnection.disconnect(); // Disconnect the socket
    };
    }, [senderId,recipientId,messages]);


    
   // Scroll to the bottom of the chat when new messages arrive
   const scrollToBottom = () => {
    setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small delay (100ms)
    };

    useEffect(() => {
        // Scroll only when messages array changes
        if (messages.length > 0) {
            scrollToBottom(); 
        }
    }, [messages]); // Listen for changes to 'messages'



    async function grabRoomId(){
        let newRoomId;
        let data1;
        try{
            const data = await fetch(`${apiUrl}/chat/room`,{
                headers:{
                    chatIds: JSON.stringify({
                        senderId,
                        recipientId,
                    })
                }
            })

            data1 = await data.json();

            
        roomIdRef.current = data1.roomId;
            console.log("roomId result from fetch:")
        console.log(roomIdRef);
        }catch(e){
            throw new Error(e.message)
        }

        newRoomId = await data1.data?.roomId;

        return newRoomId;
    }

     useEffect(() => {    
     
        const fetchMessages = async () => {
            const response = await axios.get(`${apiUrl}/chat`, {
                headers: {
                    chatIds: JSON.stringify({
                        senderId,
                        recipientId,
                    }),
                },
            });
    
            setMessages(response.data?.messages);
          
        };

        fetchMessages(); // Initial fetch on mount
        scrollToBottom();
    }, [senderId, recipientId, socket]);

  

    const sendMessage = async () => {
        console.log("Sending message...");
    
        const message = {
            senderId,
            recipientId,
            messageContent,
            contentType: 'text' // Or 'file' depending on your use case
        };
      //  console.log(socketRef.current); // Log the actual socket instance
    
        try {
            // Emit the message to the server through Socket.IO using socketRef.current
            if (socketRef.current) {
                socketRef.current.emit('sendMessage', message);
    
                // Clear the input after sending
                setMessageContent('');
    
                // Scroll the chat to the bottom after sending the message
                scrollToBottom();
            } else {
                console.error("Socket is not connected.");
            }
        } catch (error) {
            console.error("Error sending message:", error.message);
        }
    };
    
    const sending = async (e) => {
        const data = new FormData();
        
        // Loop through all selected files and append each to the form data
        for (let i = 0; i < file.length; i++) {
            data.append('files', file[i]);
        }
      
        data.append('senderId', senderId);
        data.append('recipientId', recipientId);
        
        try {
            const response = await axios.post(`${apiUrl}/chat/upload`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
           
            setFile(null); 
            setFileNames('');
        } catch (error) {
            console.error("Error uploading files:", error);
        }


    };
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl); // Set the clicked image for display
        setModalOpen(true); // Open the modal
         // Set the message content (for downloading)
    };
    const downloadImage = (imageUrl) => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = imageUrl.split('/').pop();
                link.click();
            })
            .catch(error => console.error('Download failed', error));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        setFile(files);
        setFileNames(Array.from(files).map(file => file.name)); // Set the filenames
    };
    
    
    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
        setSelectedImage(null); // Reset selected image
    };
    const sendMessageOnEnter = (e) => {
        if (e.key === 'Enter' && messageContent.trim()) {
            sendMessage();
            e.preventDefault(); // Prevents the default action of adding a newline
        }
    };
    const convertTime = (time) =>{
        // Split the time into components (hours, minutes, seconds)
        let [hours, minutes, seconds] = time.split(':').map(Number);

        // Determine AM or PM
        let period = hours >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour format to 12-hour format
        hours = hours % 12 || 12;

        // Return formatted time with AM/PM
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}  ${period}`;
    }
     // Helper function to extract filename from file path
     const extractFilename = (filePath) => {
        return filePath.split('/').pop();
    };
    
    return  (
        <div className="container-fluid">
           
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 w-100">
                    <div className=" w-100">
                    
                    <div className={style.message}>
                            {messages.map((msg, index) => {
                                const isForReceiver = msg.isForReceiver;                       
                                const isTextMessage = msg.contentType === 'text';
                                const isFileMessage = msg.contentType === 'file';
                                const isPicture = msg.contentType === 'picture';      
                                const formattedTime = convertTime(msg.time);

                                return (
                                    <div key={index} className={`mb-2 d-flex ${isForReceiver ? 'justify-content-start' : 'justify-content-end'}`}>
                                        <div className={style.messageBox}>
                                            <div className={style.time}>{formattedTime}</div>                                     
                                            <div className={`p-2 rounded ${!isPicture ? (!isForReceiver && (isTextMessage || isFileMessage) ? `${style.textBoxSender} text-white` : `${style.textBoxReceiver}`) : ''}`}>

                                                {msg.contentType === 'picture' ? (
                                                    <img
                                                        src={`${apiUrl}${msg.messageContent}`}
                                                        alt="uploaded"
                                                        className="img-fluid"
                                                        style={{ maxWidth: '35rem', cursor: 'pointer' }}
                                                        onClick={() => handleImageClick(`${apiUrl}${msg.messageContent}`)} // Click to open modal
                                                    />
                                                ) : isFileMessage ? (
                                                    // If it's a file, show a link to download it
                                                    <a className={`${!isForReceiver}`} href={`${apiUrl}${msg.messageContent}`} download>
                                                    {extractFilename(msg.messageContent)} {/* Use extractFilename to get the filename */}
                                                </a>
                                                ) : (
                                                    msg.messageContent // Default for text messages
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className={style.footer}>    
                        {/* {fileNames.length > 0 && (
                            <div>
                                {fileNames.map((name, index) => (
                                    <div key={index} className={`${style.fileName}`}>{name}</div>
                                ))}
                            </div>
                        )} */}
                      
                       
                                <input 
                                    type="file" 
                                    className="d-none" 
                                    id="fileInput"
                                    multiple 
                                     accept="image/*"
                                     onChange={handleFileChange} 
                                  
                                  
                                />
                                <label htmlFor="fileInput" >
                                    <FaImage  className={style.iconImage} />
                                </label>

                                 <input 
                                    type="file" 
                                    className="d-none" 
                                    id="fileInputPlus"
                                    accept=".xls,.xlsx,.doc,.docx,.pdf"
                                    onChange={handleFileChange} 
                                />
                                <label htmlFor="fileInputPlus" >
                                    <FaPlus className={style.iconPlus} />
                                </label>
                            
                            <div  className={style.messageInput}>
                                <InputEmoji
                                    value={messageContent}
                                    onChange={(val) => setMessageContent(val)} // onChange provides the new value directly
                                    onKeyDown={sendMessageOnEnter}
                                    cleanOnEnter
                                    placeholder="Type a message"
                                 
                                /> 
                            </div>
                            <div>
                                {messageContent.trim() && (
                                    <button className="btn " onClick={sendMessage}>
                                    <FaPaperPlane size={20} className={style.iconPlane}  />
                                    </button>
                                )}
                            </div>
                            <div>
                                {file && file.length > 0 && (
                                    <button className=" mt-2 mx-auto" onClick={sending}>
                                    <FaPaperPlane size={20} className={style.iconPlane}  />
                                    </button>
                                )}
                            </div>             
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for showing enlarged image */}
          

            {isModalOpen && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    role="dialog"
                    onClick={handleCloseModal}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                                <button onClick={() => downloadImage(`${selectedImage}`)}>
                                    <FaDownload size={24} /> {/* React Icons Download Icon */}
                                </button>
                            </div>
                            <div className="modal-body">
                            <img
                                src={selectedImage} 
                                alt="Enlarged"
                                className="img-fluid"
                                style={{ maxWidth: '800px', maxHeight: '600px', width: '100%' }} // Max size constraints
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};
export default ChatComponent;
