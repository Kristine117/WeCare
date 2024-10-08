import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate, useLocation } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import dashboard from "./Chat.module.css";

const Chat = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { recipientId } = location.state;
  return (
    <main>
      {!user?.id && <Navigate to={"/login"} />}

      {user?.id && (
        <section className={dashboard["dashboard"]}>
          <SideMenu />
          <DashboardContainer>
            this is the drilled userID {recipientId}
            {/* {user.userType === 'senior' && <ProfileCard/>}     */}
          </DashboardContainer>
        </section>
      )}
    </main>
  );
};

export default Chat;
