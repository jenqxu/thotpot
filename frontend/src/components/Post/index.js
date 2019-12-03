import React, { Component } from "react";
import './Post.css'
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import calLogo from './calendar-logo.jpg'
import locLogo from './location-logo.jpg'
import memLogo from './members-logo.png'


//Renders a post
//create Feed to render a post for available posts
class Post extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "Post">
                <p className="Event">
                    <img className="Avatar" src="https://www.misstamchiak.com/wp-content/uploads/2018/11/P1120837-12-e1542903288155.jpg" alt="Avatar">
                    </img>
                </p>

                <div className="event-name">
                    <span>Christmas hot pot </span>
                </div>

                <div className="description">
                    <div className="describers">
                        <p><img className="calendar-logo" src={calLogo} alt="calendar" ></img> December 25</p>
                        <p><img className="location-logo" src={locLogo} alt="location" ></img> 2 miles away</p>
                        <p><img className="members-logo" src={memLogo} alt="members" ></img> 3 members</p>
                    </div>
                </div>

                <div className="Post-join">
                    <Button className='Post-join-button' variant='outline-dark'>Join</Button>
                </div>
            </div>
        );
        
    }
}

export default Post;