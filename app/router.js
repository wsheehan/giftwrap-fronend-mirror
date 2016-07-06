import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('donors', function() {
  	this.route('index', { path: "/"});
    this.route('show', { path: "/:donor_id"});
  });
});

export default Router;
