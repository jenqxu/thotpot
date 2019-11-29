import React from "react";
import "./Header.css";
import Logo from './logoWithText.svg';

class Header extends React.Component{
    render(){
        return (
           <nav className="Nav">
             <div className="Nav-menus">
               <div className="Nav-brand">
                   <img class="logo" src={Logo}/>
               </div>
             </div>
           </nav>
       );
    }   
}
export default Header;