import React from "react";
import wcdesign from "./ChatListComponent.module.css";
const ChatListComponent =({name})=>{

    return(
        <div className={wcdesign["list"]}>{name}</div>
    )
}

export default ChatListComponent;