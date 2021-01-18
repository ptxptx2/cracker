'use strict';

const webpackConfig = require('./webpack.config.js');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('cracker.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      src: ['dist']
    },
      copy: {
	  main: {
	      files: [
		  // copy common files not webpacked
		  {
		      expand: true,
		      cwd: 'src/common',
		      src: '**',		      
		      dest: 'dist/chrome-extension',
		      filter: 'isFile'
		  },
		  {
		      expand: true,
		      cwd: 'src/common',
		      src: '**',		      
		      dest: 'dist/firefox-extension',
		      filter: 'isFile'
		  },
		  // copy webpacked common files
		  {
		      expand: true,
		      cwd: 'dist/webpacked',
		      src: '**',		      
		      dest: 'dist/chrome-extension',
		      filter: 'isFile'
		  },
		  {
		      expand: true,
		      cwd: 'dist/webpacked',
		      src: '**',		      
		      dest: 'dist/firefox-extension',
		      filter: 'isFile'
		  },
		  // copy chrome files
		  {
		      expand: true,
		      cwd: 'src/chrome-extension',
		      src: '**',		      
		      dest: 'dist/chrome-extension',
		      filter: 'isFile'
		  },
		  // copy firefox files
		  {
		      expand: true,
		      cwd: 'src/firefox-extension',
		      src: '**',		      
		      dest: 'dist/firefox-extension',
		      filter: 'isFile'
		  },
	      ],
	  },
      },
      compress: {
	  chrome: {
	      options: {
		  archive: 'dist/chrome-extension/cracker.zip'
	      },
	      files: [
		  {
		      expand: true,
		      cwd: 'dist/chrome-extension',
		      src: ['**']
		  }
	      ]
	  },
	  firefox: {
	      options: {
		  archive: 'dist/firefox-extension/cracker.zip'
	      },
	      files: [
		  {
		      expand: true,
		      cwd: 'dist/firefox-extension',
		      src: ['**']
		  }
	      ]
	  },
      },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/ba-<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/ba-<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
    webpack: {
      myConfig: webpackConfig,
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
//  grunt.loadNpmTasks('grunt-contrib-qunit');
//  grunt.loadNpmTasks('grunt-contrib-jshint');
//  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task.
    //  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);
    grunt.registerTask('default', [ 'clean', 'webpack', 'copy', 'compress']);

};

// build the corresponding zips

