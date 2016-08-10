import ActiveModelAdapter from 'active-model-adapter';
import ENV from 'giving/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

//export default DS.RESTAdapter.extend({
export default ActiveModelAdapter.extend(DataAdapterMixin, {
	host: ENV.APP.API_URL,
	authorizer: 'authorizer:token'
});
