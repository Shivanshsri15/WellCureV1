import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrUserManager } from "react-icons/gr";
import { Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLoginMutation, useRegisterMutation } from "../slices/usersApiSlice";
import Loader from "./Loader";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModalBox = ({ buttonType, buttonClass }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const [register, { isLoading: registerLoading }] = useRegisterMutation();
  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const registerSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await register({
        firstName,
        surName,
        email,
        password,
        age,
      }).unwrap();
      toast.success("User registered successfully");
      dispatch(setCredentials({ ...res }));
      setFirstName("");
      setSurName("");
      setEmail("");
      setPassword("");
      setAge("");
      setRegisterMode(false);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User Login successfully");
      setEmail("");
      setPassword("");
      setShow(false);
      navigate(`/home/${userInfo._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {userInfo ? (
        <>
          <Button
            variant={`${buttonType}`}
            className={buttonClass ? buttonClass : ""}
          >
            <GrUserManager className="fs-4" /> {userInfo.firstName} (
            {userInfo.age})
          </Button>
        </>
      ) : (
        <>
          <Button
            variant={`${buttonType}`}
            onClick={() => setShow(true)}
            className={buttonClass ? buttonClass : ""}
          >
            <GrUserManager className="fs-4" /> Sign Up
          </Button>
        </>
      )}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            One Step Away...!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form
              onSubmit={
                registerMode ? registerSubmitHandler : loginSubmitHandler
              }
            >
              <Row>
                {registerMode && (
                  <>
                    <Form.Group controlId="firstName">
                      <Form.Label>FirstName</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter Your first Name:"
                      />
                    </Form.Group>
                    <Form.Group controlId="surName">
                      <Form.Label>Surname</Form.Label>
                      <Form.Control
                        type="text"
                        name="surName"
                        value={surName}
                        onChange={(e) => setSurName(e.target.value)}
                        placeholder="Enter Your last Name:"
                      />
                    </Form.Group>
                  </>
                )}
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email:"
                  />
                </Form.Group>
                <Form.Group controlId="Password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your Password:"
                  />
                </Form.Group>
                {registerMode && (
                  <>
                    <Form.Group controlId="Age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="Enter Your Age:"
                      />
                    </Form.Group>
                  </>
                )}
              </Row>
              <p>
                <span>Already a User?</span>
                <span
                  className="text-primary customcss"
                  onClick={() => setRegisterMode((prev) => !prev)}
                >
                  {registerMode ? "Login" : "Register"}
                </span>
              </p>
              <Button variant="outline-primary my-3" type="submit">
                {registerMode ? "Register" : "Login"}
              </Button>
              {registerLoading && <Loader />}
              {loginLoading && <Loader />}
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalBox;
