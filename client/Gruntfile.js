
module.exports = function (grunt) {
    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'copy']);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        src: {
            tsout: 'src/tsout.js',
            css: 'src/**/*.css',
            tpl: 'src/**/*.tpl.html',
            index: 'src/index.html'
        },
        dist: 'dist',
        // Task configuration.
        clean: ['<%= dist %>/**/*'],
        concat: {
            // because of process option, must concat. Do not just copy
            index: {
                src: ['<%= src.index %>'],
                dest: '<%= dist %>/index.html',
                options: {
                    process: true
                }
            },
            css: {
                src: ['<%= src.css %>', 'lib/**/*.css', '!**/*.min.css'],   // exclude *.min.css files
                dest: '<%= dist %>/<%= pkg.name %>.css'
            }
        },
        copy: {
            tpl: {
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**/*.tpl.html',
                        dest: '<%= dist %>',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            },
            tsout: {
                src: '<%= src.tsout %>',
                dest: '<%= dist %>/<%= pkg.name %>.js'
            },
            lib: {
                files: [
                    {
                        expand: true,
                        cwd: 'bower_components',
                        src: ['*/dist/**/*.css', '*/dist/**/*.js', '!**/*.min.*', 'angular/angular.js'],
                        dest: '<%= dist %>',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },
        watch: {
            src: {
                files: ['<%= src.tsout %>', '<%= src.css %>', '<%= src.tpl %>', '<%= src.index %>'],
                tasks: ['default']
            }
        }
    });
};
