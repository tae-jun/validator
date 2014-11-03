/// <vs />
/*global module:false*/
module.exports = function (grunt) {

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-execute');

    // Default task.
    grunt.registerTask('default', ['execute']);


    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        execute: {
            server: {
                src: 'src/app.js'
            }
        }
    });
};
