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
.option('-d, --debug <type>', 'Output host. Defaults: false',false)
.parse(process.argv);

const source = program.source;
const port = program.port;
const host = program.host;

const debugType = program.debug


const sourceUrl = `https://${source}`
if(debugType && debugType === 'headers'){
  //console.log('Debug ' + chalk.green('enabled: ') + chalk.yellow(debugType));
  console.log(`Debug enabled: ${chalk.yellow(debugType)}`)
}
console.log('Source host: ' + chalk.yellow(sourceUrl));
app.get('*', async (req, res) => {
  const proxyUrl = `${sourceUrl}${req.path}`;
  if(debugType && debugType === 'headers'){
    console.log(`---<[ Debug for: ${chalk.bgRed.white(proxyUrl)} ]>---`)
    console.log(req.headers)
    console.log(`---<[ debugEnd ]>---`)
  }
  
  axios.get(proxyUrl, {params:req.query })
    .catch(function (error) {
      //console.log(error);
      console.log(chalk.red(`Ups! something went wrong with: ${chalk.bgRed.white(proxyUrl)}`))
    })
    .then(function (response) {
      if(response){
        res.status(response.request.res.statusCode).send(response.data);

      }
    })
})
  app.listen(port, host, () => {
    console.log('Listening on ' + chalk.green(`http://${host}:${port}`))
  })