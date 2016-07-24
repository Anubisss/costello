# Costello
Costello is a simple personal project.

I coded it to try and learn about [React](http://reactjs.com/).
I used [Materialize](http://materializecss.com/) to design the app and [Browserify](http://browserify.org/) & [Babel](https://babeljs.io/) combo to compile/bundle the application's JavaScript source file (app.js).
The build system is provided by [Gulp](http://gulpjs.com/).

*Note: the app is tested with only Google Chrome Version 52.0.2743.82 (64-bit).*

## Install & development
If you want to build the app just follow these steps.

* Get the source: `git clone https://github.com/Anubisss/costello.git`
* Install the dependencies: `npm install`

#### Production
To build the production ready version: `npm run-script build`

All of the minified code with the dependencies will be in the build directory just open the index.html to try out.

#### Development
If you want to develop the app use this command: `npm run-script watch`

It will generate src/bundle.js which is the bundled version of the app JavaScript files.
Just open src/index.html and if you make a change in the source JavaScript files then refresh the browser (sorry no hot reload) and you will see the changes.

## Demo
* If you want to try out: https://anubisss.github.io/costello
* Screenshot: http://i.imgur.com/65X03X7.png

## License
The MIT License (MIT)
