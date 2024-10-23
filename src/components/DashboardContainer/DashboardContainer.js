import React, { useContext } from "react";
import UserContext from "../../UserContext";
import wecarecss from "./DashboardContainer.module.css";

const DashboardContainer = (props) => {
  const { user } = useContext(UserContext);

  return <section className={wecarecss["section"]}>{props.children}</section>;
};

export default DashboardContainer;
