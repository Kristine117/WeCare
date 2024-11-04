import React, { useContext, useState,useEffect } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import ds from "./Users.module.css";
import ListController from "../../components/ListController/ListController";
import UserListTable from "../../components/UserListTable/UserListTable";
import useGetData from "../../hooks/useGetData";
const BTN_LIST = [
    {btnName: "assistants",
    btnTitle:"Assistants"
    },
    {btnName:"seniors",
    btnTitle:"Seniors"
    }
]
const Users = ()=>{
    const [list,setList]= useState([]);
    const {user} = useContext(UserContext);
    const [status,setStatus]= useState("assistants");

    const {fetchDataFuncHandler,loading,error}= useGetData();


    const fetchData = async() => {
        const composedUrl = "admin/user-list";

        const result = await fetchDataFuncHandler(composedUrl);

        setList(result.data);
    };
    
    useEffect(() => {

     fetchData();
    }, [status]);

    function switchListRequestsFunc(e){
        setStatus(e.target.name);
    }

    console.log(list)

    return(
        <main>
            {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>}
            {user?.id &&  <section className={ds['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar title="Manage Users"/>
                    <ListController switchListRequests={switchListRequestsFunc} btnList={BTN_LIST} status={status}/>
                    {loading && <p>Loading</p>}
                    {!loading && <UserListTable length={status === 'assistants' ? 
                        list?.assistants?.length : list?.seniors?.length} 
                        list={status === 'assistants' ? list?.assistants : list?.seniors}
                        fetchDataHandler={fetchData}/>}
                </DashboardContainer>            
            </section>}
        </main>
    )
}

export default Users;