var DEFAULT_BASE_URI = '/medic-reporter/_design/medic-reporter/_rewrite/';

(function() {

  'use strict';

  angular.module('inboxControllers').controller('MedicReporterModalCtrl',
    function(
      $http,
      $q,
      $scope,
      $uibModalInstance,
      Language,
      MergeUriParameters,
      Settings,
      UserContact
    ) {
      'ngInject';

      $scope.setProcessing();

      var displayError = function(err) {
        var errorMessage = 'error.general.description';
        if (err.status === 403) {
          errorMessage = 'error.403.description';
        } else if (err.status === 404) {
          errorMessage = 'error.404.description';
        }
        $scope.setError(err, errorMessage);
      };

      var getTestUri = function(uri) {
        // for testing we don't care about the specific parameters, just the path
        var minimalUri = uri.split('?')[0];
        return encodeURIComponent(minimalUri);
      };

      var getBaseUri = function() {
        return Settings().then(function(settings) {
          var uri = settings.muvuku_webapp_url || DEFAULT_BASE_URI;
          return $http.head('/api/auth/' + getTestUri(uri))
            .then(function() {
              return uri;
            });
        });
      };

      var getUserPhoneNumber = function() {
        return UserContact().then(function(contact) {
          return contact && contact.phone;
        });
      };

      var getFullUri = function(baseUri) {
        return $q.all([
          Language(),
          getUserPhoneNumber()
        ])
          .then(function(results) {
            return MergeUriParameters(baseUri, {
              _embed_mode: 1,
              _show_forms: $scope.model.formCode,
              _locale: results[0],
              _gateway_num: results[1]
            });
          });
      };

      getBaseUri()
        .then(getFullUri)
        .then(function(uri) {
          $scope.setFinished();
          $scope.medicReporterUrl = uri;
        })
        .catch(displayError);

      $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
      };
    }
  );
}());