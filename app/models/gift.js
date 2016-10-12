import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	total: attr('string'),
	designation: attr('string'),
	giftType: attr('string'),
	donor: belongsTo('donor')
});
