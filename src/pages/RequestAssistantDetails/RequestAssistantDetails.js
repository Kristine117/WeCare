import React, { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import design from "./RequestAssistantDetails.module.css";
import UserContext from "../../UserContext";
import useFetchData from "../../hooks/useGetData";
import LoadingElement from "../../components/LoadingElement/LoadingElement";

const RequestAssistantDetails = ()=>{
    const {user} = useContext(UserContext);
    const {userId} = useParams();
    const [data,setData]= useState(null);
    
    const {fetchDataFuncHandler,loading,error}=useFetchData();
    
    async function parseData(){
        const composedUrl = `admin/assistant-details/${encodeURIComponent(userId)}`
        const result =await fetchDataFuncHandler(composedUrl);

        setData(result.data);
    }
    useEffect(()=>{
        parseData();
    },[userId])

    return(
        <main>
             {(user?.userType !== "admin" && user?.userType !== null ) && <Navigate to={"/login"}/>}
            <section className={design["dashboard"]}>
                <SideMenu/>
                <DashboardContainer>
                    {loading&& <LoadingElement label="Something"/>}

                    {!loading && 
                    <div className={design["assistant-card"]}>
                    <h1>Assistant Profile</h1>

                    <img src={data?.profileImage} alt="Profile Image"/>

                    <div>{data?.firstname} {data?.lastname}</div>
                </div>      }

                    
                </DashboardContainer>           
            </section> 
        </main>
    )
}

export default RequestAssistantDetails;
