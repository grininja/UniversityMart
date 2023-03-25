import React from "react";
import { Container, Row, Col } from "reactstrap";

const Hero = () => {
  return (
    <section className="section position-relative">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="pr-lg-5">
              <p className="text-uppercase text-primary font-weight-medium f-14 mb-4">
                UniversityMart
              </p>
              <h1 className="mb-4 font-weight-normal line-height-1_4">
                Is Shopping for University is{" "}
                <span className="text-primary font-weight-medium">
                  Headache?
                </span>
              </h1>
              <p className="text-muted mb-4 pb-2">
                This application serves as a one-stop-shop for all the necessary
                items required by Universities, including textbooks, stationery,
                lab items, and other accessories. With just a few clicks, Universities
                can browse through a vast selection of products and compare
                prices to find the best deals.{" "}
              </p>
              <a href="#" className="btn btn-warning">
                Find Out How <span className="ml-2 right-icon">&#8594;</span>
              </a>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mt-5 mt-lg-0">
              <img
                src="/images/Group Members.png"
                alt=""
                className="img-fluid mx-auto d-block"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
