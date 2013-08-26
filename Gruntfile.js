module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less:{
      development: {
        options: {
          paths: ["less"],
          report: 'min'
        },
        files: {
          "dist/Gridles.css": "less/Gridles.less"
        }
      },
      production: {
        options: {
          paths: ["less"],
          yuicompress: true,
          report: 'min'
        },
        files: {
          "dist/Gridles.css": "less/Gridles.less"
        }
      }
    },
    uglify: {
      options: {
        banner:
          '/*! <%= pkg.name %>\n' +
          '    Authors: <%= pkg.author %>\n' +
          '    Built: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '*/\n'
      },
      dist: {
        src: 'dist/Gridles.css',
        dest: 'dist/Gridles.min.js'
      }
    },
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['less:development']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['less:development', 'uglify:dist']);
  grunt.registerTask('dev', ['less:development']);
  grunt.registerTask('prod', ['less:production', 'uglify:dist']);
};