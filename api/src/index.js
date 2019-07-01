const fs = require("fs");
const convert = require('xml-js');
const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');

const { getLGChannel, saveLGChannel } = require('./channels');

const app = express();
const port = 8081;

app.use(bodyParser.json({ limit: '1mb' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.post('/import', (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if(err) { res.sendStatus(500); }
    const { list } = files;
    fs.readFile(list.path, (err, data) => {
      if (err) { console.log(err); }
      const sourceXML = data;

      const sourceJSON = convert.xml2js(sourceXML, { compact: true });
      const channels = sourceJSON["TLLDATA"]["CHANNEL"]["DTV"]["ITEM"];

      res.json({
        sourceData: sourceJSON,
        channels: channels.reduce(getLGChannel, {})
      })
    })
  });
});

app.post('/export', (req, res) => {
  const updatedList = saveLGChannel({...req.body});
  const updatedXML = convert.js2xml(updatedList, { compact: true, spaces: 0, fullTagEmptyElement: true });
  res.set('Content-Type', 'application/octet-stream');
  res.send(updatedXML);
})

app.listen(port, () => console.log(`Listening on localhost:${port}...`));