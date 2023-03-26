import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from 'next/image'
const FeatureBox = (props) => {
  return (
    <>
      {props.features.map((feature, key) =>
        feature.id % 2 !== 0 ? (
          <Row
            key={key}
            className={
              feature.id === 1
                ? "align-items-center"
                : "align-items-center mt-5"
            }
          >
            <Col md={5}>
              <div>
                <Image
                  src={feature.img}
                  alt=""
                  className="img-fluid d-block mx-auto"
                />
              </div>
            </Col>
            <Col md={{ size: 6, offset: 1 }}>
              <div className="mt-5 mt-sm-0 mb-4">
                <div className="my-4">
                  <i className={feature.icon}></i>
                </div>
                <h5 className="text-dark font-weight-normal mb-3 pt-3">
                  {feature.title}
                </h5>
                <p className="text-muted mb-3 f-15">{feature.desc}</p>
                {/* <a href={feature.link} className="f-16 text-warning">
                  Read More <span className="right-icon ml-2">&#8594;</span>
                </a> */}
              </div>
            </Col>
          </Row>
        ) : (
          <Row key={key} className="align-items-center mt-5">
            <Col md={6}>
              <div className="mb-4">
                <div className="my-4">
                  <i className="mdi mdi-account-group"></i>
                </div>
                <h5 className="text-dark font-weight-normal mb-3 pt-3">
                  {feature.title}
                </h5>
                <p className="text-muted mb-3 f-15">{feature.desc}</p>
                <a href={feature.link} className="f-16 text-warning">
                  Read More <span className="right-icon ml-2">&#8594;</span>
                </a>
              </div>
            </Col>
            <Col md={{ size: 5, offset: 1 }} className="mt-5 mt-sm-0">
              <div>
                <img
                  src={feature.img}
                  alt=""
                  className="img-fluid d-block mx-auto"
                />
              </div>
            </Col>
          </Row>
        )
      )}
    </>
  );
};

const Feature = () => {
  const features = [
    {
      id: 1,
      img: "./images/45.png",
      title: "Select Products from Multiple Categories",
      desc: "enables users to quickly find the items they need and helps sellers to organize and display their products effectively, leading to increased sales and customer satisfaction.",
      link: "/",
    },
    {
      id: 2,
      img: "./images/Group Members.png",
      title: "Multi Level Admin Approvals",
      desc: "multi-level approval on the institute side is an essential feature that enhances financial discipline and accountability. It ensures that all purchases and expenses are thoroughly reviewed and approved, preventing any unauthorized or unnecessary spending and promoting financial stability and sustainability.",
      link: "/",
    },
    {
      id: 3,
      img: "./images/45.png",
      title: "Add remarks and tags to your orders",
      desc: "Adding remarks and tags to orders is a valuable feature that enhances organization, communication, and collaboration between users and sellers. It also helps users to manage their orders more efficiently and effectively, leading to higher customer satisfaction.",
      link: "/",
    },
  ];

  return (
    <section className="section" id="feature">
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} md={8}>
            <div className="title text-center mb-5">
              <h3 className="font-weight-normal text-dark">
                <span className="text-warning">Features</span>
              </h3>
              <p className="text-muted">
                Our application serves as a reliable platform connecting
                colleges and universities with trusted sellers, providing a
                centralized location for institutions to find all of their
                necessary items in one place. This streamlined approach
                simplifies the purchasing process and increases the likelihood
                of sellers making sales to a diverse and expansive customer
                base.
              </p>
            </div>
          </Col>
        </Row>
        <FeatureBox features={features} />
      </Container>
    </section>
  );
};

export default Feature;
