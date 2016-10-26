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
        var distPlugins = this.destinationPath(this.distPath)
        this.plugins = this.getPlugins(distPlugins)
        console.log('Ready to create a vue2 project...')
    },

    prompting: function () {
        return this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Please type in the name of your app: ',
            default: 'app' // Default to current folder name
        }, {
            type: 'input',
            name: 'description',
            message: 'Description: ',
            default: 'This is a vue2 app.' // Default to current folder name
        }]).then(function (answers) {
            var appName = answers.name

            var componentName = _.startCase(appName).replace('\ ', '')

            this.componentName = componentName
            this.dirName = _.snakeCase(componentName)
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
            fs.readdirSync(this.templatePath()).forEach(function (fileName) {
                if (fileName == 'src') {
                    fs.readdirSync(this.templatePath(fileName)).forEach(function (fn) {
                        if (fn == 'views') {
                            this.fs.copyTpl(
                                this.templatePath('src/views/Index/Index.vue'),
                                this.destinationPath(this.distPath + '/' + this.dirName + '/src/views/' + this.componentName + '/' + this.componentName + '.vue'),
                                {
                                    vuexName: this.vuexName
                                }
                            )

                            this.fs.copy(
                                this.templatePath('src/views/Index/types.js'),
                                this.destinationPath(this.distPath + '/' + this.dirName + '/src/views/' + this.componentName + '/types.js')
                            )
                        } else if(fn == 'vuex'){
                            fs.readdirSync(this.templatePath('src/vuex')).forEach(function (f) {

                                if(f == 'modules'){
                                    this.fs.copyTpl(
                                        this.templatePath('src/vuex/modules/index.js'),
                                        this.destinationPath(this.distPath + '/' + this.dirName + '/src/vuex/modules/' + this.vuexName + '.js'),
                                        {
                                            componentName: this.componentName,
                                            vuexName: this.vuexName
                                        }
                                    )
                                }else {
                                    this.fs.copyTpl(
                                        this.templatePath(fileName + '/' + fn + '/' + f),
                                        this.destinationPath(this.distPath + '/' + this.dirName + '/' + fileName + '/' + fn + '/' + f),
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
                                this.destinationPath(this.distPath + '/' + this.dirName + '/' + fileName + '/' + fn),
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
                        this.destinationPath(this.distPath + '/' + this.dirName + '/' + fileName),
                        {
                            pluginName: _.snakeCase(this.componentName),
                            description: this.description
                        }
                    )
                } else if (fileName == 'static') {
                    this.fs.copy(
                        this.templatePath(fileName + '/*'),
                        this.destinationPath(this.distPath + '/' + this.dirName + '/' + fileName + '/')
                    )
                    this.fs.copy(
                        this.templatePath(fileName + '/.*'),
                        this.destinationPath(this.distPath + '/' + this.dirName + '/' + fileName + '/')
                    )
                } else {
                    this.fs.copy(
                        this.templatePath(fileName),
                        this.destinationPath(this.distPath + '/' + this.dirName + '/' + fileName)
                    )
                }
            }.bind(this))
        }
    },

    conflicts: function () {

    },

    install: function () {

    },

    end: function () {

    }
})
