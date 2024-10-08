import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./ChatList.module.css";
import UserContext from "../../UserContext";
import ChatListComponent from "../../components/ChatListComponent/ChatListComponent";
const chatlist = [
    {name:"karl"},
    {name:"james"}
]
const ChatList = ()=>{
    const {user}=useContext(UserContext);
    return(
        <main>
        {/* {!user?.id && <Navigate to={"/login"}/>} */}
        {user?.id &&  <section className={dashboard['dashboard']}>
             <SideMenu/>
            <div>
                <div>Messages</div>
                {chatlist.map(val=>{
                    return (
                        <ChatListComponent key={val.name} name={val.name}/>
                    )
                } )}  
            </div>
         </section>}
     </main>        
    )
}


export default ChatList;