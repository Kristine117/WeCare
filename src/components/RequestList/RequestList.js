import React from "react";
import design from "./RequestList.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const RequestList = ({list,loading})=>{
    
    return (
        <ul className={design["container"]}>
            {list?.map(val=>{
                return <li key={val.userId} className={design["list-item"]}>
                    <img src="./cc.png" alt="Some Image" className={design["img"]}/>
    
                    {val.approveFlg === 0 && 
                    <>
                        <div>
                            <div><strong>{val.fullName}</strong> wants to register</div>
                            <Link relative="true" to={`${encodeURIComponent(val.userId)}`}>Read Application</Link>    
                        </div>
                    
                        <div className={design["controller"]}>    
                            <Button type="button" className={design["approve-btn"]}>Approve</Button>
                            <Button type="button" className={design["reject-btn"]}>Reject</Button>
                        </div>
                    </>
                    }

                    {val.approveFlg === 1 && <>
                        <div><strong>{val.fullName}</strong></div>
                        <div className={design["status"]}>Verified</div>
                    </>}
                    
                </li>
            })}
        </ul>
    )
}

export default RequestList;