'use strict';
const Generator = require('yeoman-generator');
var pluralize = require('pluralize')


let capitalize = function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let prepareProps = function (props) {
  // console.log('*** in module params ***');
  return {
    name: props.name,
    plural: pluralize(props.name),
    nameFirstCapital: capitalize(props.name),
    nameCapitalPural: pluralize(capitalize(props.name)),
    nameAllCapital: props.name.toUpperCase(),
    nameAllCapitalPlural: pluralize(props.name).toUpperCase()
  }
}

let GUARDS = {
  MODULE: 1,
  PROVIDER: 1,
  UTILITY: 1,
  INSTALL: 1
}

let generanorMode = '';
let installDep = false;
/*
 * Available options for scaffolding.
 * Switch case in writing determines which templates are to be generated.
 * */
const availableOptions = ['module', 'provider', 'utility', 'app'];

module.exports = class extends Generator {

  async createModule(name, params, extraPath = false) {
    if (GUARDS.MODULE--) { return; }
    // console.log(this.props);
    // console.log('after:', params);
    await this.fs.copyTpl(
      this.templatePath('_models/_model.js'),
      this.destinationPath(`${extraPath ? extraPath + '/' : ''}api/models/${name}.js`), params
    );
    // index
    await this.fs.copyTpl(
      this.templatePath('_modules/_index.js'),
      this.destinationPath(`${extraPath ? extraPath + '/' : ''}api/modules/${params.plural}/index.js`), params
    );
    // routes
    await this.fs.copyTpl(
      this.templatePath('_modules/_routes.js'),
      this.destinationPath(`${extraPath ? extraPath + '/' : ''}api/modules/${params.plural}/routes.js`), params
    );
    // routes
    await this.fs.copyTpl(
      this.templatePath('_modules/_functions.js'),
      this.destinationPath(`${extraPath ? extraPath + '/' : ''}api/modules/${params.plural}/functions.js`), params
    );
  }
  // couter = 0;
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

  async writing() {
    let error = false;
    if (!this.props.type || !this.props.name) {
      error = true;
    }
    else {
      let params = prepareProps(this.props);
      // console.log('initial props:', this.props);
      console.log(`Scaffolding new ${this.props.name} ${this.props.type}...`);
      generanorMode = this.props.type;
      switch (this.props.type) {
        case 'app':
          // this.log('IN APPPPPPP');
          let apiSubfolders = ['models', 'modules', 'utilities'];
          /* 1. create directory based on the name provided by the user */
          // for (let folder of apiSubfolders){

          // }
          // await fs.mkdir(`/${this.props.name}/api/${folder}`, { recursive: true }, (err) => {
          //   if (err) throw err;
          // });
          // fs.mkdir('./path/to/dir', {recursive: true}, err => {})
          /* 2. git init */
          /* 3. git ignore */
          await this.fs.copyTpl(
            this.templatePath('_gitignore'),
            this.destinationPath(`${this.props.name}/.gitignore`), params
          );
          /* 4. dummy readme */
          /* 5. package.json */
          /* 6. env */
          /* 7. env.template */
          /* 8. create folder api and api/models  api/modules api/utilities */
          // this.props.name = 'todo';
          let moduleParams = await prepareProps({ name: 'todo' });
          try {
            // models index
            await this.fs.copyTpl(
              this.templatePath(`_models/_index.js`),
              this.destinationPath(`${this.props.name}/api/models/index.js`), params
            );

            // console.log('before:', moduleParams);
            await this.createModule('todo', moduleParams, this.props.name);

            // module index
            await this.fs.copyTpl(
              this.templatePath(`_misc/_index.js`),
              this.destinationPath(`${this.props.name}/api/modules/index.js`), params
            );

            // utilities
            const utilities = ['router', 'demo'];

            await this.fs.copyTpl(
              this.templatePath(`_misc/_index.js`),
              this.destinationPath(`${this.props.name}/api/utilities/index.js`), params
            );

            for (let util of utilities) {
              await this.fs.copyTpl(
                this.templatePath(`_utilities/_${util}.js`),
                this.destinationPath(`${this.props.name}/api/utilities/${util}.js`), params
              );
            }

            await timer(500);

            // middleware
            const middleware = ['responseHandler'];
            // console.log('middleware******');'
            await this.fs.copyTpl(
              this.templatePath(`_misc/_index.js`),
              this.destinationPath(`${this.props.name}/api/middleware/index.js`), params
            );

            for (let file of middleware) {
              // console.log('file', file);
              await this.fs.copyTpl(
                this.templatePath(`_middleware/_${file}.js`),
                this.destinationPath(`${this.props.name}/api/middleware/${file}.js`), params
              );
            }

            // misc
            await this.fs.copyTpl(
              this.templatePath(`_misc/_launch.json`),
              this.destinationPath(`${this.props.name}/.vscode/launch.json`), params
            );


            // this.fs.copyTpl(
            //   this.templatePath('_models/_model.js'),
            //   this.destinationPath(`${this.props.name}/api/models/todo.js`), moduleParams
            // );
            // // index
            // this.fs.copyTpl(
            //   this.templatePath('_modules/_index.js'),
            //   this.destinationPath(`${this.props.name}/api/modules/todos/index.js`), moduleParams
            // );
            // // routes
            // this.fs.copyTpl(
            //   this.templatePath('_modules/_routes.js'),
            //   this.destinationPath(`${this.props.name}/api/modules/todos/routes.js`), moduleParams
            // );
            // // routes
            // this.fs.copyTpl(
            //   this.templatePath('_modules/_functions.js'),
            //   this.destinationPath(`${this.props.name}/api/modules/todos/functions.js`), moduleParams
            // );

            // this.createModule('todo', this.prepareProps(this.props));
            /* 9. server.js */
            /* 10. prompt for npm i */
            /* 11. notify the user to cd inside the name he provided 8 */
            await this.fs.copyTpl(
              this.templatePath('_server.js'),
              this.destinationPath(`${this.props.name}/server.js`), params
            );

            await this.fs.copyTpl(
              this.templatePath('_package.json'),
              this.destinationPath(`${this.props.name}/package.json`), params
            );
            // this.installDependencies({
            //   bower: false,
            //   npm: true,
            //   yarn: false
            // });
            // this.prompt(devPrompts)
            //   .then((devAnswers) => {
            //     // var done = this.async();
            //     // this.spawnCommandSync
            //     console.log(devAnswers);
            //     if (devAnswers.install && devAnswers.install.toLowerCase() === 'y') {
            //       const installConfig = {
            //         bower: false,
            //         npm: true,
            //         yarn: false
            //       };
            //       this.installDependencies(installConfig).
            //         then(() => {
            //           this.log(`To access your app type: cd ${this.props.name}/`);
            //           this.log(`Don't forget to run npm install!`);

            //         })
            //     }
            //     else {
            //       this.log(`To access your app type: cd ${this.props.name}/`);
            //     }
            //   })

            // .then(() => {
            // })
          }
          catch (e) {
            // error
          }
          break;
        case 'module':
          // model
          // this.createModule(this.props.name, params).bind(this);
          // let newModule = this.createModule.bind(this);
          // newModule(this.props.name, params);
          // console.log('params');
          // this.log(params);
          this.fs.copyTpl(
            this.templatePath('_models/_model.js'),
            this.destinationPath(`api/models/${this.props.name}.js`), params
          );
          // index
          this.fs.copyTpl(
            this.templatePath('_modules/_index.js'),
            this.destinationPath(`api/modules/${params.plural}/index.js`), params
          );
          // routes
          this.fs.copyTpl(
            this.templatePath('_modules/_routes.js'),
            this.destinationPath(`api/modules/${params.plural}/routes.js`), params
          );
          // routes
          this.fs.copyTpl(
            this.templatePath('_modules/_functions.js'),
            this.destinationPath(`api/modules/${params.plural}/functions.js`), params
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

  installPrompt(params) {
    if (GUARDS.INSTALL--) return;
    this.installDependencies(params)
      .then(() => {
        // done();
        this.log(`\nTo access your app type: cd ${this.props.name}/`);

      })
  }

  secondPrompting() {
    // const devPrompts = [
    //   {
    //     type: 'input',
    //     name: 'install',
    //     message: '\nDo you want to install dependencies now? Y/N',
    //   }];
    // // try {
    // // let devAnswers = await this.prompt(devPrompts);
    // this.prompt(devPrompts)
    //   .then((devAnswers) => {
    //     // console.log(devAnswers);
    //     if (devAnswers.install && devAnswers.install.toLowerCase() === 'y') {
    //       installDep = true;
    //     }
    //   });
  }

  async end() {
    // let done = this.async();
    if (generanorMode !== 'app') return;
    let npmdir = process.cwd() + `/${this.props.name}`;
    process.chdir(npmdir);
    this.log('\n');
    this.spawnCommand('git', ['init'])
    // process.chdir(npmdir);
    await timer(500);
    this.log('\n');
    const devPrompts = [
      {
        type: 'input',
        name: 'install',
        message: 'Do you want to install dependencies now? Y/N',
      }];
    try {
      let devAnswers = await this.prompt(devPrompts);
      if (devAnswers.install && devAnswers.install.toLowerCase() === 'y') {
        installDep = true;
      }
    }
    catch (e) {

    }
    // const devPrompts = [
    //   {
    //     type: 'input',
    //     name: 'install',
    //     message: '\nDo you want to install dependencies now? Y/N',
    //   }];
    // // try {
    // // let devAnswers = await this.prompt(devPrompts);
    // this.prompt(devPrompts)
    //   .then((devAnswers) => {
    //     // console.log(devAnswers);
    //     if (devAnswers.install && devAnswers.install.toLowerCase() === 'y') {
    const installConfig = {
      bower: false,
      npm: true,
      yarn: false
    };
    // this.installPrompt(installConfig);
    // this.spawnCommand
    if (installDep) {
      // this.log('\n');
      // Change working directory to 'gulp' for dependency install

      this.installDependencies(installConfig).
        then(() => {
          // done();
          this.spawnCommand('git', ['add', '.']);
          timer(500)
            .then(() => {
              this.spawnCommand('git', ['commit', '-m', '"initial commit"']);
              return timer(500);
            })
            .then(() => {
              this.log(`\nTo access your app type: cd ${this.props.name}/\n`);
            })
        })
    }
    else {
      await timer(500);
      this.spawnCommand('git', ['add', '.']);
      // process.chdir(npmdir);
      await timer(500);
      this.spawnCommand('git', ['commit', '-m', '"initial commit"']);
      this.log('\n');
      await timer(500);
      this.log(`\nTo access your app type: cd ${this.props.name}/`);
      this.log(`\n * * * Don't forget to run npm install! * * *\n`);
      // done();

    }
  }

};

const timer = ms => new Promise(res => setTimeout(res, ms));


function errorLog(props) {
  console.log(
    '\n---------------Error---------------\n' +
    'You entered the following values:\n' +
    ` - Name: ${props.name}\n` +
    ` - Type: ${props.type} \n` +
    'There is an error in values passed, please try again.\n'
  )
}

