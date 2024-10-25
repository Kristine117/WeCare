
import React, { useEffect, useState } from "react";

import io from 'socket.io-client';

function Notification({userId}) {

const [notiflist,setNotifList]  = useState([]);


    useEffect(() => {
        const socket= io(apiUrl);

        socket.on('connect', () => {
            console.log('Connected to Socket.IO server');
    });

    socket.on('newNotifReceived', () => { 
        fetchData(); 
    });

        return () => {
            socket.disconnect(); 
        };
    }, []);

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/notifications/getAllNotifs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(userId),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setNotifList(data.data);
          });
      };
    
      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div>
      
    </div>
  )
}

export default Notification
