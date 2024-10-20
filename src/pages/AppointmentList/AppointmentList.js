import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import SideMenu from "../../components/SideMenu/SideMenu";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import AppointmentListController from "../../components/AppointmentListController/AppointmentListController";
import appList from "./AppointmentList.module.css";
import Payment from "../../components/Payment/Payment";
const AppointmentList = ()=>{
    const [list,setList] = useState([]);
    const [status,setStatus ]= useState("ongoing");
    const [openModal,setOpenModal] = useState(false);
    async function switchListRequests(e){
        setStatus(e.target.name);
        const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/appointment-list`,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "status": status
              },
        })
        const parseData = await data.json();
        setList(parseData?.data);

    }

    useEffect(()=>{
        async function getAppointmentList(){

            const data = await fetch(`${process.env.REACT_APP_API_URL}/appointment/appointment-list`,{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "status": status
                  },
            })
            const parseData = await data.json();

            console.log(parseData?.data)
            setList(parseData?.data);
        }

        getAppointmentList();
    },[status])

    function openModalFuncHandler(){
        setOpenModal(val => val ? false: true)
    }    
    
    const {user} = useContext(UserContext);
    return(
        <React.Fragment>
            {openModal && <Payment/>}
            <main>
            {(!user?.id && user.userType !== 'admin' && user.userType !== null) && <Navigate to={"/login"}/>}
            {(user.userType !== 'admin' && user.userType !== null) && <section className={appList['page-flex']}>
                    <SideMenu/>
                    <DashboardContainer>
                        <LoggedInCommonNavBar title="Request"/>
                        <div>Appointment List</div>
                        {user.userType === "assistant" && <AppointmentListController switchListRequests={switchListRequests}/>}
                        {list?.map(val=><AppointmentDetails key={val.appointmentId} appId={val.appointmentId}
                            description={val.serviceDescription}
                            statusDes={val.statusDescription}
                            price={val.totalAmount}
                            servingName={val.servingName}
                            loggedInUserType={val.loggedInUserType}
                            servingProfileImage={val.servingProfileImage}
                            statusId={val.statusId}
                            openModal={openModalFuncHandler}
                            />)}
                    </DashboardContainer>            
                </section>}
            </main>    
        </React.Fragment>    
    )
}

export default AppointmentList;