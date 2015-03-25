module.exports = function(grunt) {
    grunt.initConfig({
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

    grunt.registerTask('default', ['jshint', 'protractor']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('test', ['protractor']);

};

