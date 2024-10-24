import React, { useContext, useState,useEffect } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import ds from "./Users.module.css";
import ListController from "../../components/ListController/ListController";

const BTN_LIST = [
    {btnName: "assistants",
    btnTitle:"Assistants"
    },
    {btnName:"seniors",
    btnTitle:"Seniors"
    }
]
const Users = ()=>{
    const [list,setList]= useState(null);
    const {user} = useContext(UserContext);
    const [status,setStatus]= useState("assistants");
    useEffect(() => {
    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_URL}/admin/user-list`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            
            setList(data.data);
            });
        };
    fetchData();
    }, []);

    return(
        <main>
            {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>}
            {user?.id &&  <section className={ds['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar title="Manage Users"/>
                    <ListController btnList={BTN_LIST} status={status}/>
                </DashboardContainer>            
            </section>}
        </main>
    )
}

export default Users;