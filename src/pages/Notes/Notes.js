import React, { useContext } from "react";
import UserContext from "../../UserContext";
import { Navigate, useLocation } from "react-router-dom";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardContainer from "../../components/DashboardContainer/DashboardContainer";
import NotesComponent from '../../components/NotesComponent/NotesComponent'
import styles from './Notes.module.css'

function Notes() {
  const { user } = useContext(UserContext);
  const location = useLocation();


  
  return (
      <main>
      {/* {!user?.id && <Navigate to={"/login"} />} */}
    {console.log(user.id)}
       {user?.id && ( 
        <section className={styles.dashboard}>
          <SideMenu />
            <DashboardContainer>
              <NotesComponent loggedInUserId={user.id}/>
            </DashboardContainer>
        </section>
       )} 
      </main>
  )
}

export default Notes
