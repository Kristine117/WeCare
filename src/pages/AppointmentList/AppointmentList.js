import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import appList from "./AppointmentList.module.css";
import SideMenu from "../../components/SideMenu/SideMenu";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import AppointmentListController from "../../components/AppointmentListController/AppointmentListController";

const AppointmentList = ()=>{
    const [list,setList] = useState([]);
    const [status,setStatus ]= useState();
    useEffect(()=>{
        async function getAppointmentList(){

            const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/appointment-list`,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                  },
            })
            const parseData = await data.json();
            setList(parseData?.data);
        }

        getAppointmentList();
    },[])
    
    const {user} = useContext(UserContext);
    return(
        <main>
           {(!user?.id && user.userType !== 'admin' && user.userType !== null) && <Navigate to={"/login"}/>}
           {(user.userType !== 'admin' && user.userType !== null) && <section className={appList['page-flex']}>
                <SideMenu/>
                <DashboardContainer>
                    <LoggedInCommonNavBar title="Request"/>
                    <div>Appointment List</div>
                    <AppointmentListController/>
                    {list?.map(val=><AppointmentDetails key={val.appointmentId} appId={val.appointmentId}
                        description={val.serviceDescription}
                        statusDes={val.statusDescription}
                        price={val.totalAmount}
                        servingName={val.servingName}
                        loggedInUserType={val.loggedInUserType}
                        servingProfileImage={val.servingProfileImage}
                        />)}
                </DashboardContainer>            
            </section>}
        </main>        
    )
}

export default AppointmentList;