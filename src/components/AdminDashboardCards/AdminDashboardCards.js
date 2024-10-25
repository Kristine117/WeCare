import React, { useEffect, useState } from "react";
import db from "./AdminDashboardCards.module.css";
import { FaEllipsisH,  FaEnvelope,  FaPlus,  FaUser } from "react-icons/fa";

const AdminDashboardCards = ({fullName})=>{
    const [list,setList] = useState(null);
    
    useEffect(()=>{
      async function getAdminDashBoardData(){
        try{
            const data = await fetch(`${process.env.REACT_APP_API_URL}/admin/admin-cards/details`,{
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            })
          const newData = await data.json();
            setList(newData?.data[0])

        }catch(e){
            throw new Error(e.message);
        }

      }

      getAdminDashBoardData()
    },[fullName])
  
    return (
       <React.Fragment>
        <div className={db["admin-name"]}>Hi, {fullName}</div>
         <article className={db["header"]}>
            
            <div className={db["header-item"]}>
              <div className={db["header-item__header"]}>
                <FaUser className={`${db["header-item__header-icon"]} ${db["header-item__header-icon--1"]}`}/> 
                <FaEllipsisH/>
              </div>

              <div className={db["footer"]}>
                <span className={db["data"]}>{list?.users}</span>
                <p className={db["title"]}>Total Users</p>
              </div>
            </div>
            
            <div className={db["header-item"]}>

              <div className={db["header-item__header"]}>
                  <FaEnvelope className={`${db["header-item__header-icon"]} ${db["header-item__header-icon--2"]}`}/> 
                  <FaEllipsisH/>
              </div>

              <div className={db["footer"]}>
                <span className={db["data"]}>{list?.assistance}</span>
                <p className={db["title"]}>Assistance</p>
              </div>
            </div>


            <div className={db["header-item"]}>

              <div className={db["header-item__header"]}>
                  <FaPlus className={`${db["header-item__header-icon"]} ${db["header-item__header-icon--3"]}`}/> 
                  <FaEllipsisH/>
              </div>

              <div className={db["footer"]}>
              <span className={db["data"]}>{list?.newUsers}</span>
              <p className={db["title"]}>New Users</p>
              </div>
            </div>
        </article>
       </React.Fragment>
    )
}

export default AdminDashboardCards;