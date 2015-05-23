'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pathConfig: {
            src: 'src',
            build: 'build',
            venders: 'venders'
        },

        pkg: grunt.file.readJSON('package.json'),

        watch: {

            all: {
                files: [
                    'src/**/*.js',
                    'src/templates/**/*.hbs',
                    'src/styles/scss/**/*.scss'
                ],
                tasks: ['build']
            }

        },

        browserify: {

            build: {
                files: {
                    'build/scripts/application.js': 'src/app/application.js'
                }
            }

        },

        emberTemplates: {

            options: {
                templateName: function (tName) {
                    return tName.replace('src/templates/', '');
                },
                handlebarsPath: 'venders/handlebars/handlebars.js',
                templateCompilerPath: 'venders/ember/ember-template-compiler.js'
            },

            build: {
                files: {
                    'build/scripts/templates.js': 'src/templates/**/*.hbs'
                }
            }

        },

        compass: {

            options: {
                sassDir: 'src/styles/scss'
            },

            build: {
                options: {
                    cssDir: '<%= pathConfig.build %>/styles'
                }
            }

        },

        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    'dist/app.min.js': [
                        'build/scripts/templates.js',
                        'build/scripts/application.js'
                    ]
                }
            }
        },

        concat: {
            dist: {
                files: {
                    'dist/application.min.js': [
                        'venders/jquery/dist/jquery.js',
                        'venders/ember/ember.min.js',
                        'venders/wookmark-jquery/jquery.wookmark.min.js',
                        'dist/app.min.js'
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', [
        'browserify:build',
        'emberTemplates:build',
        'compass:build'
    ]);

    grunt.registerTask('dist', [
        'build',
        'uglify:dist',
        'concat:dist'
    ]);

};

