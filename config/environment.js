/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'giving',
    podModulePrefix: 'giving/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    API_NAMESPACE: '/api/v1',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.API_URL = 'https://localhost:3000'
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_URL = 'https://give-staging.herokuapp.com'
  }

  ENV['ember-simple-auth'] = {
    authorizer: 'authorizer:jwt'
  };

  ENV['ember-simple-auth-token'] = {
    serverTokenEndpoint: ENV.APP.API_URL + '/users/authentication',
  };

  return ENV;
};
