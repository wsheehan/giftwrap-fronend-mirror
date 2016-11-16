import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	user: belongsTo('user'),
	donorList: belongsTo('donorList'),
	client: belongsTo('client'),
	text: belongsTo('campaigns/text')
});
