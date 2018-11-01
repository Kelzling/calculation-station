PR280 Assignment 2 - Kelsey Vavasour


•	Write a program that calculates the correlation of two arrays of numbers
[20 marks]
•	Adapt / extend the first program to calculate the regression of two arrays of numbers. 
[20 Marks, but deductions for DUPLICATE CODE]

Basic versions with an index.html that logs to console in 'basic-model-console-output' folder

•	Provide a user interface with Vuejs 
[10 marks]
•	Provide a user interface with Reactjs 
[10 marks]
•	Provide a user interface with Nodejs
[10 marks]
•	Create a RESTful web service for Nodejs that return JSON data
[10 marks]

All four of these tasks can be found in react-vue-node-restful

Run npm start in the folder to launch the servers (the parts created by create-react-app and also an express server which handles some of the files and the RESTful service) and the index page containing both UIs will open automatically once they have mostly finished loading.
The Vue UI interacts directly with the model files, which are served to it by the express server (code for this is in server/routes/index.js) Vue code is found in client/public/index.html and client/src/VueController.js
The React UI interacts with the RESTful service from the express server. React code is found in client/src/App.js and the rendering code is in client/src/index.js.
RESTful service code is in server/app.js, which is the main file for the express server. It interacts with the version of the model files found in server/public/javascripts

•	Create a command line application for Nodejs that reads and write to file
[10 marks]

These can be found in the node-cmdline-programs directory.
They run using node program dataFile1 dataFile2 outputFile with the xK value as an optional 4th parameter for the regression program (just expects a number)

•	Provide Jasminejs unit tests
[10 marks]

Inside the jasmine-unit-tests folder