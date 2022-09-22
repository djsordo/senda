/**
 * 
 * Taken from: https://gist.github.com/Alhamou/10d5dcfc338c4e5a33485029b6d23b9d
 */
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const JsZip = require('jszip');


const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const CREDENTIALS_PATH = `${__dirname}\\..\\PRIVATE\\credentials.json`;
const TOKEN_PATH = `${__dirname}\\..\\PRIVATE\\token.json`;

function getAuthorizationAndPerformDriveOperation( callback, args ){
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), 
                  callback, args );
  });  
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
 function authorize(credentials, callback, args ) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback, args );
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, args ); // uploadFilename
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
 function getAccessToken(oAuth2Client, callback, args ) {
  const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
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
          callback(oAuth2Client, args );
      });
  });
}



function uploadFilename( auth, args ) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list( { q : ` name = '${args.destFilename}' ` } )
    .then( (result, err) => { 
      result.data.files.forEach( (fileData) => {
        if( fileData.name === args.destFilename ){
          drive.files.delete( { fileId : fileData.id } )
            .then( (value, err) => {
              console.log( `${fileData.name} deleted because it existed on drive` );
            })
        }
      });
      drive.files.create({
        resource: {'name': args.destFilename },
        media: {  
              mimeType: args.destContentType,
              body: fs.createReadStream( args.sourceFilename ) },
        fields: 'id' }, 
        function (err, res) {
          if (err) {
            // Handle error
            console.log(err);
          } else {
            console.log('File Id: ', res.data.id);
            if( fs.existsSync( args.sourceFilename ) ){
              fs.unlinkSync( args.sourceFilename );
            }
          }
      });
    } );
}


/**
 * https://javascript.plainenglish.io/how-to-create-zip-files-with-node-js-505e720ceee1
 * 
 * @param { string[] } sourcePaths 
 * @param { string } zipFile 
 */
function createZip( sourcePaths, zipFile ){

  const zip = new JsZip();
  try{
    for( let sourcePath of sourcePaths ){
      addPathRecursivelyToZip( zip, sourcePath );
    }
    zip.generateNodeStream( { type : 'nodebuffer', streamFiles : true } )
      .pipe( fs.createWriteStream( zipFile ) );
  }catch( err ) {
    console.log( err );
  }
  
}


function addPathRecursivelyToZip( zip, sourcePath ){

  if( fs.statSync( sourcePath ).isFile() )
    zip.file( path.basename( sourcePath ), fs.readFileSync( sourcePath ) );
  else{
    let zipDirectory = zip.folder( path.basename( sourcePath ) );
    for( let file of  fs.readdirSync( sourcePath ) ){
      addPathRecursivelyToZip( zipDirectory, path.join( sourcePath, file ) );
    }
  }

}


function helpMessage(){
  console.log( `Please call with node ${path.basename( process.argv[1] )} USERNAME` );
}


/**
 * main program 
 */
if( process.argv.length !== 3 ){
  helpMessage();
}else{
  // 0, 1, 2: depending on the day of the month (to avoid overwriting the same file over and over)
  let iterativeDay = (new Date()).getDate() % 3;
  let zipFileName = `secrets_${process.argv[2]}.zip`;
  let uploadFileName = `secrets_${process.argv[2]}_${iterativeDay}.zip`;
  createZip( [ path.join( __dirname, '..', 'PRIVATE' ),
               path.join( __dirname, '..', 'SECRETS.md' ) ], 
              zipFileName );
  getAuthorizationAndPerformDriveOperation( uploadFilename, 
  {
    sourceFilename : zipFileName, 
    destFilename : uploadFileName, 
    destContentType : 'application/octet-stream'
  } );
}



