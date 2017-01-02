import ActiveModelAdapter from 'active-model-adapter';
import ENV from 'giftwrap/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
	namespace: ENV.API_NAMESPACE,
	authorizer: 'authorizer:token',

	// Allow for query params on findRecord()
	urlForFindRecord(id, modelName, snapshot) {
	  let url = this._super(...arguments);
	  let query = Ember.get(snapshot, 'adapterOptions.query');
	  if (query) {
	    url += '?' + Ember.$.param(query); // assumes no query params are present already
	  }
	  return url;
	}
});
