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
        this.updateRouter = function () {
            var routers = [,]
            fs.readdirSync(this.destinationPath(this.viewTarget)).forEach(function (file) {
                if (fs.statSync(path.normalize(this.destinationPath(this.viewTarget) + '/' + file)).isDirectory() && file !== 'Index'){
                    var camelName = _.camelCase(file),
                        router = "{ path: '/" + camelName + "',"
                            + "name: '" + camelName + "',"
                            + "component: function (resolve) {require(['../views/" + file +"/"+ file +".vue'], resolve)}}"

                    routers.push(router)
                }
            }.bind(this))

            inject(this.destinationPath(this.routerTarget), {
                code: routers.join(',\n')
            })

        }
        
        this.updateVuex = function () {
            var modules = [], importors = []
            fs.readdirSync(this.destinationPath(this.viewTarget)).forEach(function (file) {
                if (fs.statSync(path.normalize(this.destinationPath(this.viewTarget) + '/' + file)).isDirectory()){
                    var camelName = _.camelCase(file),
                        module = camelName + ': ' + file,
                        importor = "import " + file + " from './modules/"+ camelName +"'"

                    modules.push(module)
                    importors.push(importor)
                }
            }.bind(this))

            inject(this.destinationPath(this.storeTarget), [{
                code: modules.join(',\n')
            }, {
                code: importors.join('\n'),
                type: 'import'
            }])


        }

    },

    initializing: function () {
        this.distPath = this.destinationPath()
        this.log('Ready to create a view:')
    },

    prompting: function () {
        var questions = [
            {
                type: 'input',
                name: 'viewName',
                message: 'Specify a view name: ',
                default: 'defaultView' // Default to current folder name
            }
        ]

        return this.prompt(questions).then(function (answers) {

            this.viewName = _.startCase(answers.viewName).replace('\ ', '')
            this.viewVuexName = _.camelCase(this.viewName)

            // this.pathName = answers.pathName
            var target = path.normalize('src')
            this.viewTarget = target + '/views'
            this.vuexTarget = target + '/vuex/modules'
            this.routerTarget = target + '/config/routers.js'
            this.componentTarget = target + '/components'
            this.storeTarget = target + '/vuex/store.js'

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
                    viewName: this.viewName,
                    viewVuexName: this.viewVuexName
                }
            )

            this.fs.copyTpl(
                this.templatePath('views/Index/types.js'),
                this.destinationPath(this.viewTarget + '/' + this.viewName + '/types.js'),
                {
                    viewName: this.viewName,
                    viewVuexName: this.viewVuexName
                }
            )

            this.fs.copyTpl(
                this.templatePath('vuex/modules/index.js'),
                this.destinationPath(this.vuexTarget + '/' + this.viewVuexName + '.js'),
                {
                    viewName: this.viewName,
                    viewVuexName: this.viewVuexName
                }
            )

            this.fs.copy(
                this.templatePath('components/Index/.gitkeep'),
                this.destinationPath(this.componentTarget + '/' + this.viewName + '/.gitkeep')
            )

        }

    },

    conflicts: function () {

    },

    end: function () {
        this.updateRouter()
        this.updateVuex()
    }
})
