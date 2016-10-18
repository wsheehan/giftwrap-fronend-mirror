import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	key: attr("string"),
	client_id: attr("string"),
	campaign_id: attr("string")
});
