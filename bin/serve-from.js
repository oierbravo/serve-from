#!/usr/bin/env node

const package = require('../package.json');

//const request = require('request');
const axios = require('axios');
const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();
program.version(package.version);

program.requiredOption('-s, --source <source>', 'Source server without protocol.')
.option('-p, --port <port>', 'Output port. Defaults: 8080',8080)
.option('-h, --host <host>', 'Output host. Defaults: localhost','localhost')
.parse(process.argv);

const source = program.source;
const port = program.port;
const host = program.host;

const sourceUrl = `https://${source}`

console.log('Source host: ' + chalk.yellow(sourceUrl));
app.get('*', async (req, res) => {
  axios.get(`${sourceUrl}${req.path}`, {params:req.query })
    .catch(function (error) {
      console.log(error);
    })
    .then(function (response) {
      res.status(response.request.res.statusCode).send(response.data);
    })
})
  console.log(host);
  app.listen(port, host, () => {
    console.log('Listening on ' + chalk.green(`http://${host}:${port}`))
  })