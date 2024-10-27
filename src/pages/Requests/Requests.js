import React, { useContext,useEffect,useState } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import ds from "./Requests.module.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import ListController from "../../components/ListController/ListController";
import RequestList from "../../components/RequestList/RequestList";

const APP_LIST_STATUS = [
    { btnName: "requests", btnTitle: "Requests" },
    { btnName: "history", btnTitle: "History" },
  ];


const Requests = ()=>{
    const {user} = useContext(UserContext);

    const [list,setList]= useState(null);
    const [status,setStatus]= useState("requests");
    const [loading,setLoading] = useState(false);
    useEffect(() => {
    const fetchData = () => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/admin/assistant-applicants`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data.data)
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
        {(user?.userType !== "admin" && user?.userType !== null ) && <Navigate to={"/login"}/>}
        {user?.id &&  <section className={ds['dashboard']}>
            <SideMenu/>
            <DashboardContainer>
                <LoggedInCommonNavBar title="Requests"/>
                <ListController btnList={APP_LIST_STATUS} status={status} switchListRequests={switchListRequestsFunc}/>
                <RequestList list={status === 'requests' ? list?.assistantListPending : list?.assistantListApproved}/>
            </DashboardContainer>            
        </section>}
    </main> 
    )
}

export default Requests;