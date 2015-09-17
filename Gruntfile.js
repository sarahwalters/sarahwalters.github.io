module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'js/*.js'],
      options: {
        multistr: true,
        unused: true,
        globals: {
          jQuery: true
        }
      }
    },
    jscs: {
      files: ['<%= jshint.files %>'],
      options: {
        'preset': 'google',
        'maximumLineLength': false,
        'disallowMultipleLineStrings': false
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'jscs']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.registerTask('default', ['jshint', 'jscs']);

};
