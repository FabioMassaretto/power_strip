var Navbar = React.createClass ({
    displayName: "Navbar",

    getInitialState : function getInitialState() {
        return {
          isMenuOpen: false,
        };
    },

    openIconMenu: function openIconMenu(){
      $('.gn-menu-wrapper').addClass('gn-open-part')
    },

    closeIconMenu: function closeIconMenu(){
      $('.gn-menu-wrapper').removeClass('gn-open-part')
    },

    bodyClick: function bodyClick(){
      this.closeMenu();
      this.removeEventListener('click', this.bodyClick)
    },

    openMenu: function openMenu(){
      // trigger
      document.addEventListener('click', this.bodyClick)
      $('.gn-icon-menu').addClass('gn-selected')
      
      // menu
      $('.gn-menu-wrapper').addClass('gn-open-all')
      this.setState({isMenuOpen: true})
      this.closeIconMenu();
    },

    closeMenu: function(){
      if (this.isMenuOpen) return;

      document.removeEventListener('click', this.bodyClick)
      $('.gn-icon-menu').removeClass('gn-selected')
      this.setState({isMenuOpen: false})
      $('.gn-menu-wrapper').removeClass('gn-open-all')

      this.closeIconMenu();

    },

    menuToggle: function menuToggle(){
      event.stopPropagation();
      event.preventDefault();
      if (this.state.isMenuOpen){
        this.closeMenu();
      }
      else {
        this.openMenu();
      }
    },

    render: function(){
      return (
        <div className="navbar" fluid>
          <ul id="gn-menu" className="gn-menu-main">
            <li className="gn-trigger">
              <a 
                className="gn-icon gn-icon-menu"
                onMouseEnter={this.openIconMenu}
                onMouseLeave={this.closeIconMenu}
                onClick={this.menuToggle}
              >
                <span>Menu</span>
              </a>
              <nav 
                className="gn-menu-wrapper"
                onMouseOver={this.openMenu}
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

ReactDOM.render(
  React.createElement(Navbar, null),
  document.getElementById('navbar')
);