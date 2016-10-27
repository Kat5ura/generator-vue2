/**
 * Created by liuqi453 on 10/27/16.
 */
var generators = require('yeoman-generator')
var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var inject = require('gulp-snippet-injector').inject
module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments)

        this.getViews = function (dir) {
            return fs.readdirSync(dir).filter(function (file) {
                return fs.statSync(path.normalize(dir + '/' + file)).isDirectory()
            })
        }
    },

    initializing: function () {
        this.log('Ready to create a component: ')
    },

    prompting: function () {
        var questions = [{
            type: 'list',
            name: 'view',
            message: 'Choose an owner for this component: ',
            choices: this.getViews(this.destinationPath('src/components'))
        }, {
            type: 'input',
            name: 'component',
            message: 'Specify a name: ',
            default: 'defaultComponent' // Default to current folder name
        }]

        return this.prompt(questions).then(function (answers) {
            this.viewName = answers.view
            this.component = _.startCase(answers.component).replace('\ ', '')
            this.componentName = _.camelCase(this.component)

        }.bind(this))
    },

    configuring: function () {

    },

    'default': function () {

    },

    writing: {
        generate: function () {
            this.fs.copyTpl(
                this.templatePath('Index.vue'),
                this.destinationPath('src/components/' + this.viewName + '/' + this.component + '.vue'),
                {
                    componentName: this.componentName
                }
            )
        }
    },

    conflicts: function () {

    },

    end: function () {
    }
})