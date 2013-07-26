/**
*
* Copyright 2012 Adobe Systems Inc.;
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

/*global module:false*/

module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({

        clean: {
            release: ['css'],
        },

        stylus: {
            compile: {
                options: {
                    paths: ['node_modules/topcoat-utils/src/mixins', 'node_modules/topcoat-checkbox-base/src', 'node_modules/topcoat-theme/src', 'node_modules/topcoat-theme/src/includes'],
                    import: ['utils', 'checkbox', 'theme-topcoat-mobile-dark', 'global', 'fonts'],
                    compress: false
                },
                files: [{
                    src: 'src/topcoat-checkbox.styl',
                    dest: 'css/topcoat-checkbox.css'
                }]
            }
        },

        cssmin: {
            minify: {
                expand: true,
                cwd: 'release/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'release/css/',
                ext: '.min.css'
            }
        },

        copy: {
            release: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: 'node_modules/topcoat-theme/img/light-sprites2x.png',
                    dest: 'img'
                },
                {
                    expand: true,
                    flatten: true,
                    src: 'node_modules/topcoat-theme/font/**/*',
                    dest: 'font'
                }]
            }
        },

        jade: {
            compile: {
                expand: true,
                cwd: 'test/perf',
                src: ['*.jade'],
                dest: 'test/perf/',
                ext: '.test.html'
            }
        },

        simplemocha: {
            all: {
                src: ['test/*.test.js']
            }
        },

        watch: {
            files: 'src/**/*.styl',
            tasks: ['build', 'test']
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['clean', 'build', 'test', 'release']);
    grunt.registerTask('build', ['stylus', 'jade']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('release', ['cssmin','copy']);
};
