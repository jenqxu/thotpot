import React, { Component } from 'react';
import './Header.css';
import Logo from './logoWithText.svg';
import { Button, ButtonToolbar, ButtonGroup, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {GoogleLogin} from 'react-google-login';
import axios from 'axios';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: null,
      name:'',
      pass:'',
      data:{
        last:'',
        email:''
      }
    }; 
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow(id) {
    this.setState({ show: id });
  }

  handleSubmitCreate = event => {
    event.preventDefault(); 
    const email = this.state.data.email; 
    const pass = this.state.pass; 
    const last = this.state.data.last; 
    const name = this.state.name;

    
    //post account info to the Account storage
    axios.post('http://localhost:9000/account/create',
       {
        'name':name,
        'pass': pass,
        'data': {
          'last':last,
          'email': email,
        },
       }).then(res => {
        alert('Account created');
      }).catch(error => {
        alert("i think not - account couldn't be created");
        });

      this.handleClose();
  }


  handleName = event => {
    event.preventDefault();
    this.setState({name: event.target.value});
  }
  
  
  handlePass = event =>{
    event.preventDefault();
    this.setState({pass: event.target.value});
  }
  
  handleLast = event =>{
    event.preventDefault();
    this.setState({data:{
      last: event.target.value,
      email:this.state.data.email
      }
    });
  }
   handleEmail= event =>{
    event.preventDefault();
    this.setState({data:{
      last:this.state.data.last,
      email: event.target.value
      }
    });
  }

  handleLogOut = event =>{
    event.preventDefault(); 
    let authtoken = localStorage.getItem("JWT");
    if (authtoken === null){
      alert("You are not logged in");
    } else {
      alert("Logging out");
      localStorage.removeItem("JWT");
    }
  }
 

  //once logged in, you'll get a jwt token as a response
  //need jwt token for accessing private data
  handleSubmitLog = event => {    
    event.preventDefault(); 
    const pass = this.state.pass; 
    const name = this.state.name;

    axios.post('http://localhost:9000/account/login',
    {
      'name':name,
      'pass':pass
    }).then(res => {
      //alert(res.data.jwt);
      let authtoken = res.data.jwt; 
      localStorage.setItem("JWT", authtoken);
      //localStorage.removeItem('myCat');
      //var cat = localStorage.getItem('myCat');
      alert("Logged in");
    }).catch(error => {
      alert("i think not");
      });

    this.handleClose(); 
  }

  handleDeleteAccount = event =>{
    event.preventDefault();
    const name = this.state.name;
    let authtoken = localStorage.getItem("JWT");
    
    axios.delete(`http://localhost:9000/account/${name}`).then(res => {alert('Account deleted')}).catch(error => alert('think not deleting account'));
    axios.delete(`http://localhost:9000/user/${name}`,
    {'headers': {Authorization: `Bearer ${authtoken}`}}).then(res => {
      alert('User deleted');
      if (authtoken === null){
        alert("You are not logged in");
      } else {
        alert("Deleting account");
        localStorage.removeItem("JWT");
      }
    }).catch(error => alert('think not deleting user'));

   
  }

  //Essentially a test for /account/status
  componentDidMount(){
    let authtoken = localStorage.getItem('JWT');
    axios.get('http://localhost:9000/account/status', {
      'headers': {
        Authorization: `Bearer ${authtoken}`
      }
    }).then(res => {
      //alert('worke?');
      //alert(res.data.user.name);
    }).catch(error => {
      alert("You are not logged in");
      });
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
                  onSubmit={this.handleSubmitCreate}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Sign up!
			          	</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicFirstName" onChange={this.handleName}>
                        <Form.Control type="text" placeholder="First Name" />
                      </Form.Group>

                      <Form.Group controlId="formBasicLastName" onChange={this.handleLast}>
                        <Form.Control type="text" placeholder="Last Name" />
                      </Form.Group>

                      <Form.Group controlId="formBasicEmail" onChange={this.handleEmail}> 
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
    		            		</Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword" onChange={this.handlePass}>
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
                  onSubmit = {this.handleSubmitLog}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      Log in!
			          	</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="formBasicFirstName" onChange={this.handleName}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword" onChange={this.handlePass}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <Button variant="outline-dark float-right" type="submit">
                        Submit
 				        	    </Button>
                    </Form>
                  </Modal.Body>
                </Modal>

                <Button
                  variant='outline-dark'
                  onClick={this.handleLogOut}
                >
                  Log out
                </Button>

                <Button
                  variant='outline-dark'
                  onClick={this.handleDeleteAccount}
                >
                  Delete account
                </Button>
               
              </ButtonGroup>
            </div>
          </ButtonToolbar>
        </div>
      </nav>
    );
  }
}
export default Header;