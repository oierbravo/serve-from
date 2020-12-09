#!/usr/bin/env node

const package = require('../package.json');

const request = require('request');
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())

const chalk = require('chalk');
const { Command } = require('commander');
const program = new Command();
program.version(package.version);

program.requiredOption('-s, --source <source>', 'Source server without protocol.')
.option('-p, --port <port>', 'Output port. Defaults: 8080',8080)
.parse(process.argv);

const source = program.source;
const port = program.port;
const sourceUrl = `https://${source}`

console.log('Source host: ' + chalk.yellow(sourceUrl));
app.get('*', async (req, res) => {
    request(`${sourceUrl}${req.path}`, function (error, response, body) {
        if(error) {
          console.error('error:', error); // Print the error if one occurred
        }
        res.status(response.statusCode).send(body)
    });
  })
  app.listen(port, () => {
    console.log('Listening on ' + chalk.green(`http://localhost:${port}`))
  })