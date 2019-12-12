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

class Post extends Component {
  constructor(props) {
    super(props);
  }

  randomIcon() {
    let icons = [one, two, three, four, five];
    return icons[(Math.floor(Math.random() * icons.length))];
  }

  handleJoin() {

  }

  render() {
    const hostName = this.props.hostName;
    const name = this.props.name;
    const description = this.props.description;
    const membersGoing = this.props.membersGoing;
    const date = this.props.date;

    // const hostName = 'Butt Boy';
    // const name = 'Neckbeard Hotpot';
    // const description = 'hotpot but with bathwater from cute girls';
    // const membersGoing = 56;
    // const date = new Date(2019, 11, 11);

    return (
      <Accordion>
        <Card style={{ width: '18rem' }}>
          <AccordionToggle as={Button} variant='link' eventKey='0'>
            <Card.Header><Card.Title
              style={{
                fontSize: 18,
              }}>
              {name}</Card.Title></Card.Header>
            <Card.Img variant='top' src={this.randomIcon()} className='icon' />
          </AccordionToggle>
          <AccordionCollapse eventKey='0'>
            <Card.Body>
              <Card.Text className='text-muted'>Created by {hostName}</Card.Text>
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
                <Col><Button className='joinButton' variant='outline-warning'>Join</Button></Col>
              </Row>
            </Container>
          </Card.Footer>
        </Card>
      </Accordion>
    );
  }
}

export default Post;