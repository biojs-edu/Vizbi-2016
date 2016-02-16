module.exports = function(grunt) {
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'index.js', 'js/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        browserify: {
            'dist/js/App.js': ['index.js']
        },
        less:{
            'dist/css/App.css': ['less/app.less']
        },
        clean: ['dist/css', 'dist/js'],
        uglify: {
            my_target: {
                files: {
                    'dist/js/App.min.js': ['dist/js/app.js']
                }
            }
        }
    });
    
    //Tasks
    grunt.registerTask('dist', ['jshint', 'less', 'browserify', 'uglify']); //Generates dist folder
    
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    
};