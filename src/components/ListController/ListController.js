import React from "react"; 
import dsgn from "./ListController.module.css";
import Button from "../Button/Button";

const ListController = ({switchListRequests, status,btnList})=>{
        
    return(
        <section className={dsgn["header"]}>

            {btnList?.map(
                val=><Button name={val.btnName} key={val.btnName} 
                    onClick={switchListRequests}
                    className={dsgn[`${status === val.btnName ? "btn-active":"btn-inactive"}`]}>{val.btnTitle}</Button>)}
        </section>
    )
}

export default ListController;