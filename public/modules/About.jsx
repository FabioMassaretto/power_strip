import React from 'react'

export default React.createClass({
  render(){
    return (
      <div className="aboutWrapper">
        <h1>About</h1>
        <p>Raspi Smart-Strip is a DIY solution for dumb electronics.</p>
        <p className="about"> 
          My name is Kyle Peacock, and I refuse to get out of bed to turn off 
          my lamp or space heater. It's 2016, people!

          Everything you see here is open source. You can see all the code online 
          at <a href="https://github.com/krpeacock/power_strip">
             github.com/krpeacock/power_strip
          </a>. 

          For pictures and a description of my build, check out my blog post at <a href="http://www.peacockweb.net/blog/power-strip">peacockweb.net/blog/power-strip</a>!
        </p>

        <p className="about"> 
          Most likely, the page you're looking at is my demo. Currently, the server 
          is designed to run only on a local network, where it will be visible to 
          computers sharing the wifi. So, don't worry, you're not causing me any 
          trouble by clicking on things.
        </p>
        <p className="about">Many thanks to the following Open-Source technologies that made this project possible!</p>
        <ul className="about">
          <li><a href="https://facebook.github.io/react/index.html">React.js</a></li>
          <li><a href="https://github.com/reactjs/react-router">React-router</a></li>
          <li><a href="https://nodejs.org/en/">Node.js</a></li>
          <li><a href="http://expressjs.com/">Express.js</a></li>
          <li><a href="https://www.raspbian.org/">Raspbian</a></li>
          <li><a href="https://github.com/">Github</a></li>
          <li><a href="http://www.material-ui.com/#/">Material-UI</a></li>
          <li><a href="https://codepen.io/keithpickering/">Keith Pickering's </a> Toggle Switch</li>
          <li><a href="http://tympanus.net/codrops/2013/07/30/google-nexus-website-menu/">Navbar Menu</a></li>
        </ul>
      </div>
    )
  }
})