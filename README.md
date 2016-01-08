<img align="left" alt="GA logo." title="General Assemb.ly" src="https://github.com/generalassembly/ga-ruby-on-rails-for-devs/raw/master/images/ga.png" height="90px">



# Tempify WDI DTLA 6 Project 4




## About This App


**NEST thermostat** is a smart home automation device which controls a home or office's heating and AC.  These devices connect to the internet through wifi and allows users to control the thermostats with any internet enabled devices.

This app where you can control your NEST thermostat to view current indoor temperature and set new target temperature. 

- **Community** - Energy saving should be EVERYONE's concern, reminding the NEST adminstrator to turn off Heater/AC on off days or turn up/down AC/Heater when it gets too HOT/COLD.
- **Energy Saving** - Save electricity and $$$ with fine tuned control of your thermostat.
- **Device profile and management** - provides an overview of NEST thermostats' current conditions for easy management.
- **Remote control** - forget to turn off AC/Heater before you leave? Control NEST thermostats from ANYWHERE.
- **Coordinate weather events for smart decisions** - app provides real-time indoor temperature data from your NEST thermostat device from NEST cloud API and outdoor weather updates from Yahoo! Weather to help users to set the perfect indoor temperature.

---

## Project Challenges

- Learn to work with scaffolding tool Yeoman which generates large amount of files and complex file structure.
- Learn to work with task runner Grunt to automate repetitive tasks of minification, compilation, unit testing, linting, etc.
- Implementing token based Authentication with NEST passport strategy.
- Learn and implement EventSource which provides continuous real-time updates from APIs
Implement multiple APIs which often causes CORS error

---


## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.

## Technology Used


Communication | Design | Development | APIs | Deployment
----| ---| --- | --- | --- | ---
[Trello](https://trello.com/)| [Moqups](moqups.com)| [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)| [Nest Cloud API](https://developer.nest.com/documentation/cloud/apis) | [Heroku](http://heroku.com/)
 [Slack](https://slack.com/) | [Sublime](http://www.sublimetext.com/) | [CSS](http://www.w3schools.com/css/) | [Google OAuth](https://developers.google.com/identity/) | [MongoLab](https://mongolab.com/)
 [Markdown](https://guides.github.com/features/mastering-markdown/)|  | [Bootstrap](http://getbootstrap.com/) | [Yahoo! Weather](https://developer.yahoo.com/weather/) | [Grunt](http://gruntjs.com/)
 [Slides](http://slides.com/) |  | [JavaScript/jQuery](https://www.javascript.com/) | [Socket.io](http://socket.io/)| 
 [Agile management](https://en.wikipedia.org/wiki/Agile_management)|  | [Node.js](https://nodejs.org/en/) | [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
 |  | [Express](http://expressjs.com/) |
 |  | [MongoDB](https://docs.mongodb.org/manual/) |
 |  | [Mongoose](http://mongoosejs.com/) |
 |  | [Yeoman](http://yeoman.io/) |
 |  | [AngularJS](https://angularjs.org/) |
