import logo from "../../img/logo.png";
import UserInfo from "./UserInfo";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import NavbarMenu from "./NavbarMenu";
import "./header.css";

const Header = () => {
  return (
    <>
      <Navbar
        style={{
          background:
            "linear-gradient(90deg, var(--color1) 0%, var(--color2) 100%)",
        }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              className="logo"
              src={logo}
              style={{ maxHeight: "60px" }}
            ></img>
          </Navbar.Brand>

          <NavbarMenu />

          <Container className="navbarMenu">
            <Nav className="me-auto">
              <NavLink className="navbarElem" to="/fast-game">
                быстрая игра
              </NavLink>
              <NavLink className="navbarElem" to="/search">
                поиск
              </NavLink>
              <NavLink className="navbarElem" to="/create">
                создать
              </NavLink>
            </Nav>
          </Container>

          <UserInfo />
        </Container>
      </Navbar>
      <hr style={{ margin: "0px 0px 30px 0px" }}></hr>
    </>
  );
};

export default Header;
