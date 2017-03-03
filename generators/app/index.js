/**
 * Created by liuqi453 on 10/18/16.
 */
var generators = require('yeoman-generator')
var _ = require('lodash')
var fs = require('fs')
var path = require('path')
module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments)
    },

    initializing: function () {
        this.distPath = path.basename(process.cwd())
        console.log('Ready to create a vue2 project...')
        console.log('By default the project will be generated in current folder, specify a name different from current folder name to generate files under it')
    },

    prompting: function () {
        return this.prompt([{
            type: 'input',
            name: 'root',
            message: 'Please type in the dir of your app: ',
            default: this.distPath // Default to current folder name
        }, {
            type: 'input',
            name: 'description',
            message: 'Description: ',
            default: 'This is a vue2 app.' // Default to current folder name
        }]).then(function (answers) {
            var appName = 'index'

            var rootName = _.startCase(answers.root).replace('\ ', ''),
                componentName = _.startCase(appName).replace('\ ', '')

            this.componentName = componentName
            this.rootName = _.snakeCase(this.distPath) ===  _.snakeCase(rootName) ? '' : _.snakeCase(rootName) + '/'
            this.vuexName = _.camelCase(componentName)
            this.description = answers.description

        }.bind(this))
    },

    configuring: function () {

    },

    'default': function () {

    },

    writing: {

        generate: function () {
            if(this.rootName){
	            this.destinationRoot(this.rootName)
            }

            fs.readdirSync(this.templatePath()).forEach(function (fileName) {
                if (fileName == 'src') {
                    fs.readdirSync(this.templatePath(fileName)).forEach(function (fn) {
                        if (fn == 'views') {
                            this.fs.copyTpl(
                                this.templatePath('src/views/Index/Index.vue'),
                                this.destinationPath(this.rootName + 'src/views/' + this.componentName + '/' + this.componentName + '.vue'),
                                {
                                    vuexName: this.vuexName
                                }
                            )

                            this.fs.copyTpl(
                                this.templatePath('src/views/Index/types.js'),
                                this.destinationPath(this.rootName + 'src/views/' + this.componentName + '/types.js'),
                                {
                                    vuexName: this.vuexName
                                }
                            )
                        }else if (fn == 'components') {
                            this.fs.copy(
                                this.templatePath('src/components/common/.gitkeep'),
                                this.destinationPath(this.rootName + 'src/components/common/.gitkeep')
                            )

                            this.fs.copy(
                                this.templatePath('src/components/Index/.gitkeep'),
                                this.destinationPath(this.rootName + 'src/components/' + this.componentName + '/.gitkeep')
                            )
                        }else if(fn == 'vuex'){
                            fs.readdirSync(this.templatePath('src/vuex')).forEach(function (f) {

                                if(f == 'modules'){
                                    this.fs.copyTpl(
                                        this.templatePath('src/vuex/modules/index.js'),
                                        this.destinationPath(this.rootName + 'src/vuex/modules/' + this.vuexName + '.js'),
                                        {
                                            componentName: this.componentName,
                                            vuexName: this.vuexName
                                        }
                                    )
                                }else {
                                    this.fs.copyTpl(
                                        this.templatePath(fileName + '/' + fn + '/' + f),
                                        this.destinationPath(this.rootName + fileName + '/' + fn + '/' + f),
                                        {
                                            componentName: this.componentName,
                                            vuexName: this.vuexName
                                        }
                                    )
                                }

                            }.bind(this))
                        } else {
                            this.fs.copyTpl(
                                this.templatePath(fileName + '/' + fn),
                                this.destinationPath(this.rootName + fileName + '/' + fn),
                                {
                                    componentName: this.componentName,
                                    vuexName: this.vuexName
                                }
                            )
                        }
                    }.bind(this))
                } else if (fileName == 'package.json') {
                    this.fs.copyTpl(
                        this.templatePath(fileName),
                        this.destinationPath(this.rootName + fileName),
                        {
                            pluginName: _.snakeCase(this.componentName),
                            description: this.description
                        }
                    )
                } else if (fileName == 'static') {
                    this.fs.copy(
                        this.templatePath(fileName + '/*'),
                        this.destinationPath(this.rootName + fileName + '/')
                    )
                    this.fs.copy(
                        this.templatePath(fileName + '/.*'),
                        this.destinationPath(this.rootName + fileName + '/')
                    )
                } else {
                    this.fs.copy(
                        this.templatePath(fileName),
                        this.destinationPath(this.rootName + fileName)
                    )
                }
            }.bind(this))
        }
    },

    conflicts: function () {

    },

    install: function () {
	    console.log('install dependencies:')
	    console.log(this.rootName ? '$ cd ./' : '$ cd ' + this.rootName + '&& npm install')
	    console.log('run the app:')
	    console.log('$ npm run dev')
    },

    end: function () {

    }
})
