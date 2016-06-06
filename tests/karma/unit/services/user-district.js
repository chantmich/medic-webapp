describe('UserDistrict service', function() {

  'use strict';

  var service,
      user,
      userCtx,
      get,
      isAdmin;

  beforeEach(function() {
    get = sinon.stub();
    isAdmin = sinon.stub();
    module('inboxApp');
    module(function ($provide) {
      $provide.factory('DB', KarmaUtils.mockDB({ get: get }));
      $provide.value('UserSettings', function(callback) {
        callback(null, user);
      });
      $provide.value('Session', {
        userCtx: function() {
          return userCtx;
        },
        isAdmin: isAdmin
      });
    });
    inject(function($injector) {
      service = $injector.get('UserDistrict');
    });
    userCtx = null;
    user = null;
  });

  afterEach(function() {
    KarmaUtils.restore(get, isAdmin);
  });

  it('returns nothing for db admin', function(done) {
    userCtx = {
      name: 'greg',
      roles: ['super_admin']
    };
    isAdmin.returns(true);

    service(function(err, actual) {
      chai.expect(err).to.equal(undefined);
      chai.expect(actual).to.equal(undefined);
      done();
    });

  });

  it('returns nothing for national admin', function(done) {

    userCtx = {
      name: 'greg',
      roles: ['national_admin']
    };
    isAdmin.returns(true);

    service(function(err, actual) {
      chai.expect(err).to.equal(undefined);
      chai.expect(actual).to.equal(undefined);
      done();
    });

  });

  it('returns district for district admin', function(done) {

    userCtx = {
      name: 'jeff',
      roles: ['district_admin']
    };
    isAdmin.returns(false);

    user = {
      name: 'jeff',
      roles: ['district_admin'],
      facility_id: 'x'
    };

    get.onFirstCall().returns(KarmaUtils.mockPromise(null, { type: 'district_hospital' }));

    service(function(err, actual) {
      chai.expect(err).to.equal(null);
      chai.expect(actual).to.equal('x');
      done();
    });

  });

  it('returns error for non admin', function(done) {

    userCtx = {
      name: 'jeff',
      roles: ['analytics']
    };
    isAdmin.returns(false);

    service(function(err) {
      chai.expect(err.message).to.equal('The administrator needs to give you additional privileges to use this site.');
      done();
    });

  });

  it('returns error for not logged in', function(done) {

    userCtx = {};
    isAdmin.returns(false);

    service(function(err) {
      chai.expect(err.message).to.equal('Not logged in');
      done();
    });

  });

});
