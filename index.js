#!/usr/bin/env node

const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const files       = require('./lib/files');
const inquirer    = require('./lib/inquirer');
const Spinner     = require('clui').Spinner;
const fs          = require('fs')
var csvWriter     = require('csv-write-stream')


clear();

console.log(
  chalk.yellow(
    figlet.textSync('Intake ADC', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  try{
    // Get file input
    const filePaths = await inquirer.askFilePaths();
   
    // Try to convert the file to unit16s
    const spinner = new Spinner('Converting file. Please wait ...')
    spinner.start()

    if(files.convertToUnit16BECSV(filePaths))
    {
      spinner.stop()
      console.log(chalk.green(`All done!`))
    }

    else {
      console.log(chalk.red('Failed to convert file. Check logs for more details.'))
    }
  }

  catch(error) {
    console.log(chalk.red('Error: ', error))
    process.exit(1)
  }
}

run()