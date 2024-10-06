import { useContext} from "react";
import {Navigate} from "react-router-dom";
import UnderMaintenance from "../components/UnderMaintenance";
// import SideMenu from "../../components/SideMenu/SideMenu";
import UserContext from "../../UserContext";

const DashBoardSeniorMessage = () => {
  const { user } = useContext(UserContext);

  return user.id === null ? (
    <Navigate to="/login" />
  ) : (
    <div>
      {/* <SideMenu activeMessage={true} /> */}
      <div className=" nav-content shifted">
        <UnderMaintenance />
      </div>
    </div>
  );
};

export default DashBoardSeniorMessage;
