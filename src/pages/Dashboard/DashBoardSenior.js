
import ProfileCard from "../components/ProfileCard/ProfileCard";
import SideMenu from "../components/SideMenu";
import { useContext} from "react";
import UserContext from "../UserContext";
import { Navigate} from "react-router-dom";
import Banner from "../../components/Banner/Banner";

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
