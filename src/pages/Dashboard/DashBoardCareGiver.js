
import Banner from "../../components/Banner/Banner";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import UserContext from "../../UserContext";

import { useContext} from "react";
import { Navigate} from "react-router-dom";


// import SideMenu from "../../components/SideMenu/SideMenu";
const DashBoardCareGiver = () => {
  const { user } = useContext(UserContext);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <div>
      {/* <SideMenu /> */}
      <div className=" nav-content shifted">
        <Banner />
        <ProfileCard />
      </div>
    </div>
  );

};

export default DashBoardCareGiver;
