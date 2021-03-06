# Serve From Commandline utility
> Simple proxy server, usefull to bypass cors limitations in development environments.

![GitHub last commit](https://img.shields.io/github/last-commit/oierbravo/serve-from.svg?style=plastic)
![npm](https://img.shields.io/npm/v/serve-from.svg)
![Maintenance](https://img.shields.io/maintenance/yes/2020.svg)

## Usage
The quickest way to get started is to just run `npx serve-from`.
You can also install it globally.
```bash
npm install -g serve-from
``` 
Once installed you can use it everywhere.
```bash 
serve-from -s example.com
``` 
...will serve content from `https://example.com` on `https://localhost:8080`
```bash 
serve-from -s example.com -p 9000
``` 
... will serve content from `https://example.com` on `https://localhost:9000`
```bash 
serve-from -s example.com:7000 -p 9000
``` 
... will serve content from `https://example.com:7000` on `localhost:9000`
```bash 
serve-from -s example.com:7000 -p 9000 -h 127.0.0.1
``` 
... will serve content from `https://example.com:7000` on `127.0.0.1:9000`
```bash 
serve-from -s example.com:7000 -p 9000 -h 127.0.0.1
``` 
... will serve content from `https://example.com:7000` on `127.0.0.1:9000` printing source headers with `console.log`

### Options
- `-s --source` (REQUIRED) Source server without protocol.
- `-p --port` (OPTIONAL) Destination port, deafult: `8080`.
- `-h --host` (OPTIONAL) Destination host, deafult: `localhost`.
- `-d --debug headers` (OPTIONAL) Debug mode for headers, deafult: `false`. Prints the headers part from the source