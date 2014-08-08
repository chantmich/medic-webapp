describe('Facility service', function() {

  'use strict';

  var service,
      results,
      $rootScope;

  beforeEach(function (){
    module('inboxApp');
    module(function ($provide) {
      $provide.value('FacilityRaw', function() {
        return {
          query: function(callback) {
            callback({'rows': results});
          }
        };
      });
    });
    inject(function(_Contact_, _$rootScope_) {
      $rootScope = _$rootScope_;
      service = _Contact_;
    });
  });

  it('returns zero when no messages', function(done) {

    results = [];
    var expected = [];

    service().then(
      function(actual) {
        chai.expect(actual).to.deep.equal(expected);
        done();
      }
    );

    // needed to resolve the promise
    $rootScope.$digest();
  });

  it('returns all facilities with phones', function(done) {

    var valid = {"id":"a301463e-74ba-6e2a-3424d30ef508a488","key":["clinic"],"value":{"name":"Andy Bay","contact":{"name":"Gareth","phone":"557557557"},"phone":"557557557"},"doc":{"_id":"a301463e-74ba-6e2a-3424d30ef508a488","_rev":"74-30d4791ba64f13592f86023344fa9449","type":"clinic","name":"Andy Bay","contact":{"name":"Gareth","phone":"557557557"},"parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5089a7f","_rev":"6-ef6e63875cb6322e48e3f964f460bd7a","type":"health_center","name":"Dunedin","parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5087d1c","_rev":"3-42c1cfd045c5d80dd98ccc85c47f44ae","type":"district_hospital","name":"Otago","parent":{},"contact":{"name":"Ralph","phone":"555"}},"contact":{"name":"Sharon","phone":"556"}},"sent_forms":{"R":"2014-07-10T02:10:28.776Z","STCK":"2014-07-09T23:28:45.949Z","XXXXXXX":"2014-07-01T00:46:24.362Z","à¤—":"2014-07-02T02:06:32.270Z","ANCR":"2014-07-10T02:58:53.095Z"}}};

    results = [
      {"id":"920a7f6a-d01d-5cfe-7c9182fe6551322a","key":["clinic"],"value":{"name":"Maori Hill"},"doc":{"_id":"920a7f6a-d01d-5cfe-7c9182fe6551322a","_rev":"2-55151d808dacc7f12fdd1513f2eddc75","type":"clinic","name":"Maori Hill","parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5089a7f","_rev":"6-ef6e63875cb6322e48e3f964f460bd7a","type":"health_center","name":"Dunedin","parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5087d1c","_rev":"3-42c1cfd045c5d80dd98ccc85c47f44ae","type":"district_hospital","name":"Otago","parent":{},"contact":{"name":"Ralph","phone":"555"}},"contact":{"name":"Sharon","phone":"556"}}}},
      {"id":"920a7f6a-d01d-5cfe-7c9182fe65516194","key":["clinic"],"value":{"name":"Sumner"},"doc":{"_id":"920a7f6a-d01d-5cfe-7c9182fe65516194","_rev":"4-d7d7e3ab5276fbd1bc9c9ca6b10f4ee1","type":"clinic","name":"Sumner","parent":{"_id":"920a7f6a-d01d-5cfe-7c9182fe6551510e","_rev":"2-5b71b72299224c2500389db753116155","type":"health_center","name":"Christchurch","parent":{"_id":"920a7f6a-d01d-5cfe-7c9182fe65513eed","_rev":"2-cdfc49212af09235b69e896e337d8501","type":"district_hospital","name":"Canterbury","parent":{}}},"sent_forms":{"R":"2014-06-30T04:08:06.657Z"}}},
      valid
    ];

    var expected = [ valid ];

    service().then(
      function(actual) {
        chai.expect(actual).to.deep.equal(expected);
        done();
      }
    );

    // needed to resolve the promise
    $rootScope.$digest();
  });

  it('returns "everyone at" when health_center', function(done) {

    var valid = {"id":"a301463e-74ba-6e2a-3424d30ef508a488","key":["clinic"],"value":{"name":"Andy Bay","contact":{"name":"Gareth","phone":"557557557"},"phone":"557557557"},"doc":{"_id":"a301463e-74ba-6e2a-3424d30ef508a488","_rev":"74-30d4791ba64f13592f86023344fa9449","type":"clinic","name":"Andy Bay","contact":{"name":"Gareth","phone":"557557557"},"parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5089a7f","_rev":"6-ef6e63875cb6322e48e3f964f460bd7a","type":"health_center","name":"Dunedin","parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5087d1c","_rev":"3-42c1cfd045c5d80dd98ccc85c47f44ae","type":"district_hospital","name":"Otago","parent":{},"contact":{"name":"Ralph","phone":"555"}},"contact":{"name":"Sharon","phone":"556"}},"sent_forms":{"R":"2014-07-10T02:10:28.776Z","STCK":"2014-07-09T23:28:45.949Z","XXXXXXX":"2014-07-01T00:46:24.362Z","à¤—":"2014-07-02T02:06:32.270Z","ANCR":"2014-07-10T02:58:53.095Z"}}};
    var health_center = {"id":"920a7f6a-d01d-5cfe-7c9182fe65516194","key":["health_center"],"value":{"name":"Sumner"},"doc":{"_id":"920a7f6a-d01d-5cfe-7c9182fe65516194","_rev":"4-d7d7e3ab5276fbd1bc9c9ca6b10f4ee1","type":"health_center","name":"Sumner","parent":{"_id":"920a7f6a-d01d-5cfe-7c9182fe6551510e","_rev":"2-5b71b72299224c2500389db753116155","type":"health_center","name":"Christchurch","parent":{"_id":"920a7f6a-d01d-5cfe-7c9182fe65513eed","_rev":"2-cdfc49212af09235b69e896e337d8501","type":"district_hospital","name":"Canterbury","parent":{}}},"sent_forms":{"R":"2014-06-30T04:08:06.657Z"}}};
    var child = {"id":"920a7f6a-d01d-5cfe-7c9182fe6551322a","key":["clinic"],"value":{"name":"Maori Hill"},"doc":{"_id":"920a7f6a-d01d-5cfe-7c9182fe6551322a","_rev":"2-55151d808dacc7f12fdd1513f2eddc75","type":"clinic","name":"Maori Hill","parent":{"_id":"920a7f6a-d01d-5cfe-7c9182fe65516194","_rev":"6-ef6e63875cb6322e48e3f964f460bd7a","type":"health_center","name":"Dunedin","parent":{"_id":"a301463e-74ba-6e2a-3424d30ef5087d1c","_rev":"3-42c1cfd045c5d80dd98ccc85c47f44ae","type":"district_hospital","name":"Otago","parent":{},"contact":{"name":"Ralph","phone":"555"}},"contact":{"name":"Sharon","phone":"556"}}}};
    
    results = [ child, health_center, valid ];

    service().then(
      function(actual) {
        chai.expect(actual[0].id).to.equal(health_center.id);
        chai.expect(actual[0].everyoneAt).to.equal(true);
        chai.expect(actual[0].clinics).to.deep.equal([ child ]);
        chai.expect(actual[1]).to.deep.equal(valid);
        done();
      }
    );

    // needed to resolve the promise
    $rootScope.$digest();
  });


});