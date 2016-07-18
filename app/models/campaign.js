import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	title: attr('string'),
	body: attr('string'),
	//school_id: attr('number'),
	//user_id: attr('number'),
	//donor_list_id: attr('number')
});
