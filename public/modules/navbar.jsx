import React from 'react'

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
                    <li><a className="gn-icon gn-icon-cog">Settings</a></li>
                    <li><a className="gn-icon gn-icon-cog" href="#">Switch 1</a></li>
                    <li><a className="gn-icon gn-icon-cog" href="#">Switch 2</a></li>
                    <li><a className="gn-icon gn-icon-cog" href="#">Switch 3</a></li>
                    <li><a className="gn-icon gn-icon-cog" href="#">Switch 4</a></li>
                    <li><a className="gn-icon gn-icon-cog" href="#">Switch 5</a></li>
                  </ul>
                </div> 
              </nav>
            </li>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </div>
      );
    }
})
