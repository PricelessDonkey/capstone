# Project Instructions

This is the Front End Web Developer Capstone project for Udacity. The extra piece of functionality i added was:

Add end date and display length of trip.

## Information

PLEASE NOTE: if no image is found, we display the default image (the picture of earth).

to build the project, do either of these:
npm run build-prod
npm run build-dev

to start the server, do:
npm start

The main requirements were:
1. create an express app
2. use webpack to have separate production and development builds
3. use Jest to add unit tests for relevant JS files
4. use service workers to cache the page
5. call three different APIs and dynamically update the page with the results
6. create a responsive UI that works on both mobile and desklop platforms

## project dependencies
dependencies:
1. dotenv: ^8.2.0,
2. express: ^4.17.1,
3. node-fetch: ^2.6.0,
4. regenerator-runtime: ^0.13.5,
5. webpack: ^4.43.0,
6. webpack-cli: ^3.3.11

devDependencies: 
7. @babel/core: ^7.9.6,
8. @babel/preset-env: ^7.9.6,
9. babel-loader: ^8.1.0,
10. clean-webpack-plugin: ^3.0.0,
11. css-loader: ^3.5.3,
12. file-loader: ^6.0.0,
13. html-webpack-plugin: ^3.2.0,
14. jest: ^26.0.1,
15. node-sass: ^4.14.1,
16. sass-loader: ^8.0.2,
17. style-loader: ^1.2.1,
18. url-loader: ^4.1.0,
19. webpack-dev-server: ^3.11.0,
20. workbox-webpack-plugin: ^5.1.3