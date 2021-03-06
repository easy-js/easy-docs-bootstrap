/*!
 * Gruntfile.js
 * 
 * Copyright (c) 2014
 */

/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var Easydocs = require('easy-docs');
var theme = require('./lib/index');


/* -----------------------------------------------------------------------------
 * grunt
 * ---------------------------------------------------------------------------*/

module.exports = function (grunt) {


/* -----------------------------------------------------------------------------
 * custom tasks
 * ---------------------------------------------------------------------------*/

grunt.registerMultiTask('easydocs', 'Build docs.', function (grunt) {
  // async... as always (this should be a default)
  var done = this.async();

  // options/defaults
  var options = this.options();
  var easydocs = new Easydocs(options);
  easydocs.generate(done);
});


grunt.initConfig({

  /* ---------------------------------------------------------------------------
   * pkg
   * -------------------------------------------------------------------------*/

  'pkg': grunt.file.readJSON('package.json'),


  /* ---------------------------------------------------------------------------
   * jshint
   * -------------------------------------------------------------------------*/

  'jshint': {
    options: {
      jshintrc: '.jshintrc',
      force: true
    },
    all: [
      'Gruntfile.js',
      'src/assets/js/**/*.js',
      'test/**/*/js'
    ]
  },


  /* ---------------------------------------------------------------------------
   * clean
   * -------------------------------------------------------------------------*/

  'clean': {
    less: ['src/assets/css'],
    css: ['dist/assets/css'],
    js: ['dist/assets/js'],
    gfx: ['dist/assets/gfx'],
    fonts: ['dist/assets/fonts'],
    tmpls: ['dist/tmpls'],
    docs: ['preview/multi-page', 'preview/single-page']
  },


  /* ---------------------------------------------------------------------------
   * less
   * -------------------------------------------------------------------------*/

  'less': {
    all: {
      files: [
        { expand: true, src: ['*.less'], cwd: 'src/less', dest: 'src/assets/css', ext: '.css' }
      ]
    }
  },


  /* ---------------------------------------------------------------------------
   * concat assets
   * -------------------------------------------------------------------------*/

  'concat': {
    options: {
      stripBanners: true
    },
    js: {
      src: [
        'src/assets/js/easy-docs.js'
      ],
      dest: 'dist/assets/js/easy-docs.js'
    },
    css: {
      src: [
        'src/assets/css/bootstrap.css',
        'node_modules/font-awesome/css/font-awesome.css',
        'src/assets/css/theme.css',
        'src/assets/css/easy-docs.css'
      ],
      dest: 'dist/assets/css/styles.css'
    }
  },



  /* ---------------------------------------------------------------------------
   * minify js
   * -------------------------------------------------------------------------*/

  'uglify': {
    all: {
      src: 'dist/assets/js/easy-docs.js',
      dest: 'dist/assets/js/easy-docs.min.js'
    }
  },


  /* ---------------------------------------------------------------------------
   * minify cssmin
   * -------------------------------------------------------------------------*/

  'cssmin': {
    all: {
      src: ['dist/assets/css/styles.css'],
      dest: 'dist/assets/css/styles.min.css',
    }
  },


  /* ---------------------------------------------------------------------------
   * copy
   * -------------------------------------------------------------------------*/

  'copy': {
    gfx: {
      files: [
        { expand: true, src: ['**'], cwd: 'src/assets/gfx', dest: 'dist/assets/gfx' },
      ]
    },
    fonts: {
      files: [
        { expand: true, src: ['**'], cwd: 'node_modules/bootstrap/dist/fonts', dest: 'dist/assets/fonts' },
        { expand: true, src: ['**'], cwd: 'node_modules/font-awesome/fonts', dest: 'dist/assets/fonts' }
      ]
    },
    tmpls: {
      files: [
        { expand: true, src: ['**'], cwd: 'src/tmpls', dest: 'dist/tmpls' }
      ]
    }
  },


  /* ---------------------------------------------------------------------------
   * watch
   * -------------------------------------------------------------------------*/

  'watch': {
    options: {
      spawn: true
    },
    grunt: {
      files: ['Gruntfile.js'],
      tasks: ['build', 'docs'],
      options: { livereload: true }
    },
    tmpls: {
      files: ['src/tmpls/**/*.hbs'],
      tasks: ['build:tmpls', 'docs'],
      options: { livereload: true }
    },
    less: {
      files: ['src/less/**/*.less'],
      tasks: ['build:less', 'docs'],
      options: { livereload: true }
    },
    css: {
      files: ['src/assets/css/**/*.css'],
      tasks: ['build:css', 'docs'],
      options: { livereload: true }
    },
    js: {
      files: ['src/assets/js/**/*.js'],
      tasks: ['build:js', 'docs'],
      options: { livereload: true }
    },
    gfx: {
      files: ['src/assets/gfx/**/*'],
      tasks: ['build:gfx', 'docs'],
      options: { livereload: true }
    }
  },


  /* ---------------------------------------------------------------------------
   * copy
   * -------------------------------------------------------------------------*/

  'connect': {
    dev: {
      options: {
        base: 'preview',
        port: 8001
      }
    }
  },

  /* ---------------------------------------------------------------------------
   * easydocs
   * -------------------------------------------------------------------------*/

  'easydocs': {
    options: {
      root: './preview',
      theme: theme
    },
    singlePage: {
      options: {
        src: './src',
        dest: './single-page',
        fileName: 'index.html',
        pageName: 'Easydocs',
        sections: ['getting-started.md', 'license.md']
      }
    },
    multiPage: {
      options: {
        dest: './multi-page',
        pages: [{
          fileName: 'index.html',
          pageName: 'Easydocs',
          sections: ['getting-started.md', 'license.md']
        }, {
          fileName: 'module-class.html',
          pageName: 'Module Class',
          src: './src/module-class.js',
          sections: ['easydocs']
        }, {
          fileName: 'module-object.html',
          pageName: 'Module Object',
          src: './src/module-object.js',
          sections: ['easydocs']
        }, {
          fileName: 'module-function.html',
          pageName: 'Module Function',
          src: './src/module-function.js',
          sections: ['easydocs']
        }]
      }
    }
  }

});


// get tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

// define tasks
grunt.registerTask('default', ['build']);
grunt.registerTask('dev', ['preview', 'watch']);
grunt.registerTask('preview', ['build', 'docs', 'connect']);
grunt.registerTask('build', ['build:tmpls', 'build:gfx', 'build:fonts', 'build:less', 'build:css', 'build:js']);
grunt.registerTask('build:tmpls', ['clean:tmpls', 'copy:tmpls']);
grunt.registerTask('build:gfx', ['clean:gfx', 'copy:gfx']);
grunt.registerTask('build:fonts', ['clean:fonts', 'copy:fonts']);
grunt.registerTask('build:less', ['clean:less', 'less']);
grunt.registerTask('build:js', ['clean:js', 'jshint', 'concat:js', 'uglify']);
grunt.registerTask('build:css', ['clean:css', 'concat:css', 'cssmin']);
grunt.registerTask('docs', ['clean:docs', 'easydocs']);


};