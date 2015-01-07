/*global module:false*/
module.exports = function (grunt) {

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ts');

    // Default task.
    grunt.registerTask('default', ['ts', 'clean', 'concat', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        distFolder: 'dist',
        tplFolder: 'dist/tpl',
        src: {
            index: ['src/index.html'],
            tpl: ['src/**/*.tpl.html'],
            css: ['src/**/*.css'],
            ts: ['src/**/*.ts'],
            tsout: ['tsout/*.js'],
            tsoutmap: ['tsout/*.js.map'],
            gruntFile: ['Gruntfile.js']
        },
        // Task configuration.
        clean: ['<%= distFolder %>/**/*'],
        concat: {
            css: {
                src: ['<%= src.css %>', 'vendor/**/*.css'],
                dest: '<%= distFolder %>/<%= pkg.name %>.css'
            },
            // because of process option, must concat. Do not just copy
            index: {
                src: ['<%= src.index %>'],
                dest: '<%= distFolder %>/index.html',
                options: {
                    process: true
                }
            }
        },
        copy: {
            tpl: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.tpl %>'],
                        dest: '<%= tplFolder %>',
                        filter: 'isFile'
                    }
                ]
            },
            tsout: {
                src: '<%= src.tsout %>',
                dest: '<%= distFolder %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            sources: {
                files: ['<%= src.index %>', '<%= src.tpl %>', '<%= src.css %>', '<%= src.tsout %>'],
                tasks: ['clean', 'concat', 'copy'],
                options: {
                    livereload: true
                }
            },
            // Reload grunt config when Gruntfile.js is changed
            gruntFile: {
                files: ['<%= src.gruntFile %>'],
                options: {
                    reload: true
                }
            }
        },
        ts: {
            // A specific target
            build: {
                // The source TypeScript files, http://gruntjs.com/configuring-tasks#files
                src: ['<%= src.ts %>'],
                // The source html files, https://github.com/grunt-ts/grunt-ts#html-2-typescript-support
                //html: ["test/work/**/*.tpl.html"],
                // If specified, generate this file that to can use for reference management
                //reference: "./test/reference.ts",
                // If specified, generate an out.js file which is the merged js file
                out: 'tsout/tsout.js',
                // If specified, the generate JavaScript files are placed here. Only works if out is not specified
                //outDir: 'test/outputdirectory',
                // If specified, watches this directory for changes, and re-runs the current target
                //watch: 'test',
                // Use to override the default options, http://gruntjs.com/configuring-tasks#options
                options: {
                    // 'es3' (default) | 'es5'
                    target: 'es5',
                    // 'amd' (default) | 'commonjs'
                    //module: 'commonjs',
                    // true (default) | false
                    sourceMap: false,
                    // true | false (default)
                    declaration: false,
                    // true (default) | false
                    removeComments: true
                },
            }
        }
    });
};
