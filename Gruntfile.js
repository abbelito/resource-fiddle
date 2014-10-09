module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: { /*
			src: 'src/js/FiddleClient.js',
			dest: 'www/FiddleClient.bundle.js'*/
      		'www/fiddleclient.bundle.js': ['src/client/js/fiddleclient.js'],
      		'www/resourceapp.bundle.js': ['src/target/js/resourceapp.js']
		},
		php: {
			dist: {
				options: {
					port: 8080,
					base: 'www',
					open: false,
					keepalive: true
				}
			}
		},
		copy: {
			client: {
				files: [
					{
						expand: true, 
						cwd: 'src/client/php/',
						src: ['**'], 
						dest: 'www/php'
					},
					{
						expand: true,
						cwd: 'src/client/',
						src: ['*'],
						dest: 'www',
						filter: 'isFile'
					}
				]
			},
			target: {
				files: [
					{
						expand: true,
						cwd: 'src/target/php/',
						src: ['**'],
						dest: 'www/php'
					},
					{
						expand: true,
						cwd: 'src/target/',
						src: ['*'],
						dest: 'www',
						filter: 'isFile'
					}
				]
			}
		},
		concat_css: {
			options: {
			// Task-specific options go here.
			},
		    files: {
		      "www/client.bundle.css": ["src/client/css/**/*.css"]
		    }
		},
		cssmin: {
			client: {
				files: {
					'www/client.min.css': ['www/client.bundle.css']
				}
			},
			target: {
				files: {
					'www/target.min.css': ['www/target.bundle.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-php');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	//grunt.registerTask('precommit', ['phplint:all', 'phpunit:unit']);
	grunt.registerTask('default', ['copy:target', 'copy:client', 'browserify', 'concat_css', 'cssmin:client', 'cssmin:target']);
	//grunt.registerTask('browserify', ['browserify']);
	grunt.registerTask('server', ['php']);


};