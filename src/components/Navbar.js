import React, { Component } from "react";
import {
  Col,
  Form,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  Modal,
  ModalBody,
  ModalFooter,
  Nav
} from "reactstrap";
import { Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { logoutAuth } from "../redux/actions/login";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class NavbarTop extends Component {
  constructor(props) {
    super(props);
    console.log("ini props navbar", props);
    this.state = {
      showNavbar: false,
      showLogoutModal: false,
      token: jwt.decode(this.props.login.token),
    };
  }
  toggleNavbar = () => {
    this.setState({
      showNavbar: !this.state.showNavbar,
    });
  };
  logoutAuth = () => {
    this.props.logoutAuth();
    this.props.history.push("/");
  };
  toggleLogoutModal = () => {
    this.setState({
      showLogoutModal: !this.state.showLogoutModal,
    });
  };

  render() {
    return (
      <div>
        <Col className="w-100">
          <Navbar className="nav-dashboard fixed-top" light expand="md">
            <Link to="/dashboard" className="navbar-brand text-white">
              Banis Budget App
            </Link>
            <NavbarToggler onClick={this.toggleNavbar} />
            <Collapse isOpen={this.state.showNavbar} navbar>
              <Nav className="mr-auto ml-2" navbar></Nav>
              <span className="navbar-text">
                <Form className="form-inline">
                  <Button
                    onClick={this.toggleLogoutModal}
                    className="btn-danger form-control mr-sm-2"
                    type="button"
                  >
                    Logout
                  </Button>
                </Form>
              </span>
            </Collapse>
          </Navbar>
        </Col>
        <Modal isOpen={this.state.showLogoutModal}>
          <ModalBody className="h4">Are you sure?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.logoutAuth}>
              Logout
            </Button>
            <Button color="secondary" onClick={this.toggleLogoutModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = { logoutAuth };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NavbarTop)
);
