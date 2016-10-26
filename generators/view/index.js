/**
 * Created by liuqi453 on 10/20/16.
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
    },

    initializing: function () {
        this.distPath = this.destinationPath()
        console.log('准备创建一个 view:')
    },

    prompting: function () {
        var questions = [
            {
                type: 'input',
                name: 'viewName',
                message: '请指定 view 名(请使用驼峰形式): ',
                default: 'defaultView' // Default to current folder name
            },
            {
                type: 'input',
                name: 'pathName',
                message: '请指定 path 名(请使用驼峰形式): ',
                default: 'defaultPath' // Default to current folder name
            }
        ]

        return this.prompt(questions).then(function (answers) {
            var pluginName = answers.pluginName

            var componentName = _.startCase(pluginName).replace('\ ', '')

            this.componentName = componentName
            this.dirName = _.snakeCase(componentName)

            this.viewName = _.startCase(answers.viewName).replace('\ ', '')
            this.viewVuexName = _.camelCase(this.viewName)

            this.pathName = answers.pathName
            var target = path.normalize('src')
            this.viewTarget = target + '/views'
            this.vuexTarget = target + '/vuex/modules'
            this.routerTarget = target + '/config/routers.js'

        }.bind(this))
    },

    configuring: function () {

    },

    'default': function () {

    },

    writing: {
        
        generate: function () {
            this.fs.copyTpl(
                this.templatePath('views/Index/Index.vue'),
                this.destinationPath(this.viewTarget + '/' + this.viewName + '/' + this.viewName + '.vue'),
                {
                    componentName: this.componentName,
                    vuexName: this.viewVuexName
                }
            )

            this.fs.copyTpl(
                this.templatePath('views/Index/types.js'),
                this.destinationPath(this.viewTarget + '/' + this.viewName + '/types.js'),
                {
                    componentName: this.componentName,
                    vuexName: this.viewVuexName
                }
            )

            this.fs.copyTpl(
                this.templatePath('vuex/modules/index.js'),
                this.destinationPath(this.vuexTarget + '/' + this.viewVuexName + '.js'),
                {
                    componentName: this.componentName,
                    vuexName: this.viewVuexName
                }
            )
        },

        updateRouter: function () {
            var routers = []
            fs.readdirSync(this.destinationPath(this.viewTarget)).forEach(function (file) {
                if (fs.statSync(path.normalize(this.destinationPath(this.viewTarget) + '/' + file)).isDirectory()){
                    var camelName = _.camelCase(file),
                    router = '{ path: "/' + camelName + '",'
                            + 'name: "' + camelName + '",'
                        + 'component: function (resolve) {require(["../views/' + file +'/'+ file +'.vue"], resolve)}}'

                    routers.push(router)
                }
            }.bind(this))

            inject(this.destinationPath(this.routerTarget), {
                code: routers.join(',\n')
            })

        }
    },

    conflicts: function () {

    },

    install: function () {

    },

    end: function () {

    }
})
