import React, { Component } from "react";
import NavbarTop from "../components/Navbar";
import {
  Row,
  Col,
  Jumbotron,
  Card,
  CardTitle,
  Button,
} from "reactstrap";
import swal from "sweetalert2";
import qs from "querystring";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";

import { getUser } from "../redux/actions/user";
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
    this.checkLogin();
    const param = qs.parse(this.props.location.search.slice(1));
    this.fetchData(param);
  }

  render() {
    const { isLoading } = this.props.user;
    const { name, income, expenses, balance } = this.props.login.dataLogin;
  
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
            <div>
              <Col>
                <Jumbotron className="ml-5">
                  <h3 className="display-3 mt-3">Hello {name}</h3>
                  <p className="lead">
                    Welcome to Banis Budget App <br />
                    This is your accounting
                  </p>
                </Jumbotron>
              </Col>
              <Col>
                <div className="container">
                  <Row className="text-center">
                    <Col sm="4">
                      <Card body>
                        <CardTitle tag="h5">Income</CardTitle>
                        <div className="result">
                          Rp. {parseFloat(income)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </div>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card body>
                        <CardTitle tag="h5">Expenses</CardTitle>
                        <div className="result">
                          Rp. {parseFloat(expenses)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </div>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
                    <Col sm="4">
                      <Card body>
                        <CardTitle tag="h5">Balance</CardTitle>
                        <div className="result">
                          Rp. {parseFloat(balance)
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
                        </div>
                        <Button>Go somewhere</Button>
                      </Card>
                    </Col>
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
});

const mapDispatchToProps = { getUser, logoutAuth };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
