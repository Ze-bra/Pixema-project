import { Outlet } from "react-router-dom";
import Header from "../../Components/header";
import SideBar from "../../Components/sideBar";
import styles from './styles.module.scss'

//import AsideMenu from "../AsideMenu";

const LayoutAuthorization = () => {
  return (
    <Outlet />
  );
};

export default LayoutAuthorization;
