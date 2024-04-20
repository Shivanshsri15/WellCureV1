import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Carousel,
  Image,
  ListGroup,
} from "react-bootstrap";
import { MdHealthAndSafety } from "react-icons/md";
import { useAddPostMutation } from "../slices/postApiSlice";
import emailjs from "@emailjs/browser";
import resume1 from "../uploads/resume1.png";
import resume2 from "../uploads/resume2.png";
import resume3 from "../uploads/resume3.png";
import doc from "../uploads/doc.png";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
const ServicesScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [number, setNumber] = useState("");
  const [mainText, setMainText] = useState("");

  const [addPost, { isLoading: loadingPost }] = useAddPostMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    userInfo ? <></> : navigate("/home");
  }, [userInfo]);

  const postSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await addPost({
        name,
        age,
        number,
        mainText,
      }).unwrap();
      toast.success("Your data has been sent successfully");
      const serviceId = "service_xccq1lc";
      const templateId = "template_ugnxe7m";
      const publicKey = "Q8PDkFSwj8yq2kR7m";

      const templateParams = {
        from_name: userInfo.firstName,
        from_age: age,
        from_email: userInfo.email,
        from_number: number,
        to_name: "WellCure",
        message: mainText,
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (response) =>
          toast.success("Your mail has been sent successfully", response),
        (error) => {
          console.log("FAILED...", error);
        }
      );

      setName("");
      setAge("");
      setNumber("");
      setMainText("");
    } catch (err) {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <p
            className="roboto-medium mb-0 justify-content-start"
            style={{
              margin: "105px",
              fontSize: "22px",
              marginLeft: "110px",
              marginTop: "90px",
            }}
          >
            <p className="m-0">
              "Welcome to our services page, where excellence meets innovation!
              We are
            </p>
            <span className="text-primary">
              Dedicated to providing top-notch solutions tailored to meet your
              needs."
            </span>
          </p>
          <ListGroup
            style={{ padding: "20px", marginLeft: "77px", marginTop: "40px" }}
          >
            <ListGroup.Item action variant="primary">
              Our team of experts is committed to delivering outstanding service
              and exceptional results.
            </ListGroup.Item>
            <ListGroup.Item action variant="primary">
              From cutting-edge technology to personalized care, we've got you
              covered.
            </ListGroup.Item>

            <ListGroup.Item action variant="primary">
              Explore our range of services and discover how we can help you
              achieve your goals.
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={6}>
          <Image
            src={doc}
            roundedCircle
            style={{ width: "100%", height: "100%", marginTop: "30px" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <div
            className="roboto-medium mb-0"
            style={{
              margin: "105px",
              fontSize: "50px",
              marginLeft: "110px",
              marginTop: "90px",
            }}
          >
            <p className="m-0"> You are One Step</p>
            <span className="text-primary">Away from </span>
            <p className="m-0">Living a healthy Life</p>
            <p className=" pd-2 mt-5">
              <MdHealthAndSafety
                className="text-primary"
                style={{
                  fontSize: "110px",
                }}
              />
              <span className="text-primary ">WellCure</span>
            </p>
          </div>
        </Col>
        <Col>
          <div
            className="bg-primary rounded w-75 p-1 text-light px-2 py-3 shadow-lg"
            style={{ margin: "60px" }}
          >
            <Form onSubmit={postSubmitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Patient Name:</Form.Label>
                <Form.Control
                  className="py-2 my-2"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name:"
                />
              </Form.Group>
              <Form.Group controlId="age">
                <Form.Label>Patient Age:</Form.Label>
                <Form.Control
                  className="py-2 my-2"
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter Your Age:"
                />
              </Form.Group>
              <Form.Group controlId="Number">
                <Form.Label>Patient Contact Number:</Form.Label>
                <Form.Control
                  className="py-2 my-2"
                  type="number"
                  name="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="Enter Your Number with country code:"
                />
              </Form.Group>
              <Form.Group controlId="mainText">
                <Form.Label>Your Conditions:</Form.Label>
                <Form.Control
                  className="py-2 my-2"
                  as="textarea"
                  name="mainText"
                  value={mainText}
                  onChange={(e) => setMainText(e.target.value)}
                  placeholder="Feel free to dicuss your condition with us:"
                />
              </Form.Group>
              <Button variant="outline-light w-25 m-2" type="submit">
                Submit
              </Button>
              {loadingPost && <Loader loaderVariant={"light"} />}
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ServicesScreen;
