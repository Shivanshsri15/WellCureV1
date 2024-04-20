import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import doc1 from "../uploads/doc1.jpg";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col, Image } from "react-bootstrap";
import { MdHealthAndSafety } from "react-icons/md";
import Footer from "../components/Footer";
import doctor from "../uploads/Doctots.png";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const MainHomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    userInfo ? navigate(`/home/${userInfo._id}`) : navigate("/home");
  }, [userInfo]);

  return (
    <>
      <Row className="bg-light">
        <Col md={6}>
          <div
            className="roboto-medium mb-0"
            style={{
              margin: "105px",
              fontSize: "62px",
              marginLeft: "110px",
              marginTop: "60px",
            }}
          >
            <p className="m-0 text-primary">Your Guide</p>
            <span className="">To Reliable Medical</span>
            <p className="m-0">Assistance</p>
            <p
              className=" my-3 roboto-medium w-75"
              style={{ fontSize: "17px" }}
            >
              Your Health, Our Priority: Expert Medical Assistance at Your
              Fingertips
            </p>
          </div>
          <div
            className=" ps-4 "
            style={{
              marginLeft: "4rem",
              marginTop: "2rem",
            }}
          >
            {userInfo ? (
              <Button variant="primary ms-4 mx-3  py-2 px-4" href="#aboutWell">
                Get Started
              </Button>
            ) : (
              <Button
                variant="primary ms-4 mx-3  py-2 px-4"
                href="#aboutWell"
                onClick={() => toast.info("Register to unlock all features")}
              >
                Get Started
              </Button>
            )}

            {userInfo ? (
              <LinkContainer to={`/services`}>
                <Button variant="outline-primary py-2 px-4">
                  Contact a Doc
                </Button>
              </LinkContainer>
            ) : (
              <Button
                variant="outline-primary py-2 px-4"
                onClick={() =>
                  toast.error("Login in order to contact a doctor")
                }
              >
                Contact a Doc
              </Button>
            )}
          </div>
        </Col>
        <Col>
          <div className="mt-5 ms-5">
            <Image src={doctor} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div
            id="aboutWell"
            className="roboto-medium mb-0"
            style={{
              margin: "90px",
              fontSize: "80px",
              marginLeft: "110px",
              marginTop: "90px",
            }}
          >
            <p className="m-0 text-primary">Get To </p>
            <span className="">Know Us Better</span>

            <p
              className=" my-3 roboto-medium w-75"
              style={{ fontSize: "17px" }}
            >
              "Our Story: Providing Compassionate Care and Expertise"
            </p>
          </div>
        </Col>
        <Col md={6}>
          {" "}
          <Image src={doc1} roundedCircle style={{ marginLeft: "7rem" }} />
        </Col>
      </Row>
      <Row
        style={{
          paddingLeft: "90px",
          paddingRight: "90px",
          marginBottom: "40px",
        }}
        className="mt-5"
      >
        <h1 className="text-primary">Why Us?</h1>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="roboto-bold">
              Reason 1{" "}
              <MdHealthAndSafety className="text-primary fs-1 font-weight-bold roboto-bold" />{" "}
            </Accordion.Header>
            <Accordion.Body>
              "At WellCure, we're more than just a healthcare provider - we're
              your dedicated partner in wellness. With a team of skilled
              professionals and a commitment to excellence, we strive to deliver
              compassionate care and expertise at every step of your journey.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header className="roboto-bold">
              Reason 2{" "}
              <MdHealthAndSafety className="text-primary fs-1 font-weight-bold roboto-bold" />{" "}
            </Accordion.Header>
            <Accordion.Body>
              Founded on the principles of integrity, compassion, and
              innovation, our mission is to provide personalized medical
              assistance tailored to your unique needs. Whether you're seeking
              routine check-ups, specialized treatments, or emergency care,
              we're here to support you with the highest standard of service and
              attention to detail.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header className="roboto-bold">
              Reason 3{" "}
              <MdHealthAndSafety className="text-primary fs-1 font-weight-bold roboto-bold" />{" "}
            </Accordion.Header>
            <Accordion.Body>
              With a focus on patient-centric care, we prioritize your
              well-being above all else. Our experienced healthcare
              professionals work tirelessly to ensure that you receive the care
              and support you deserve, every step of the way.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header className="roboto-bold">
              Reason 4{" "}
              <MdHealthAndSafety className="text-primary fs-1 font-weight-bold roboto-bold" />{" "}
            </Accordion.Header>
            <Accordion.Body>
              At WellCure, your health and happiness are our top priorities. We
              invite you to learn more about our services, meet our team, and
              discover how we can make a difference in your life. Together,
              let's build a healthier, happier future for you and your loved
              ones."
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Footer />
    </>
  );
};

export default MainHomeScreen;
