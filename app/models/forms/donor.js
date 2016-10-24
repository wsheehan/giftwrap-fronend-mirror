import Model from 'ember-data/model';
import attr from 'ember-data/attr';
// import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
	firstName: attr('string'),
	lastName: attr('string'),
	email: attr('string'),
	phoneNumber: attr('string'),
	giftFrequency: attr('string'),
	paymentMethod: attr('string'),
	paypalEmail: attr('string'),
	maskedNumber: attr('string'),
	creditImageUrl: attr('string')
});
