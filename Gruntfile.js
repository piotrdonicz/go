module.exports = function(grunt) {
    'use strict';

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Configure all paths.
        path: {
            js: ['*.js', 'routes/**/*.js']
        },

        // Configure all tasks.
        jshint: {
            all: [
                '*.js',
                'routes/**/*.js'
            ],
            options: {
                jshintrc: true
            }
        },
        jscs: {
            src: [
                '*.js',
                'routes/**/*.js'
            ],
            options: {
                config: '.jscsrc'
            }
        }
    });

    // Register Grunt tasks.
    grunt.registerTask('default', ['validate']);
    grunt.registerTask('validate', ['jshint', 'jscs']);
};
