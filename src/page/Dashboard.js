import React, { Component } from "react";
import NavbarTop from "../components/Navbar";
import {
  Row,
  Col,
  Card,
  CardTitle,
  Button,
  CardDeck,
  CardBody,
  CardText,
} from "reactstrap";
import swal from "sweetalert2";
import qs from "querystring";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getUser } from "../redux/actions/user";
import { getProduct } from "../redux/actions/product";
import { logoutAuth } from "../redux/actions/login";

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    console.log("ini props", props);
    this.state = {
      showAddModal: false,
      showLogoutModal: false,
      showNavbar: false,
      pageInfo: {},
      search: "",
      data: [],
      token: jwt.decode(this.props.login.token),
    };
  }

  fetchData = (params) => {
    const param = `${qs.stringify(params)}`;
    this.props.getUser(param).then((response) => {
      const pageInfo = this.props.user.pageInfo;

      this.setState({ pageInfo });
      if (param) {
        this.props.history.push(`?${param}`);
      }
    });
  };

  fetchProduct = (params) => {
    const param = `${qs.stringify(params)}`;
    this.props.getProduct(param).then((response) => {});
  };

  checkLogin = () => {
    if (this.props.login.token === null) {
      this.props.history.goBack();
      swal.fire({
        icon: "error",
        title: "Oopss!",
        text: "You've to login as admin first",
      });
    }
  };

  componentDidMount() {
    // this.checkLogin();
    const param = qs.parse(this.props.location.search.slice(1));
    this.fetchData(param);
    this.fetchProduct();
  }

  render() {
    const { isLoading } = this.props.user;
    const { dataProduct } = this.props.product;
    // const { name, income, expenses, balance } = this.props.login.dataLogin;

    return (
      <>
        <Row className="d-flex flex-column w-100">
          <NavbarTop />
          {isLoading ? (
            <center>
              <div
                className="d-flex align-items-center spinner-border text-dark mt-5"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </center>
          ) : (
            <div className="mt-5">
              <Col>
                <div className="d-flex justify-content-between container">
                  <div className="mt-5">
                    <h4>List Product</h4>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="container w-100">
                  <Row>
                    <CardDeck>
                      {dataProduct.map((prod, index) => (
                        <Col className="mt-4" md={4} key={index}>
                          <Card>
                            {/* <CardImg
                              top
                              width="100%"
                              src={prod.picture}
                              alt="Card image cap"
                            /> */}
                            <CardBody>
                              <CardTitle>
                                <h4>
                                  <Link
                                    to={{
                                      pathname: `/detail/${prod.id}`,
                                      state: {
                                        id: `${prod.id}`,
                                        name: `${prod.name}`,
                                        quantity: `${prod.quantity}`,
                                        price: `${prod.price}`,
                                      },
                                    }}
                                    className="text-black"
                                  >
                                    {prod.name}
                                  </Link>
                                </h4>
                              </CardTitle>
                              <CardText className="font-weight-bold">
                                Stok : {prod.quantity}
                              </CardText>
                              <CardText>Harga: {prod.price}</CardText>
                              <Button style={{ weight: 100 }} color="primary">
                                Order
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </CardDeck>
                  </Row>
                </div>
              </Col>
            </div>
          )}
        </Row>
        <Row className="w-100 ">
          <Col className="mt-5 w-100">
            <div className="fixed-bottom footer d-flex justify-content-center align-items-center">
              <h6 className="text-white">Created by Bani Sholih</h6>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  login: state.login,
  product: state.product,
});

const mapDispatchToProps = { getUser, logoutAuth, getProduct };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
