import React, {Component} from 'react';
import './Header.css';
import Logo from './logoWithText.svg';
import {Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';


class Header extends Component {
    render(){
        return (
          <nav className='Nav'>
            <div className='Nav-menus'>
              <ButtonToolbar>
                <div className='justify-content-between'>
                <img className = 'logo' alt='thotpot logo' src={Logo}/>
                <ButtonGroup className='buttons'>
                  <Button className='headerButton' variant='outline-dark'>Sign up</Button>
                  <Button className='headerButton' variant='outline-dark'>Log in</Button>
                </ButtonGroup>
                </div>
              </ButtonToolbar>
            </div>
          </nav>
      );
    }   
}
export default Header;