import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('donors', function() {
  	this.route('index', { path: "/" });
    this.route('show', { path: "/:donor_id" });
  });

  this.route('campaigns', function() {
    this.route('new');
    this.route('show', { path: "/:campaign_id"});

    this.route('emails', function() {
      this.route('demos', function() {
        this.route('new');
      });
    });
  });
  this.route('login');

  this.route('forms', function() {
    this.route('show', { path: "/:client_id" });
  });
});

export default Router;
