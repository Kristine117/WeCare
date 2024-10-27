import React, { useState } from "react";
import kwan from "./UserListTable.module.css";
import {FaEllipsisH } from "react-icons/fa";
import Button from "../Button/Button";
import { createPortal } from "react-dom";
import { FaX } from "react-icons/fa6";

const UserListTable=({length, list})=>{
    const [allBoxes,setAllBoxes]= useState(false);
    const [openModal,setOpenModal] = useState(false);

    const [openFloat,setOpenFloat]= useState(
        new Array(length).fill(false)
      );
    const [checkedState, setCheckedState] = useState(
        new Array(length).fill(false)
      );

    const handleOnChange = (position) => {

        let updatedCheckedState;

        if(position !== -1){
           updatedCheckedState = checkedState.map((item, index) =>
                index === position ? !item : item
            );
        }else {
            setAllBoxes(val=>!val);
            updatedCheckedState =   new Array(length).fill(!allBoxes);
        }
        setCheckedState(updatedCheckedState);
    };

    function openFloatFunc(e){
    
       if(openFloat?.length > 0){
        const floatMap = openFloat?.map((item, index)=> index === +e.target.dataset.index );
        setOpenFloat(floatMap)
       }else return;
    }

    function closeFloatFunc(){
        setOpenModal(val=>!val)
        setOpenFloat(new Array(length).fill(false))
    }

    const modal = openModal && createPortal(<>
    <div className={kwan["backdrop-modal"]} onClick={closeFloatFunc}></div>
    <div className={kwan["container"]}>
        <FaX className={kwan["close-modal"]} onClick={closeFloatFunc}/>
        <p className={kwan["modal-message"]}>Are you sure you want to remove this user?</p>

        <Button type="button" className={kwan["no-btn"]} onClick={closeFloatFunc}>No</Button>
        <Button type="button" className={kwan["yes-btn"]} >Yes</Button>
      
    </div>
    </>
    ,document.querySelector("#modal"))


    return(
        <React.Fragment>
            {modal}
            <header className={kwan["header"]}>
                <div><input type="checkbox" name="main" checked={allBoxes} onChange={()=>handleOnChange(-1)}/></div>
                <div>Name</div>
                <div>Email</div>
                <div>Role</div>
                <div>Status</div>
            
            </header>   

            <ul className={kwan["list"]}>
                {list?.map((val,i)=> 
                <li className={kwan["list-item"]} key={val.userId}>
                   <div><input name={val.userId} type="checkbox" 
                   checked={checkedState[i]} onChange={()=>handleOnChange(i)}/></div>
                   <div>{val.fullName}</div>
                   <div>{val.email}</div>
                   <div>{val.userType === 'assistant' ? "Assistant": "Senior"}</div>
                   <div>{val.approveFlg ? "Verified": "Pending"}</div>
                   <FaEllipsisH className={kwan["ellipsis"]} data-index={i} onClick={openFloatFunc}/>
                   {openFloat[i] && <div className={kwan["floating-option"]}>
                        <Button type="button" className={kwan["btn-edit"]}>Edit</Button>
                        <Button type="button" className={kwan["btn-delete"]} onClick={()=>setOpenModal(val=>!val)}>Delete</Button>
                   </div>}
                </li>)}
            </ul>
        </React.Fragment>
    )
}

export default UserListTable