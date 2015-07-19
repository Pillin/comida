module.exports = function (grunt) {

  var appConfig = grunt.file.readJSON('package.json');

  // Load grunt tasks automatically
  // see: https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // see: https://npmjs.org/package/time-grunt
  require('time-grunt')(grunt);

  var pathsConfig = function (appName) {
    this.app = '.';
    return {
      app: this.app,
      templates: this.app + '/templates',
      css: this.app + '/static/css',
      sass: this.app + '/static/sass',
      fonts: this.app + '/static/fonts',
      images: this.app + '/static/img',
      js: this.app + '/static/js',
      manageScript: 'manage.py'
    }
  };
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({

    paths: pathsConfig(),
    pkg: appConfig,

    // see: https://github.com/gruntjs/grunt-contrib-watch
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= paths.sass %>/**/*.{scss,sass}'],
        tasks: ['compass:server']
      },
      livereload: {
        files: [
          '<%= paths.js %>/**/*.js',
          '<%= paths.sass %>/**/*.{scss,sass}',
          '<%= paths.app %>/**/*.html'
          ],
        options: {
          //spawn: false,
          livereload: true,
        },
      },
    },

    // see: https://github.com/gruntjs/grunt-contrib-compass
    compass: {
      options: {
          sassDir: '<%= paths.sass %>',
          cssDir: '<%= paths.css %>',
          fontsDir: '<%= paths.fonts %>',
          imagesDir: '<%= paths.images %>',
          relativeAssets: false,
          assetCacheBuster: false,
          raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          environment: 'production'
        }
      },
      server: {
        options: {
          // debugInfo: true
        }
      }
    },

    // see: https://npmjs.org/package/grunt-bg-shell
    bgShell: {
      _defaults: {
        bg: true
      },
      runDjango: {
        cmd: 'python <%= paths.manageScript %> runserver'
      }
    },
    open: {
      server: {
        url: 'http://localhost:8000/'
      }
    }
  });

  grunt.registerTask('serve', [
    //'connect',
    'bgShell:runDjango',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'compass:dist'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};