import React from "react";
import design from "./RequestList.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const RequestList = ({list,loading})=>{
    console.log(list)
    return (
        <ul className={design["container"]}>
            {list?.map(val=>{
                return <li key={val.userId} className={design["list-item"]}>
                    <img src={val.profileImage} alt="Some Image" className={design["img"]}/>
                    <div>
                        <div><strong>{val.fullName}</strong> wants to register</div>
                        <Link to={`requests/${val.userId}`}>Read Application</Link>    
                    </div>
                    {!val.approveFlg && 
                    <div className={design["controller"]}>    
                        <Button type="button" className={design["approve-btn"]}>Approve</Button>
                        <Button type="button" className={design["reject-btn"]}>Reject</Button>
                    </div>
                    }
                </li>
            })}
        </ul>
    )
}

export default RequestList;