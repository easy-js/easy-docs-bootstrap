/*!
 * index.js
 * 
 * Copyright (c) 2014
 */

/* -----------------------------------------------------------------------------
 * dependencies
 * ---------------------------------------------------------------------------*/

var path = require('path');


/* -----------------------------------------------------------------------------
 * theme
 * ---------------------------------------------------------------------------*/

var distPath = function (relativePath) {
  return path.join(__dirname, '../dist', relativePath);
};

var theme = {
  assets   : distPath('assets'),
  docsTmpl : distPath('tmpls/docs.hbs'),
  pageTmpl : distPath('tmpls/page.hbs'),
  partials : {
    'classes'    : distPath('tmpls/classes.hbs'),
    'definition' : distPath('tmpls/definition.hbs'),
    'examples'   : distPath('tmpls/examples.hbs'),
    'functions'  : distPath('tmpls/functions.hbs'),
    'header'     : distPath('tmpls/header.hbs'),
    'link'       : distPath('tmpls/link.hbs'),
    'method'     : distPath('tmpls/method.hbs'),
    'methods'    : distPath('tmpls/methods.hbs'),
    'namespaces' : distPath('tmpls/namespaces.hbs'),
    'nav'        : distPath('tmpls/nav.hbs'),
    'objects'    : distPath('tmpls/objects.hbs'),
    'parameters' : distPath('tmpls/parameters.hbs'),
    'returns'    : distPath('tmpls/returns.hbs'),
    'subnav'     : distPath('tmpls/subnav.hbs'),
    'usage'      : distPath('tmpls/usage.hbs')
  },
  helpers: {
    safe: function (text) {
      return text.toLowerCase().replace(/[^\w]+/g, '-');
    },
    user: function (url) {
      var parts = url.split('/');
      return parts[parts.length - 2];
    },
    repo: function (url) {
      var parts = url.split('/');
      return parts[parts.length - 1];
    }
  }
};


/* -----------------------------------------------------------------------------
 * export
 * ---------------------------------------------------------------------------*/

module.exports = theme;