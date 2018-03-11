const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const files       = require('./lib/files');
const inquirer    = require('./lib/inquirer');
const CLI         = require('clui');
const Spinner     = CLI.Spinner;
const fs          = require('fs')
var csvWriter = require('csv-write-stream')


clear();
console.log(
  chalk.yellow(
    figlet.textSync('Intake', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const credentials = await inquirer.askFilePath();
  return credentials.path;

}


run().then( 
  path => { 
    const data = files.readFile(path)
    writeCSV(data)
  }
)

function writeCSV(data)
{
  console.log(data)
  var file = fs.createWriteStream('data.csv')
  file.on('error', function(err) { /* error handling */ })
  data.forEach(function(v) { file.write(v + '\n'); })
  file.end();
}