'use strict';
module.exports = function() {
  this.initConfig({
    jshint: {
      options: {
        node: true
      },
      grunt: {
        src: ['Gruntfile.js']
      },
      lib: {
        src: ['lib/**/*.js']
      }
    },
    watch: {
      options: {
        interrupt: true
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:grunt']
      },
      lib: {
        files: ['lib/**/*.js'],
        tasks: ['jshint:lib']
      }
    }
  });
  this.loadNpmTasks('grunt-contrib-jshint');
  this.loadNpmTasks('grunt-apm');
  this.loadNpmTasks('grunt-contrib-watch');
  this.registerTask('lint', ['jshint']);
  this.registerTask('link', ['apm-link']);
  this.registerTask('unlink', ['apm-unlink']);
  this.registerTask('test', ['apm-test']);
  this.registerTask('dev', ['apm-link', 'watch']);
  return this.registerTask('default', ['lint', 'test']);
};
