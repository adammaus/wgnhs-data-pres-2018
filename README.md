# data-pres-2018
simple web map for our Borehole Geophysical Logs and Sediment Core data viewer.

Web map is live here: https://wgnhs.github.io/data-pres-2018/


## Development
This project requires [NodeJS 8+](https://nodejs.org/) installed on your development system. We recommend using the latest LTS version.

### Setup
```
npm ci
```
After cloning the repository, bring up a terminal in the repository's root directory and run `npm ci` to download the dependencies.

### Running
```
npm start
```
The `npm start` command is configured to build the project, then serve the project 
at `http://localhost:8080/data-pres-2018/`

The server will watch for source changes and automatically refresh the browser.


### Building
```
npm run build
```
The distributable folder `dist/` can be generated by runnning `npm run build`

