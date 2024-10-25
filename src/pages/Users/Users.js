import React, { useContext, useState,useEffect } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import ds from "./Users.module.css";
import ListController from "../../components/ListController/ListController";
import UserListTable from "../../components/UserListTable/UserListTable";

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
    const [loading,setLoading] = useState(false);
    useEffect(() => {
    const fetchData = () => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/admin/user-list`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            setList(data.data);
            setLoading(false);
            });
        };
    fetchData();


    }, [status]);

    function switchListRequestsFunc(e){
        setStatus(e.target.name);
    }

    return(
        <main>
            {(!user?.id || user?.userType !== "admin") && <Navigate to={"/login"}/>}
            {user?.id &&  <section className={ds['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar title="Manage Users"/>
                    <ListController switchListRequests={switchListRequestsFunc} btnList={BTN_LIST} status={status}/>
                    {loading && <p>Loading</p>}
                    {!loading && <UserListTable length={status === 'assistants' ? list?.assistants.length : list?.seniors.length} list={status === 'assistants' ? list?.assistants : list?.seniors}/>}
                </DashboardContainer>            
            </section>}
        </main>
    )
}

export default Users;