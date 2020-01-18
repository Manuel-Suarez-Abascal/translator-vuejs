# translator-vuejs

Check the [demo here](https://manuel-suarez-abascal.github.io/translator-vuejs/)

# Project Setup

=================

# Dependencies

Make sure to have all these dependencies installed in your local machine:

- [Node.js](https://nodejs.org/en/) - v10.15.3
- [Vue Cli](https://cli.vuejs.org/guide/installation.html) - v3.5.5

## Install Modules

- Go to the project's root folder & run the following command:
```
npm install
```

### Run The Project For Local Development

- After all modules are installed, run the command:
```
npm run serve
```
It will open a developer environment local server in ```http://localhost:8080/```

### Compile & Minify For Production ###

- Once it is ready for production, run the command:

```
npm run build
```

### Run your tests with [Cypress.js](https://www.cypress.io/) 
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg?style=flat-square)](https://cypress.io)

- First, make sure that your project is **[running locally](#run-the-project-for-local-development)**.

- Once your local development is running & ready, open a new terminal, go to the project's root folder & run the command:
```
npm run cypress:open
```
If everything was done correctly, you'll get a popup window...make sure to click in `application-testing.js` & cypress'll start running the tests.

**Notes:** 

- For contributing all tests must passed before requesting a new `Pull Request`.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Future Enhancement

- Disable 'play' button if language audio is not available.
- Add theme selection to local storage.

# Contributors

- [Kamer Elciyar](https://github.com/kamer)
