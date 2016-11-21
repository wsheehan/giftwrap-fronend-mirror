import ActiveModelAdapter from 'active-model-adapter';
import ENV from 'giftwrap/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default ActiveModelAdapter.extend(DataAdapterMixin, {
	namespace: ENV.API_NAMESPACE,
	authorizer: 'authorizer:token'
});