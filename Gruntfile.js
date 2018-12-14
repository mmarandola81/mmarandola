module.exports = function (grunt) {


	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
         rsync: {
            options: {
                args: ["-av", ],
                ssh: true
                }, 


            projects: {
                options: {
                    src: "html/",
                    dest: '/var/www/rswadvertising.com/projects/bolier-plate/',
                    host: "ubuntu@34.203.168.129",
                    delete: true}
                 },
            },
        concat: {
            webcss: {
                src: [
                    'bower_components/bootstrap/dist/css/bootstrap.min.css',
                    'assets/css/style.css',
                ],
                dest: 'html/includes/css/style.css'
            },
            webjs: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'assets/js/main.js'
                ],

                dest: 'html/includes/js/script.js'

            },
        },
        sass: {
            options: {
             sourcemap: 'auto'
            },
            dist: {
                files: {
                    'assets/css/style.css': 'assets/css/scss/style.scss',
                }
            }
        },
        cssmin: {
            css: {
                src: 'html/includes/css/style.css',
                dest: 'html/includes/css/style.css'
            }
        },
        uglify: {
        	options: {
		      mangle: false,
		      compress: false
              
		    },
            js: {
                files: {
                    'html/includes/js/script.js': ['html/includes/js/script.js']
                }
            }
        },
        watch: {
			appjs: {
				files: [
					'assets/js/script.js'
					],
				tasks: ['build-js']
			},

			scss: {
				files: ['assets/css/scss/*.scss', 'app/components/bootstrap/less/*.less'],
				tasks: ['build-css']
			}
		},

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks("grunt-rsync");

     grunt.registerTask('build-js', ['concat:webjs', 'uglify:js']);

    grunt.registerTask('build-css',  ['sass', 'concat:webcss', 'cssmin']);

    grunt.registerTask('default', ['build-js', 'build-css']);

    grunt.registerTask('push', ['default','rsync:projects']);




};


