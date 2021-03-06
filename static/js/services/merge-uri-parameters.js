var _ = require('underscore');

angular.module('inboxServices').factory('MergeUriParameters',
  function(
    $httpParamSerializer
  ) {
    'use strict';
    'ngInject';

    // converts the given uri to a Location object
    // https://developer.mozilla.org/en-US/docs/Web/API/Location
    var parse = function(uri) {
      var parser = document.createElement('a');
      parser.href = uri;
      return parser;
    };

    // splits the search in the given location into a map of params
    var getParams = function(location) {
      var result = {};
      if (location.search && location.search.length) {
        var search = location.search.substr(1);
        search.split('&').forEach(function(part) {
          var item = part.split('=');
          result[item[0]] = decodeURIComponent(item[1]);
        });
      }
      return result;
    };

    /**
     * Replace/append http parameters in the given `uri` with values in the
     * given `params` map. Returns the new uri as a string.
     */
    return function(uri, params) {
      var location = parse(uri);
      var existing = getParams(location);
      _.defaults(existing, params);
      return location.pathname + '?' + $httpParamSerializer(existing);
    };
  }
);
