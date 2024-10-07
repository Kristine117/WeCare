import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { useContext} from "react";

import { Navigate} from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import SideMenu from "../../components/SideMenu/SideMenu";
import UserContext from "../../UserContext";
const DashBoardSenior = () => {
  const { user } = useContext(UserContext);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <div>
      <SideMenu activeHome={true} />
      <div className=" nav-content shifted">
        <Banner />
        <ProfileCard />
      </div>
    </div>
  );


};

export default DashBoardSenior;
