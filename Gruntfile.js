module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: { 
			
      		'www/js/resource-fiddle.bundle.js': ['src/client/js/fiddleclient.js'],
      		'bin/js/resource-fiddle.bundle.js': ['src/client/js/fiddleclient.js'],
      		'www/js/resourceapp.bundle.js': ['src/target/js/resourceapp.js']
		
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
						cwd: 'src/client/php/',
						src: ['.htaccess'], 
						dest: 'www/php'
					},
					{
						expand: true,
						cwd: 'src/client/test/',
						src: ['*'],
						dest: 'www',
						filter: 'isFile'
					},
					{
						expand: true, 
						cwd: 'src/client/test/',
						src: ['.htaccess'], 
						dest: 'www'
					},
					{
						expand: true,
						cwd: 'res/',
						src: ['*'],
						dest: 'www/img',
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
			},
			release: {
				files: [
					{
						expand: true,
						cwd: 'src/client/php/',
						src: ['**'],
						dest: 'bin/php'
					},
					{
						expand: true, 
						cwd: 'src/client/php/',
						src: ['.htaccess'], 
						dest: 'bin/php'
					},
					{
						expand: true, 
						cwd: 'src/client/test/',
						src: ['.htaccess'], 
						dest: 'bin'
					},
					{
						expand: true,
						cwd: 'src/client/release/',
						src: ['*'],
						dest: 'bin',
						filter: 'isFile'
					},
					{
						expand: true,
						cwd: 'res/',
						src: ['*'],
						dest: 'bin/img',
						filter: 'isFile'
					}
				]
			}
		},
		concat_css: {
			build: {
				options: {
				// Task-specific options go here.
				},
			    files: {
			      "www/css/client.bundle.css": ["src/client/css/**/*.css"]
			    }
			},
			release: {
				options: {
				// Task-specific options go here.
				},
			    files: {
			      "www/css/client.bundle.css": ["src/client/css/**/*.css"]
			    }
			}
		},
		cssmin: {
			client: {
				files: {
					'www/css/client.min.css': ['www/css/client.bundle.css']
				}
			},
			release: {
				files: {
					'bin/css/client.min.css': ['www/css/client.bundle.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-php');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concat-css');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	//grunt.registerTask('precommit', ['phplint:all', 'phpunit:unit']);
	grunt.registerTask('default', ['copy:target', 'copy:client', 'browserify', 'concat_css:build', 'cssmin:client']);
	grunt.registerTask('release', ['copy:release', 'browserify', 'concat_css:release', 'cssmin:release']);
	//grunt.registerTask('browserify', ['browserify']);
	grunt.registerTask('server', ['php']);


};