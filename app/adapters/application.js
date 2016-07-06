import DS from 'ember-data';
import ENV from 'giving/config/environment';

export default DS.RESTAdapter.extend({
	host: ENV.APP.API_URL
});
