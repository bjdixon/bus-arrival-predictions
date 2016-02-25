module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: '\n'
            },
            lib: {
                src: [
                    'public/lib/jquery.min.js',
                    'public/lib/underscore-1.4.4.min.js',
                    'public/lib/bootstrap.min.js',
                    'public/lib/angular/angular.js',
                    'public/lib/angular/angular-route.min.js',
                    'public/lib/angular/angular-cookies.js'
                ],
                dest: 'public/dist/lib.js'
            },
            app: {
                src: [
                    'public/js/app.js',
                    'public/js/controllers/*.js',
                    'public/js/services/*.js'
                ],
                dest: 'public/dist/app.js'
            }
        },
        jshint: {
            files: ['public/js/*'],
            options: {
                globals: {
                    angular: true
                },
                strict: true,
                enforceall: true,
                camelcase: false
            }
        },
        protractor: {
            options: {
                configFile: 'tests/conf.js',
                noColor: false
            },
            e2e: {
                options: {
                    keepAlive: false
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'protractor']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'protractor', 'concat']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['protractor']);
    grunt.registerTask('build', ['concat']);

};

