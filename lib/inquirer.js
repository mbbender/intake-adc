const inquirer   = require('inquirer');
const files      = require('./files');
const PathPrompt = require('inquirer-path');


module.exports = {

  // Ask for path to file that needs to be converted
  askFilePath: () => {
    const questions = [
      {
        type: 'path',
        name: 'path',
        message: 'Enter a path',
        default: `${process.cwd()}/data/session.log`,
        validate: function(value) {
          if (files.fileExists(value)) {
            return true;
          } else {
            return 'Please enter a valid file.';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
}