const inquirer   = require('inquirer');
const files      = require('./files');
const PathPrompt = require('inquirer-path');


module.exports = {

  // Ask for path to file that needs to be converted
  askFilePaths: () => {
    const questions = [
      {
        type: 'path',
        name: 'input',
        message: 'Enter input file.',
        default: `${process.cwd()}/data/session.log`,
        validate: function(value) {
          if (files.fileExists(value)) {
            return true;
          } else {
            return 'Please enter a valid file.';
          }
        }
      },
      {
        type: 'path',
        name: 'output',
        message: 'Enter output path and filename.',
        default: `${process.cwd()}/data/output/session.csv`,
        validate: function(value) {
          if (files.fileExists(value)) {
            return 'File already exists. Please enter a new file name.';
          } else {
            return true;
          }
        }
      }
    ];

    return inquirer.prompt(questions);
  },
}