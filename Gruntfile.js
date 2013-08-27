module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          paths: ['less'],
          report: 'min'
        },
        files: {
          'dist/Gridles.css': 'build/Gridles.less'
        }
      },
      production: {
        options: {
          paths: ['less'],
          report: 'min',
          compress: true,
          yuicompress: true
        },
        files: {
          'build/Gridles.min.css': 'build/Gridles.less'
        }
      }
    },
    asciify: { 
      banner: {
        text: 'Gridles',
        options: {
          font: 'alligator2',
          log: true
        }
      }
    },
    concat: {
      options: {
        banner:
          '/*!\n' + 
          '<%= asciify_banner %>' +
          '\n' +
          '  <%= pkg.name %>\n' +
          '  Authors: <%= pkg.author %>\n' +
          '  Built: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '*/\n'
      },
      less: {
        src: ['less/Gridles.less'],
        dest: 'build/Gridles.less'
      },
      production: {
        src: ['build/Gridles.min.css'],
        dest: 'dist/Gridles.min.css'
      }
    },
    copy: {
      less: {
        src: 'build/Gridles.less',
        dest: 'dist/Gridles.less',
      }
    },
    clean: {
      build: ['build/']
    },
    watch: {
      less: {
        files: ['less/*.less'],
        tasks: ['development']
      }
    }
  });

  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', function() {
    grunt.task.run(['development']);
    grunt.task.run(['production']);
  });

  grunt.registerTask('prod', function() {grunt.task.run(['production'])});
  grunt.registerTask('production', ['asciify', 'concat:less', 'less:production', 'concat:production', 'clean:build']);

  grunt.registerTask('dev', function() {grunt.task.run(['development'])});
  grunt.registerTask('development',
    ['asciify', 'concat:less', 'copy:less', 'less:development', 'clean:build']);
};