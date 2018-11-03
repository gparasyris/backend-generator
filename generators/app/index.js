'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');


let capitalize = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let prepareProps = function (props) {
  return {
    name: props.name,
    plural: props.name + 's',
    nameFirstCapital: capitalize(props.name),
    nameCapitalPural: capitalize(props.name) + 's',
    nameAllCapital: props.name.toUpperCase(),
    nameAllCapitalPlural: props.name.toUpperCase()+'S'
  }
}

/*
 * Available options for scaffolding.
 * Switch case in writing determines which templates are to be generated.
 * */
const availableOptions = ['module', 'provider', 'utility', 'app'];

module.exports = class extends Generator {
  prompting() {
    console.log('\n');
    // // Have Yeoman greet the user.
    // this.log(
    //   yosay(`Welcome to the beautiful ${chalk.red('generator-sventech')} generator!`)
    // );
    let buildOptions = '';
    availableOptions.forEach((o, index) => { if (index != availableOptions.length - 1) buildOptions += `${o} | `; else buildOptions += `${o}`; });
    const prompts = [
      // {
      //   type: 'input',
      //   name: 'type',
      //   message: `Choose type to scaffold: [ ${buildOptions} ]`,
      //   //Defaults to the project's folder name if the input is skipped
      //   // default: this.appname
      // },
      {
        type: 'list',
        name: 'type',
        message: 'What do you want to generate?', choices: availableOptions
        //Defaults to the project's folder name if the input is skipped
        // default: this.appname
      },
      {
        type: 'input',
        name: 'name',
        message: 'Name',
        //Defaults to the project's folder name if the input is skipped
        // default: this.appname
      }];

    return this.prompt(prompts).then(props => {
      if (props.name)
        props.capitalisedName = capitalize(props.name);
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let error = false;
    if (!this.props.type || !this.props.name) {
      error = true;
    }
    else {
      let params = prepareProps(this.props);
      console.log(this.props);
      console.log(`Scaffolding new ${this.props.name} ${this.props.type}...`);
      switch (this.props.type) {
        case 'app':

          break;
        case 'module':
          // index
          this.fs.copyTpl(
            this.templatePath('_modules/_index.js'),
            this.destinationPath(`api/modules/${params.plural}/index.js`), params
          );
          // index
          this.fs.copyTpl(
            this.templatePath('_modules/_routes.js'),
            this.destinationPath(`api/modules/${params.plural}/routes.js`), params
          );

          break;
        case 'provider':

          break;
        case 'utility':

          break;

        default:
          error = true;
          break;
      }
    }
    if (error) {
      errorLog(this.props);
    }
    // console.log(this.props);
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  }

  // install() {
  //   this.installDependencies();
  // }
};

function errorLog(props) {
  console.log(
    '\n---------------Error---------------\n' +
    'You entered the following values:\n' +
    ` - Name: ${props.name}\n` +
    ` - Type: ${props.type} \n` +
    'There is an error in values passed, please try again.\n'
  )
}

