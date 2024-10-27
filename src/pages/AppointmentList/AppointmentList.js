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

const APP_LIST_STATUS = [
  { btnName: "ongoing", btnTitle: "Ongoing" },
  { btnName: "approve", btnTitle: "Approve" },
];
const AppointmentList = () => {
  const { user, appListStatus, setAppListStatus } = useContext(UserContext);

  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [amount, setAmount] = useState(null);

  async function switchListRequests(e) {
    setAppListStatus(e.target.name);

    const data = await fetch(
      `${process.env.REACT_APP_API_URL}/appointment/appointment-list`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          status: appListStatus,
        },
      }
    );
    const parseData = await data.json();
    setList(parseData?.data);
  }

  useEffect(() => {
    async function getAppointmentList() {
      const data = await fetch(
        `${process.env.REACT_APP_API_URL}/appointment/appointment-list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            status: appListStatus,
          },
        }
      );
      const parseData = await data.json();

      setList(parseData?.data);
    }

    getAppointmentList();
  }, [appListStatus]);

  function openModalFuncHandler(e) {
    setOpenModal((val) => (val ? false : true));
    setAmount(e.target.dataset.amount);
  }

  console.log(user.userType);

  return (
    <React.Fragment>
      {openModal && (
        <Payment openModal={openModalFuncHandler} amount={amount} />
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
                {list.length === 0 ? (
                  <div className={appList["no-data"]}>
                    You have no any appointment request yet...
                  </div>
                ) : (
                  list.map((val) => (
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
