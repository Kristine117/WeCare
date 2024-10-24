import React from "react";
import assistantStyle from "./AssistantContent.module.css";

const AssistantContent = ()=>{
    return (
        <div className={`${assistantStyle.assistantBanner}`}>
            <div className={`${assistantStyle.content}`}>Assistant Content</div>            
        </div>
    )
}

export default AssistantContent;