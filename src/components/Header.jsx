import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col, Image } from "react-bootstrap";
import { MdHealthAndSafety } from "react-icons/md";

import ModalBox from "../components/ModalBox";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const logOutHandler = async () => {
    try {
      await logoutApiCall();
      dispatch(logout());
      toast.success("User Logged Out Successfully");
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        bg="primary"
        expand="lg"
        data-bs-theme="dark"
        className=" position-sticky font-light"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <MdHealthAndSafety className="fs-2 pd-1" /> WellCure
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/home">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/services`}>
                {userInfo ? (
                  <Nav.Link>Services</Nav.Link>
                ) : (
                  <Nav.Link
                    onClick={() =>
                      toast.error("Login in order to access the services")
                    }
                  >
                    Services
                  </Nav.Link>
                )}
              </LinkContainer>

              <Nav.Link href="#aboutWell">About Us</Nav.Link>
            </Nav>
            <Nav>
              <ModalBox buttonType={"outline-light"} />
              {userInfo && (
                <Button
                  variant="outline-light mx-2"
                  onClick={() => logOutHandler()}
                >
                  Logout
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
