const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./inquirer');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { spawn } = require("child_process");
const process = require('process');
const userName = require("os").userInfo().username 
clear();
async function kmd(){
    console.log(
        chalk.green(
        figlet.textSync('Komodo Create Chain', { horizontalLayout: 'full' })
      ));
      
    const specs = await inquirer.askKomodoSpecs();
    //console.log(specs);
    
    process.chdir(`/home/${userName}/komodo/src`);
    //console.log(process.cwd());
    const params = `./komodod -ac_name=${specs.chainName} -ac_supply=${specs.chainSupply} -addnode=${specs.chainNode} &`
    
    var crt = spawn('./komodod', [`-ac_name=${specs.chainName}`, `-ac_supply=${specs.chainSupply}`,`-addnode=${specs.chainNode}`, `&`], { stdio: 'inherit' });
    
    let data = "";
    for await (const chunk of crt.stdout) {
        console.log('stdout chunk: '+chunk);
        data += chunk;
    }
    let error = "";
    for await (const chunk of crt.stderr) {
        console.error('stderr chunk: '+chunk);
        error += chunk;
    }
    const exitCode = await new Promise( (resolve, reject) => {
        crt.on('close', resolve);
    });

    if( exitCode) {
        throw new Error( `subprocess error exit ${exitCode}, ${error}`);
    }
    console.log("-----------------------------------")
    return data;



    //get new addres
    //validate address
}

exports.kmd = kmd;