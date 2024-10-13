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

const DashBoard = ()=>{
    const {user} = useContext(UserContext);

    
  const [assistantList,setAssistantList] = useState([]);

  useEffect(()=>{

    async function getAssistantList(){

      const data = await fetch(`${process.env.REACT_APP_API_URL}/senior/assistant-list`,{
        headers:{
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      if(!data.ok){
        throw new Error("Something went wrong");
      }

      const list = await data.json();
      setAssistantList(list.data);
    }
    getAssistantList();
  },[])


    return(
        <main>
           {!user?.id && <Navigate to={"/login"}/>}
           {user?.id &&  <section className={dashboard['dashboard']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar/>
                    <Banner/>
                    {user.userType === 'senior' && <ProfileCard list={assistantList}/>}
                    {user?.userType === 'assistant' && <AssistantContent/>}     
                </DashboardContainer>            
            </section>}
        </main>        
    )
}


export default DashBoard;