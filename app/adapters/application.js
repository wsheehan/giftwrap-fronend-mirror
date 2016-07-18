import DS from 'ember-data';
import ActiveModelAdapter from 'active-model-adapter';
import ENV from 'giving/config/environment';

//export default DS.RESTAdapter.extend({
export default ActiveModelAdapter.extend({
	host: ENV.APP.API_URL
});
