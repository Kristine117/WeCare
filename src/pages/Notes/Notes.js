import React, { useContext, useState } from "react";
import UserContext from "../../UserContext";
import { Navigate, useLocation } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import NotesComponent from "../../components/NotesComponent/NotesComponent";
import styles from "./Notes.module.css";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";

function Notes() {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [selectedAppntmnt, setSelectedAppntmnt] = useState(0);

  const handleSelectChange = (value) => {
    setSelectedAppntmnt(value);
  };

  return (
    <main>
      {/* {!user?.id && <Navigate to={"/login"} />} */}
      {console.log(user.id)}
      {user?.id && (
        <section className={styles.dashboard}>
          <SideMenu />
          <DashboardContainer>
            <LoggedInCommonNavBar title="Notes" onSelectChange={handleSelectChange}/>
            <NotesComponent loggedInUserId={user.id} selectedAppointment={selectedAppntmnt} />
          </DashboardContainer>
        </section>
      )}
    </main>
  );
}

export default Notes;
