import React from 'react'

import { Link } from 'react-router'

export default React.createClass ({
    displayName: "Navbar",
    render: function(){
      return (
        <div className="navbar" fluid>
          <ul id="gn-menu" className="gn-menu-main">
            <li className="gn-trigger">
              <a 
                className="gn-icon gn-icon-menu"
                onMouseEnter={this.props.openIconMenu}
                onMouseLeave={this.props.closeIconMenu}
                onClick={this.props.menuToggle}
              >
                <span>Menu</span>
              </a>
              <nav 
                className="gn-menu-wrapper"
                onMouseOver={this.props.openMenu}
              >       
                <div className="gn-scroller">
                  <ul className="gn-menu">
                    <li><Link to="/switches/sw1" className="gn-icon gn-icon-cog">{this.props.switches[0] ? this.props.switches[0].name : "Switch 1"}</Link></li>
                    <li><Link to="/switches/sw2" className="gn-icon gn-icon-cog">{this.props.switches[1] ? this.props.switches[1].name : "Switch 2"}</Link></li>
                    <li><Link to="/switches/sw3" className="gn-icon gn-icon-cog">{this.props.switches[2] ? this.props.switches[2].name : "Switch 3"}</Link></li>
                    <li><Link to="/switches/sw4" className="gn-icon gn-icon-cog">{this.props.switches[3] ? this.props.switches[3].name : "Switch 4"}</Link></li>
                    <li><Link to="/switches/sw5" className="gn-icon gn-icon-cog">{this.props.switches[4] ? this.props.switches[4].name : "Switch 5"}</Link></li>
                  </ul>
                </div> 
              </nav>
            </li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      );
    }
})
