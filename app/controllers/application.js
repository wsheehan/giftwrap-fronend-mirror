import Ember from 'ember';

export default Ember.Controller.extend({
	session: Ember.inject.service('session'),
	routing: Ember.inject.service('-routing'),

	hideHeader: Ember.computed(function() {
		return (this.get('routing.currentRouteName') === 'forms.show');
	}),

	hideSidebar: Ember.computed(function() {
		const currentRoute = this.get('routing.currentRouteName');
		const routesToHide = ["forms.show", "index"];
		return routesToHide.includes(currentRoute);
	})
});
