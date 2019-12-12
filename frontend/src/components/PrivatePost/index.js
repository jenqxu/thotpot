import React, { Component } from 'react';
import Moment from "moment";
import { Button, Card, Accordion, AccordionToggle, AccordionCollapse, Container, Row, Col } from 'react-bootstrap';
import './Post.css';
import 'bootstrap/dist/css/bootstrap.css';
import one from './icons/1.svg';
import two from './icons/2.svg';
import three from './icons/3.svg';
import four from './icons/4.svg';
import five from './icons/5.svg';
import members from './members-logo.png';
import calendar from './calendar-logo.jpg';
import axios from 'axios';

class PrivatePost extends Component {
  constructor(props){
    super(props);
  }
 
  randomIcon() {
    let icons = [one, two, three, four, five];
    return icons[(Math.floor(Math.random() * icons.length))];
  }

  handleJoin = (host, name) => {

    let authtoken = localStorage.getItem('JWT');
    axios.get('http://localhost:9000/account/status', {
        'headers': {Authorization: `Bearer ${authtoken}`}
    }).then(res =>{
      let myName = res.data.user.name;
      let eventHost = host.toLowerCase();
      let eventName = name.toLowerCase();
      let hostEvent = `${eventHost}-${eventName}`;
      
      //check if person is already attending
      axios.get(`http://localhost:9000/private/events`,
        {'headers': {Authorization: `Bearer ${authtoken}`}
      }).then(res => {
        let going = false; 
        for (let[key, value] of Object.entries(res.data.result)){ //Go through each of the available entries
          let arr = value.data.members; 
          if(key == hostEvent){ //if we find the right event entry
            going = value.data.members.includes(myName);

            //if currently not going, create new post to override old one- JOIN
            if(!going){
              value.data.members.push(`${myName}`);

              axios.post(`http://localhost:9000/private/create/`,{
              'host': value.host,
              'eventName': value.eventName,
              'data': {
                  'description':value.data.description,
                  'date': value.data.date ,
                  'members': value.data.members }
              },
              {'headers': {Authorization: `Bearer ${authtoken}`}, 
              }).then(res => {
                  alert('Joined!');
              }).catch(error => {
                  alert("i think update private join didn't work");
                });     
            } else if (going && myName!==value.host){ //if currently going and you're not the host - UNJOIN
              let index = value.data.members.indexOf(myName);
              if (index !== -1) value.data.members.splice(index, 1);

              axios.post(`http://localhost:9000/private/create/`,{
              'host': value.host,
              'eventName': value.eventName,
              'data': {
                  'description':value.data.description,
                  'date': value.data.date ,
                  'members': value.data.members }
              },
              {'headers': {Authorization: `Bearer ${authtoken}`}, 
              }).then(res => {
                  alert('Unjoined!');
              }).catch(error => {
                  alert("i think update private unjoin didn't work");
                });
            }
          }
        }
      }).catch(err => {alert('no')});


    }).catch(error => {
      alert("You are not logged in");
    });

  }

  render() {
    const host = this.props.hostName;
    const name = this.props.name;
    const description = this.props.description;
    const membersGoing = this.props.membersGoing;
    const date = this.props.date;

    return (
      <Accordion>
        <Card style={{ width: '18rem' }}>
          <AccordionToggle as={Button} variant='link' eventKey='0'>
            <Card.Header><Card.Title
              style={{
                fontSize: 18,
              }}>
              {name} by {host}</Card.Title></Card.Header>
            <Card.Img variant='top' src={this.randomIcon()} className='icon' />
          </AccordionToggle>
          <AccordionCollapse eventKey='0'>
            <Card.Body>
              <Card.Text className='text-muted'>Created by {host}</Card.Text>
              <Card.Text>{description}</Card.Text>
              <p><img src={calendar} className='calendar-logo' /> {Moment(date).calendar()}</p>
            </Card.Body>
          </AccordionCollapse>
          <Card.Footer>
            <Container>
              <Row>
                <Col><p
                  style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}>
                  <img src={members} className='members-logo' /> {membersGoing}</p></Col>
                <Col><Button className='joinButton' variant='outline-warning' onClick={ () => this.handleJoin(host, name)}>Join</Button></Col>
              </Row>
            </Container>
          </Card.Footer>
        </Card>
      </Accordion>
    );
  }
}

export default PrivatePost;