import React, { useContext,useState,useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import dashboard from "./DashBoard.module.css";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import AssistantContent from "../../components/AssistantContent/AssistantContent";
import Banner from "../../components/Banner/Banner"
import AdminDashboardCards from "../../components/AdminDashboardCards/AdminDashboardCards";
import useFetchData from "../../hooks/useGetData";


const DashBoard = ()=>{
    const {user} = useContext(UserContext);
  const {fetchDataFuncHandler,loading}= useFetchData();
    
  const [assistantList,setAssistantList] = useState([]);

  const [seniorRequesrtList,setSeniorRequesrtList] = useState([]);

  async function getAssistantList(){

    const composedUrl =`senior/assistant-list`;

    const {data} = await fetchDataFuncHandler(composedUrl);
  
    setAssistantList(data);
  }
  useEffect(()=>{

   
    getAssistantList();
  },[])


  async function getSeniorRequestList(){

    const composedUrl =`assistant/senior-list-request`;

    const {data} = await fetchDataFuncHandler(composedUrl);
  
    setSeniorRequesrtList(data);
  }
  useEffect(()=>{

   
    getSeniorRequestList();
  },[])

    return(
        <main className={dashboard["dashboard-container"]}>
           {!user?.id && <Navigate to={"/login"}/>}
           {user?.id &&  <section className={dashboard['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar title="Home"/>
                    {user.userType === "admin" && <AdminDashboardCards fullName={`${user?.firstname} ${user?.lastname}`}/>}
                    {user.userType !== "admin" && <Banner/>}
                    {user.userType === 'senior' && <ProfileCard list={assistantList}/>}
                    {user?.userType === 'assistant' && <ProfileCard list={seniorRequesrtList}/>} 

                </DashboardContainer>            
            </section>}
        </main>        
    )
}


export default DashBoard;