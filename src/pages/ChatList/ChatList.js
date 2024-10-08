import React, { useContext, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./ChatList.module.css";
import UserContext from "../../UserContext";
import ChatListComponent from "../../components/ChatListComponent/ChatListComponent";
import { Navigate } from "react-router-dom";
const chatlist = [
    {name:"karl"},
    {name:"james"}
]
const ChatList = ()=>{
    const {user}=useContext(UserContext);
    
    return(
       <React.Fragment>
         {(user?.userType !== "senior" && user?.userType !== "assistant"  && user?.userType !== null ) 
         && <Navigate to={"/login"}/>}
        {user?.id &&  
        <main>
            <section className={dashboard['dashboard']}>
                <SideMenu/>
                <div>
                    <div>Messages</div>
                    {chatlist.map(val=>{
                        return (
                            <ChatListComponent key={val.name} name={val.name}/>
                        )
                    } )}  
                </div>
            </section>
        </main>     }   
       </React.Fragment>
    )
}


export default ChatList;