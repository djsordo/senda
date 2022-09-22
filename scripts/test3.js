/**
 * 
 * Taken from: https://gist.github.com/Alhamou/10d5dcfc338c4e5a33485029b6d23b9d
 */
'use strict';

const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const JsZip = require('jszip');


const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS_PATH = `${__dirname}\\..\\PRIVATE\\credentials.json`;
const TOKEN_PATH = `${__dirname}\\..\\PRIVATE\\token.json`;

function main(){
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), uploadFile);
  });  
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
 function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);//list files and upload file
      //callback(oAuth2Client, '0B79LZPgLDaqESF9HV2V3YzYySkE');//get file

  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
 function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'online',
      scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error retrieving access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
              if (err) return console.error(err);
              console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client);
      });
  });
}

function uploadFile(auth) {
  const drive = google.drive({ version: 'v3', auth });
  var fileMetadata = {
      'name': 'test-rlunaro.zip'
  };
  var media = {
      mimeType: 'application/octet-stream',
      body: fs.createReadStream('test-rlunaro.zip')
  };
  drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
  }, function (err, res) {
      if (err) {
          // Handle error
          console.log(err);
      } else {
          console.log('File Id: ', res.data.id);
      }
  });
}

function createZip( sourceFiles, zipFile ){
  const zip = new JsZip();

  try{
    for( let file of sourceFiles ){
      zip.file( file );
    }
    zip.generateNodeStream( { type : 'nodebuffer', streamFiles : true } )
      .pipe( fs.createWriteStream( zipFile ) )
      .on('finish', () => { console.log('finished'); } );
  }catch( err ) {
    console.log( err );
  }
  
}


createZip( [`${__dirname}\\..\\PRIVATE`, 
            `${__dirname}\\..\\SECRETS.md`], 
            'rlunaro-secrets.zip' );