import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import design from "./RequestAssistantDetails.module.css";
import UserContext from "../../UserContext";
import useFetchData from "../../hooks/useGetData";
import LoadingElement from "../../components/LoadingElement/LoadingElement";
import Button from "../../components/Button/Button";
import Swal from "sweetalert2";
import useUpdate from "../../hooks/useUpdate";
import dsgn from "./RequestAssistantDetails.module.css";


const RequestAssistantDetails = ()=>{
    const {user} = useContext(UserContext);
    const {userId} = useParams();
    const [data,setData]= useState(null);
    const {updateFunc} = useUpdate();
    const {fetchDataFuncHandler,loading,error}=useFetchData();
    const navigate = useNavigate();    
    async function parseData(){
        const composedUrl = `admin/assistant-details/${encodeURIComponent(userId)}`
        const result =await fetchDataFuncHandler(composedUrl);

        setData(result.data);
    }
    useEffect(()=>{
        parseData();
    },[userId])


    async function updateAssistantRegistrationApplicationHandler(e){

        const composedUrl = `admin/assistant-applicant/${encodeURIComponent(userId)}`
        const decision = e.target.dataset.decision;

        let result = updateFunc("PUT",{
            userId,
            decision
        },composedUrl);

        const {isSuccess,message} = await result;
        if(isSuccess){
            Swal.fire({
                title: message,
                icon: "success",
                text: "Successful Operation.",
              });
    
        }else {
            Swal.fire({
                title: message,
                icon: "error",
                text: "Something went wrong please try again.",
              });
        }

        return navigate("/requests");
    }


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

                        <div className={dsgn["experience-data"]}>
                        </div>
                        <Button type="button" data-decision="approve" 
                        onClick={updateAssistantRegistrationApplicationHandler}
                        className={dsgn["approve-btn"]}>Approve</Button>

                        <Button type="button" data-decision="reject" 
                        onClick={updateAssistantRegistrationApplicationHandler}
                        className={dsgn["reject-btn"]}>Reject</Button>
                    </div>}

                    
                </DashboardContainer>           
            </section> 
        </main>
    )
}

export default RequestAssistantDetails;
