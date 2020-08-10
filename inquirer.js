const inquirer = require('inquirer');

module.exports = {
  askKomodoSpecs: () => {
    const questions = [
      {
        name: 'chainName',
        type: 'input',
        message: 'Enter kmd-chain Name:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter kmd-chain Name';
          }
        }
      },
      {
        name: 'chainSupply',
        type: 'input',
        message: 'Enter kmd-chain Supply:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter kmd-chain Supply';
          }
        }
      },
      {
        name: 'chainNode',
        type: 'input',
        message: 'Enter other node IP:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter other node IP';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
};