import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	subject: attr('string'),
	image: attr('string'),
	body: attr('string'),
	campaign: belongsTo('campaign'),
	donorList: belongsTo('donor-list'),
	user: belongsTo('user')
});
