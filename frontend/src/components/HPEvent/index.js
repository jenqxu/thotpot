import React, { Component } from 'react';
import './Event.css';
import { Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//Hot Pot Event

class HPEvent extends Component {
    constructor(props){
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show:null,
            host:'',
            eventName:'',
            data:{
                description:'',
                location: '',
                date: new Date(),
                members: new Array()
            }
        }
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow(id) {
        this.setState({ show: id });
    }

    handleCreateShow(id){
        let authtoken = localStorage.getItem("JWT");
        if (authtoken === null){
        alert("Log in to create an event");
        } else {
            this.handleShow(id);
        }
    }

    handleSubmit = event =>{
        event.preventDefault();
    
        let eventName = this.state.eventName;
        let description = this.state.data.description;
        let location = this.state.data.location;
        let date = this.state.data.date;


        //AUTHENTICATE THE  USER


        //Get the Host's data and put it into 'host' and 'members'
        let authtoken = localStorage.getItem('JWT');
        axios.get('http://localhost:9000/account/status', {
            'headers': {Authorization: `Bearer ${authtoken}`
            }
        }).then(res => {
            this.state.host=res.data.user.name;
            let host = this.state.host; 
            this.state.data.members = new Array(); 
            this.state.data.members.push(host);
            let members = this.state.data.members;
            
            //add the event to Public data storage
            axios.post(`http://localhost:9000/public/create/`,
                {
                    'host':host,
                    'eventName': eventName,
                    'data': {
                        'description':description,
                        'location': location,
                        'date': date,
                        'members': members
                    },
                }).then(res => {
                    alert('i think create-event worked');
                }).catch(error => {
                    alert("i think create-event didn't work");
                    });
            

            //add the event to the User data storage
           axios.post(`http://localhost:9000/user/event`, {
                'data':[{
                    'eventName': this.state.eventName,
                }], 'type':'merge'},
                {'headers': {Authorization: `Bearer ${authtoken}`}
            }).then(res => {//alert("i think user post worked")
            }).catch(error => {alert("i think user post didn't work")});

        }).catch(error => {
            alert("i think not");
        });

        this.handleClose(); 
    }

    handleDate = date =>{
        this.setState({data:{
            description: this.state.data.description,
            location: this.state.data.location,
            date: date,
            members: this.state.data.members
            }
        })
    }

    handleDesc = event =>{
        event.preventDefault();
        this.setState({data:{
            description: event.target.value,
            location: this.state.data.location,
            date: this.state.data.date,
            members: this.state.data.members
            } 
        });
    }

    handleEventName = event =>{
        event.preventDefault();
        this.setState({eventName: event.target.value});
    }


    render(){
        return(
            <nav className='Nav'>
                <div className='Nav-menus'>
                    <Button
                    variant='outline-dark'
                    className = "button-event"
                    onClick={()=> this.handleCreateShow('modal1')}
                    >
                    Create an event!
                    </Button>
                    
                    <Modal
                        size='lg'
                        aria-labelledby='contained-modal-vcenter'
                        centered
                        show={this.state.show === 'modal1'}
                        onHide={this.handleClose}
                        onSubmit={this.handleSubmit}
                        >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                            Create an event!
                                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form>
                            <Form.Group controlId="formBasicEventName" >
                                <Form.Control type="text" placeholder="Event Name" onChange={this.handleEventName}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicEventDesc">
                                <Form.Control type="text" placeholder="Description" onChange={this.handleDesc}/>
                            </Form.Group>

                            <Form.Group controlId="formDatePicker">
                                <DatePicker
                                    showTimeSelect
                                    selected = {this.state.data.date}
                                    dateFormat="MM/dd/yyyy, h:mm aa"
                                    placeholderText = "  Date"
                                    value={this.state.date}
                                    onChange={date => this.handleDate(date)}
                                />
                            </Form.Group>

                            <Button variant="outline-dark" type="submit">
                                Submit
                            </Button>
                           
                            </Form>
                        </Modal.Body>
                    </Modal>
                </div>
            </nav>
        );
    }
}

export default HPEvent; 