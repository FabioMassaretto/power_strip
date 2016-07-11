import React from 'react'
import $ from 'jquery'
import NavBar from './navbar.jsx'
import Home from './home.jsx'

export default React.createClass({
  displayName: 'HomeScreen',

  getInitialState : function getInitialState() {
      return {
          switches : [],
          isMenuOpen: false  
      };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON("/api/switches").then((function (switches) {
      this.setState({
        switches: switches
      });
    }.bind(this)));
  },

  componentDidMount: function componentDidMount(){

  },

  checkServerState: function checkServerState(){
  },

//ID is formatted as "sw1"
  toggleSwitch: function toggleSwitch(id) {
    var route = "/api/switches/" + id;
    $.post(route).then(function (data){
      this.state.switches[id[2] - 1] = data;
      this.setState({
           switches: this.state.switches
        });
      }.bind(this)
    )
  },

  changeName: function changeName(id, name){
    var route = "/api/switches/" + id + "/name";
    $.post(route, name).then(function (data){
      this.state.switches[id[2] - 1] = data;
      this.setState({
        switches: this.state.switches
      });
    }.bind(this))
  },

  // Functions for the NavBar

  openIconMenu: function openIconMenu(){
    $('.gn-menu-wrapper').addClass('gn-open-part')
  },

  closeIconMenu: function closeIconMenu(){
    $('.gn-menu-wrapper').removeClass('gn-open-part')
  },

  bodyClick: function bodyClick(){
    this.closeMenu();
    // this.removeEventListener('click', this.bodyClick)
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
      <div className="container">
        <NavBar
          openIconMenu={this.openIconMenu}
          closeIconMenu={this.closeIconMenu}
          bodyClick={this.bodyClick}
          openMenu={this.openMenu}
          closeMenu={this.closeMenu}
          menuToggle={this.menuToggle}
          isMenuOpen={this.state.isMenuOpen}
        />
        <Home
          switches={this.state.switches}
          toggleSwitch={this.toggleSwitch}
          changeName={this.changeName}
          nameInput={this.nameInput}
          checkServerState={this.checkServerState}
        />
      </div>
    )
    

  }
});
