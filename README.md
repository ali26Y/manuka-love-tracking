# Manuka Love Tracking

Manuka Love tracking website for Batch ID's.

## Project Setup

**Source**: The main addition to base Create-React-App is a new folder: `src/lambda`. This folder is specified and can be changed in the `package.json` script: `"build:lambda": "netlify-lambda build src/lambda"`.

**Dist**: Each JavaScript file in there will be built for Netlify Function deployment in `/built-lambda`, specified in [`netlify.toml`](https://www.netlify.com/docs/netlify-toml-reference/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex).

As an example, we've included a small `src/lambda/hello.js` function, which will be deployed to `/.netlify/functions/hello`. We've also included an async lambda example using async/await syntax in `async-dadjoke.js`.

## Babel/webpack compilation

All functions (inside `src/lambda`) are compiled with webpack using Babel, so you can use modern JavaScript, import npm modules, etc., without any extra setup.

## Local Development

```bash
## prep steps for first time users
npm i -g netlify-cli # Make sure you have the [Netlify CLI](https://github.com/netlify/cli) installed
git clone https://github.com/netlify/create-react-app-lambda ## clone this repo
cd create-react-app-lambda ## change into this repo
yarn # install all dependencies

## done every time you start up this project
ntl dev ## nice shortcut for `netlify dev`, starts up create-react-app AND a local Node.js server for your Netlify functions
```

This fires up [Netlify Dev](https://www.netlify.com/docs/cli/?utm_source=github&utm_medium=swyx-CRAL&utm_campaign=devex#netlify-dev-beta), which:

- Detects that you are running a `create-react-app` project and runs the npm script that contains `react-scripts start`, which in this project is the `start` script
- Detects that you use `netlify-lambda` as a [function builder](https://github.com/netlify/netlify-dev-plugin/#function-builders-function-builder-detection-and-relationship-with-netlify-lambda), and runs the npm script that contains `netlify-lambda build`, which in this project is the `build:lambda` script.

You can view the project locally via Netlify Dev, via `localhost:8888`.

Each function will be available at the same port as well:

- `http://localhost:8888/.netlify/functions/hello` and 
- `http://localhost:8888/.netlify/functions/async-dadjoke`

## Deployment

During deployment, this project is configured, inside `netlify.toml` to run the build `command`: `yarn build`.

`yarn build` corresponds to the npm script `build`, which uses `npm-run-all` (aka `run-p`) to concurrently run `"build:app"` (aka `react-scripts build`) and `build:lambda` (aka `netlify-lambda build src/lambda`).
