import React, { Component } from 'react';
import './Header.css';
import Logo from './logoWithText.svg';
import { Button, ButtonToolbar, ButtonGroup, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {GoogleLogin} from 'react-google-login';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: null
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id) {
    this.setState({ show: id });
  }

  render() {
    return (
      <nav className='Nav'>
        <div className='Nav-menus'>
          <ButtonToolbar>
            <div className='justify-content-between'>
              <img className='logo' alt='thotpot logo' src={Logo} />
              <ButtonGroup className='buttons'>

                {/* This is for the sign up button and corresponding modal*/}
                <Button
                  variant='outline-dark'
                  onClick={() => this.handleShow('modal1')}
                >
                  Sign up
                </Button>
                <Modal
                  size='lg'
                  aria-labelledby='contained-modal-vcenter'
                  centered
                  show={this.state.show === 'modal1'}
                  onHide={this.handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Sign up!
			          	</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicFirstName">
                        <Form.Control type="email" placeholder="First Name" />
                      </Form.Group>

                      <Form.Group controlId="formBasicLastName">
                        <Form.Control type="email" placeholder="Last Name" />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
    		            		</Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                    <ButtonToolbar className='float-right justify-content-between'>
                      <Button variant="outline-dark" type="submit">
                        Submit
 				        	    </Button>
                      <GoogleLogin
                        clientId = '658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
                        buttonText="Login"
                        // onSuccess={responseGoogle}
                        // onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                      />

                    </ButtonToolbar>
                    </Form>
                  </Modal.Body>
                </Modal>

                {/* This is for the log in button and corresponding modal*/}
                <Button
                  variant='outline-dark'
                  onClick={() => this.handleShow('modal2')}
                >
                  Log in
                  </Button>
                <Modal
                  size='lg'
                  aria-labelledby='contained-modal-vcenter'
                  centered
                  show={this.state.show === 'modal2'}
                  onHide={this.handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Log in!
			          	</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <Button variant="outline-dark float-right" type="submit">
                        Submit
 				        	    </Button>
                    </Form>
                  </Modal.Body>
                </Modal>
              </ButtonGroup>
            </div>
          </ButtonToolbar>
        </div>
      </nav>
    );
  }
}
export default Header;