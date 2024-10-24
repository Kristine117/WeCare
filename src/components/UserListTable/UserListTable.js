import React, { useState } from "react";
import kwan from "./UserListTable.module.css";
import { FaEllipsisV } from "react-icons/fa";

const UserListTable=({length, list})=>{
    const [allBoxes,setAllBoxes]= useState(false);
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

    return(
        <React.Fragment>
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
                   <FaEllipsisV className={kwan["ellipsis"]}/>
                </li>)}
            </ul>
        </React.Fragment>
    )
}

export default UserListTable