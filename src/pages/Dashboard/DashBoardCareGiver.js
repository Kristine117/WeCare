
import ProfileCard from "../components/ProfileCard/ProfileCard";
import UserContext from "../UserContext";
import { Navigate} from "react-router-dom";
import { useContext} from "react";
import Banner from "../components/Banner/Banner";
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
