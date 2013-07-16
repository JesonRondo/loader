module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            js: {
                files: {
                    'js/loader.min.js': ['js/loader.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify']);
};
