
import React, { useEffect, useState, useRef, useContext } from "react";
import io from 'socket.io-client';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputEmoji from "react-input-emoji";
import UserContext from "../../UserContext";
import { FaImage, FaPaperPlane } from 'react-icons/fa'; 

const socket = io(`${process.env.REACT_APP_API_URL}`);
const apiUrl =`${process.env.REACT_APP_API_URL}`;

const ChatComponent = ({recipientId}) => {
    const {user} = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [file, setFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null); // State to store clicked image URL
    const [isModalOpen, setModalOpen] = useState(false); // State to toggle modal
    const messagesEndRef = useRef(null);
    const senderId = user.id;
    console.log(senderId);
   
    // Scroll to the bottom of the chat when new messages arrive
    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); // Small delay (100ms)
    };
    useEffect(() => {
        const fetchMessages = async () => {
            console.log("Something something");
            console.log(recipientId);
            console.log(senderId)
            const response = await axios.get(`${apiUrl}/chat`,{
                headers:{
                    chatIds:JSON.stringify({
                        senderId,
                        recipientId
                    })
                }
            });
        
            setMessages(response.data?.messages);
            scrollToBottom(); // Scroll to bottom after fetching
             console.log("this is from fetching"+ response.data?.messages)
            console.log(response.data?.messages)
        };

        fetchMessages(); // Initial fetch on mount
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => {
                // Check if the message is already present to avoid duplication
                if (!prevMessages.some(msg => msg.messageContent === message.messageContent && msg.senderId === message.senderId)) {
                    return [...prevMessages, message];
                }
                return prevMessages;
            });
            scrollToBottom(); // Scroll to bottom on new message
        });
        return () => {
            socket.off('receiveMessage');
        };
    }, [senderId, recipientId]);
    useEffect(() => {
        
        scrollToBottom();
    }, [messages]);


    const sendMessage = async () => {
        const message = {
            senderId,
            recipientId,
            messageContent,
            contentType: 'text',
        };
        try {
            // Send the message to the server
            await axios.post(`${apiUrl}/chat`, message);
            // Emit the message to Socket.IO
            socket.emit('sendMessage', message);

            setMessageContent(''); // Clear the input
            scrollToBottom();
           
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };
    const handleFileUpload = async (e) => {
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
            console.log(response.data);
            // Assuming the response contains an array of messages
            const messages = response.data;
           
            // Emit each message to the sender and recipient
            messages.forEach(message => {
                socket.emit('sendMessage', message);
            });
            setFile(null); 
           
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };
    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl); // Set the clicked image
        setModalOpen(true); // Open the modal
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
    
    return  (
        <div className="container-fluid">
        {  console.log(senderId)}
       { console.log(recipientId)}
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6 w-100">
                    <div className=" w-100">
                    
                        <div className=" w-100" style={{ height: '400px', overflowY: 'scroll' }}>
                            {messages.map((msg, index) => {
                                const isForReceiver = msg.isForReceiver;
                                const isTextMessage = msg.contentType === 'text';
                                return (
                                    <div key={index} className={`mb-2 d-flex ${isForReceiver ? 'justify-content-start' : 'justify-content-end'}`}>
                                       <div>{msg.time}</div>
                                        <div className={`p-2 rounded ${!isForReceiver && isTextMessage ? 'bg-primary text-white' : ' bg-light text-dark'}`}>
                                            {msg.contentType === 'picture' 
                                                ? <img src={`${apiUrl}${msg.messageContent}`} 
                                                       alt="uploaded" 
                                                       className="img-fluid" 
                                                       style={{ maxWidth: '200px', cursor: 'pointer' }} 
                                                       onClick={() => handleImageClick(`${apiUrl}${msg.messageContent}`)} // Click to open modal
                                                />
                                                : msg.messageContent}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className=" d-flex card-footer w-100">
                            {/* <div className="input-group">
                                <input 
                                    type="text" 
                                    value={messageContent} 
                                    onChange={(e) => setMessageContent(e.target.value)} 
                                    placeholder="Type a message"
                                    className="form-control"
                                />
                                {messageContent.trim() && (
                                    <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                                )}
                            </div> */}
                            <InputEmoji
                                value={messageContent}
                                onChange={(val) => setMessageContent(val)} // onChange provides the new value directly
                                onKeyDown={sendMessageOnEnter}
                                cleanOnEnter
                                placeholder="Type a message"
                            />
                            {messageContent.trim() && (
                                <button className="btn " onClick={sendMessage}>
                                 <FaPaperPlane size={20} />
                                </button>
                            )}
                            <div className="mt-2 d-flex p-2 align-items-center"> 
                                <input 
                                    type="file" 
                                    className="d-none" 
                                    id="fileInput"
                                    multiple 
                                     accept="image/*"
                                    onChange={(e) => setFile(e.target.files)} 
                                    onKeyDown={(e) => {
                                        if(e.key === "Enter"){
                                            console.log("you ave enter")
                                        }
                                    }}
                                  
                                />
                                <label htmlFor="fileInput" className="btn btn-light">
                                    <FaImage size={40} color="#000" />
                                </label>

                                {file && file.length > 0 && (
                                    <button className="btn btn-secondary mt-2 mx-auto" onClick={handleFileUpload}>Upload</button>
                                )}
                            </div>                    
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal for showing enlarged image */}
            {isModalOpen && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleCloseModal} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <img src={selectedImage} alt="Enlarged" className="img-fluid" style={{ maxWidth: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default ChatComponent;
