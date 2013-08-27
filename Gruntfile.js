module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      options: {
        report: 'min'
      },
      development: {
        files: {
          'build/Gridles.css': 'less/Gridles.less'
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true
        },
        files: {
          'build/Gridles.min.css': 'less/Gridles.less'
        }
      }
    },
    asciify: { 
      banner: {
        text: 'Gridles',
        options: {
          font: 'alligator2',
          log: false
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
      development: {
        src: ['build/Gridles.css'],
        dest: 'dist/Gridles.css'
      },
      production: {
        src: ['build/Gridles.min.css'],
        dest: 'dist/Gridles.min.css'
      }
    },
    clean: {
      build: ['build']
    },
    watch: {
      options: {
        livereload: true
      },
      less: {
        files: ['less/*.less'],
        tasks: ['development']
      },
      tests: {
        files: ['tests/**'],
        tasks: []
      }
    }
  });

  grunt.loadNpmTasks('grunt-asciify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', function() {
    grunt.task.run(['development']);
    grunt.task.run(['production']);
    grunt.task.run(['clean:build']);
  });

  grunt.registerTask('prod', function() {grunt.task.run(['production'])});
  grunt.registerTask('production', ['asciify', 'less:production', 'concat:production']);

  grunt.registerTask('dev', function() {grunt.task.run(['development'])});
  grunt.registerTask('development',
    ['asciify', 'less:development', 'concat:development']);
};