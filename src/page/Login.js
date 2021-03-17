import React, { Component } from "react";
import swal from "sweetalert2";
import { Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser } from "../redux/actions/login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.loginUser = this.loginUser.bind(this);
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async loginUser(event) {
    event.preventDefault();
    const { email, password } = this.state;

    this.props
      .loginUser(email, password)
      .then((response) => {
        this.props.history.push("/");
        swal.fire({
          icon: "success",
          title: "Success",
          text: "Login successfully",
        });
      })
      .catch(function (error) {
        swal.fire({
          icon: "error",
          title: "Hmmm!",
          text: "Username or password is wrong!",
        });
      });
  }

  render() {
    return (
      <>
        <Row className="h-100 no-gutters">
          <Col md={7} className="login-cover">
            {/* <div className='d-flex flex-column justify-content-between login-overlay w-100 h-100'>
              <h3 className='text-dark'>Welcome To <br/>Budget Application</h3>
            </div> */}
          </Col>
          <Col md={5}>
            <div className="d-flex flex-column w-100 h-100 pl-3">
              <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <Form className="login-form mb-5" onSubmit={this.loginUser}>
                  <h1>Login</h1>
                  <h3>Kalbe Online Shop</h3>
                  <p>Welcome Back, Please Login to your account! :)</p>
                  <div className="input-wrapper no-gutter">
                    <FormGroup className="form-group">
                      <Label className="w-100">
                        <Input
                          type="email"
                          name="email"
                          onChange={this.handlerChange}
                          placeholder="Email Adress"
                        />
                      </Label>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Label className="w-100">
                        <Input
                          type="password"
                          name="password"
                          onChange={this.handlerChange}
                          placeholder="Password"
                        />
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="d-flex flex-row justify-content-between mt-4">
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" />
                        <span>Remember Me</span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className="mt-4">
                    <Button className="btn right-btn" type="submit">
                      Login
                    </Button>
                    <Link className="btn left-btn ml-2" to="/register">
                      Sign Up
                    </Link>
                  </div>
                  <div className="d-flex flex-column mt-5">
                    <div>By signing up, you agree to Liferary’s</div>
                    <div>
                      {" "}
                      <a href="/tnc">Terms and Conditions</a> &amp;{" "}
                      <a href="/pp">Privacy Policy</a>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.login,
});

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
