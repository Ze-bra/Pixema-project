import { Outlet } from "react-router-dom";
import Header from "../../Components/header";
import SideBar from "../../Components/sideBar";
import styles from './styles.module.scss'
import { Col, Container, Row } from "react-bootstrap";

const Layout = () => {

  return (
    <Container fluid={true} className="overflow-auto">
      <Row className="">
        <Col sm="2" className="d-none d-lg-flex sticky-top">
          <SideBar />
        </Col>
        <Col className="overflow-auto h-100">
          <Header />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
