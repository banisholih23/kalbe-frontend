import React, {Component} from 'react'
import swal from 'sweetalert2'
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'

import {register} from '../redux/actions/login'

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  handlerChange = (e) =>{
		this.setState({[e.target.name]: e.target.value})
	}
  registerUser = (event) => {
		event.preventDefault()
		const {name, email, password} = this.state

    this.props.register(name, email, password).then((response) => {
      this.props.history.push('/')
      swal.fire({
  			icon: 'success',
  			title: 'Success',
  			text: 'Register Successfully, Please Login!'
      })
    }).catch(function (error) {
      swal.fire({
        icon: 'error',
        title: 'Hmmm!',
        text: "Data already exist"
      })
    })
	}
  async componentDidMount(){

	}
  render(){
    return(
      <>
        <Row className='h-100 no-gutters'>
          <Col md={7} className='login-cover'>
          </Col>
          <Col md={5}>
            <div className='d-flex flex-column w-100 h-100 pl-3'>
              <div className='flex-grow-1 d-flex justify-content-center align-items-center'>
                <Form className='login-form mb-5' onSubmit={this.registerUser}>
                  <h1>Register</h1>
                  <p>Hi! Lets join us :)</p>
                  <div className='input-wrapper no-gutter'>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='text' name='name' onChange={this.handlerChange} placeholder='Full Name'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='email' name='email' onChange={this.handlerChange} placeholder='Email Adress'/>
                      </Label>
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <Label className='w-100'>
                        <Input type='password' name='password' onChange={this.handlerChange} placeholder='Password'/>
                      </Label>
                    </FormGroup>
                    </div>
                  <div className='d-flex flex-row justify-content-between mt-4'>
                    <FormGroup check>
                      <Label check>
                        <Input type='checkbox' />
                        <span>Remember Me</span>
                      </Label>
                    </FormGroup>
                  </div>
                  <div className='mt-4'>
                    <Button type='submit' className='btn right-btn'>Register</Button>
                    <Link className='btn left-btn ml-2' to='/'>Login</Link>
                  </div>
                  <div className='d-flex flex-column mt-5'>
                    <div>By signing up, you agree to Liferary’s</div>
                    <div> <a href='#'>Terms and Conditions</a> &amp; <a href='#'>Privacy Policy</a></div>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </>
    )
  }
}

const mapDipatchToProps = {register}

export default connect(null, mapDipatchToProps)(Register)