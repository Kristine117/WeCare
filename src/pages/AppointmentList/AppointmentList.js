import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../UserContext";
import { Navigate } from "react-router-dom";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import SideMenu from "../../components/SideMenu/SideMenu";
import AppointmentDetails from "../../components/AppointmentDetails/AppointmentDetails";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";
import appList from "./AppointmentList.module.css";
import Payment from "../../components/Payment/Payment";
import ListController from "../../components/ListController/ListController";
import useUpdate from "../../hooks/useUpdate";
import useFetchData from "../../hooks/useGetData";

const APP_LIST_STATUS = [
  { btnName: "ongoing", btnTitle: "Ongoing" },
  { btnName: "approve", btnTitle: "Approve" },
];

const AppointmentList = () => {
  const { user, appListStatus, setAppListStatus } = useContext(UserContext);
  const {updateFunc,error}=useUpdate();
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(null);
  const [appId,setAppId] = useState(null);
  const [openRating,setOpenRating] = useState(false);
  const{fetchDataFuncHandler}=useFetchData();

  async function switchListRequests(e) {
    setAppListStatus(e.target.name);
  }

  async function getData(status){

    const composedUrl =  `appointment/appointment-list`;

    const headers = {
      status
    }

    const result=await fetchDataFuncHandler(composedUrl,headers);
    
    setList(result?.data);
  }
  useEffect(() => {
    getData(appListStatus);
  }, [appListStatus]);

  function openModalFuncHandler(e) {
    setOpenModal((val) => (val ? false : true));
    setAmount(e.target.dataset.amount);
    setAppId(e.target.dataset.appid)
  }

  return (
    <React.Fragment>
      {openModal && (
        <Payment openModal={openModalFuncHandler} amount={amount} updateFuncHandler={updateFunc} appId={appId} getDataHandlder={()=>{
          getData("");
        }}/>
      )}
      <main>
        {!user?.id && user.userType !== "admin" && user.userType !== null && (
          <Navigate to={"/login"} />
        )}
        {user.userType !== "admin" && user.userType !== null && (
          <section className={appList["page-flex"]}>
            <SideMenu />
            <DashboardContainer>
              <LoggedInCommonNavBar title="Request" />
              {user.userType === "assistant" && (
                <ListController
                  switchListRequests={switchListRequests}
                  status={appListStatus}
                  btnList={APP_LIST_STATUS}
                />
              )}
              <section className={appList["app-list"]}>
                {list?.length === 0 ? (
                  <div className={appList["no-data"]}>
                    You have no any appointment request yet...
                  </div>
                ) : (
                  list?.map((val) => (
                    <AppointmentDetails
                      key={val.appointmentId}
                      appId={val.appointmentId}
                      description={val.serviceDescription}
                      statusDes={val.statusDescription}
                      price={val.totalAmount}
                      servingName={val.servingName}
                      loggedInUserType={val.loggedInUserType}
                      servingProfileImage={val.servingProfileImage}
                      statusId={val.statusId}
                      openModal={openModalFuncHandler}
                      statusTab={appListStatus}
                      isExpired={val.isExpired}
                      assistantId={val.assistantId}
                      updateListFunc={()=>getData("ongoing")}
                    />
                  ))
                )}
              </section>
            </DashboardContainer>
          </section>
        )}
      </main>
    </React.Fragment>
  );
};

export default AppointmentList;
