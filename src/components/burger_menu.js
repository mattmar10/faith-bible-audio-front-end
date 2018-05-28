import React from 'react';
import { withRouter, Link } from "react-router-dom";
import '../css/Burger.css'

class BurgerMenu extends React.Component {

    constructor() {
        super();
        
        this.state = {
          showMenu: false,
        };
        
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
      }
      
      showMenu(event) {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
      }
      
      closeMenu(event) {
        console.log('close it');
        if (this.dropdownMenu!= null && !this.dropdownMenu.contains(event.target)) {
          
          this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });  
          
        }
      }
    
      render() {
        return (
          <div>
            <Link to='/search'>
                <i className="fas fa-search menuIcon"></i>
            </Link>
            &ensp;
            <span id="bmenu_ellipse"><i className="fas fa-ellipsis-v fa-1x menuIcon" onClick={this.showMenu}></i></span>
            
            {
              this.state.showMenu
                ? (
                  <div
                    className="bmenu"
                    ref={(element) => {
                      this.dropdownMenu = element;
                    }}
                  >
                    <ul>
                        <li><Link to="/" onClick={this.showMenu}>Home</Link></li>
                        <li><a href="mailto://fbc@faithbibleok.com">Contact Us</a> </li>
                        <li><a href="http://www.faithbibleok.com"> Main Site </a></li>
                    </ul>
                  </div>
                )
                : (
                  null
                )
            }
          </div>
        );
      }


};

export default withRouter(BurgerMenu);