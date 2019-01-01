# Level1 - Level2018

## Getting started

1. Download and install [Node.js](http://nodejs.org), which we use to manage our dependencies.
2. Run `npm install` to install all the dependencies.
3. Run `npm run start` within the project directory to start the dev server with automatic browser refresh on file changes with [BrowserSync](https://www.browsersync.io)

## Repository structure and key files

```
.
├── .babelrc
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── gulpfile.js
├── package.json
├── postcss.config.js
├── dist
└── src
    ├── js
    │   └── app.js
    ├── scss
    │   ├── global.scss
    ├── static
    └── templates
        └── partials
```

## Build system

[Gulp](http://gulpjs.com) is used as a build system for the project. Compiles everything to `/dist` directory. It is configured to start local server with [BrowserSync](https://www.browsersync.io), watch files, compile all the code and refresh the browser after compiliation. Look into `gulpfile.js` for configuration.

Gulp requirements are NPM which comes with the Node installation. Project uses NPM [run-script](https://docs.npmjs.com/cli/run-script) command for setting the correct environment for compiling the code.

```
$ npm install
$ npm run start
```

### Tasks

**1. Default development task**

Start local server, watch files and automatically on file changes compile the code and refresh the browser.

```
$ npm run start
```

**2. Build task** to compile the code for production/handoff.

```
$ npm run build
```

## Styles

All the CSS is compiled from `src/scss/global.scss`. There we do the all the imports.

## Scripts

JavaScript is compiled with webpack from `src/js/app.js` automatically with Gulp task.

## Templates

Project uses Handlebars as a templating language for easier development. Gulp task compiles the files from `src/templates/`. The templates can use partials from `src/templates/partials`.

## `dist` folder

Build folder for compiled code. Do not put the contents of the folder in version control.
