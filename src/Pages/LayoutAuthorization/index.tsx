import { Outlet } from "react-router-dom";
import Logo from "../../Components/logo";
import { RoutesConstants } from "../../Constants/RouteConstants";
import styles from "./styles.module.scss";

const LayoutAuthorization = () => {
  return (
    <>
      <a href={RoutesConstants.Home}
        className={[styles.logo, "d-flex align-items-center mb-3 mb-md-0 me-md-auto"].join(" ")}>
        <Logo swithColorTheme={false}></Logo>
      </a>
      <Outlet />
    </>
  );
};

export default LayoutAuthorization;
