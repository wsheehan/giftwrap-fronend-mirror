import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr(),
	description: DS.attr(),
	user: DS.belongsTo('user'),
	donorList: DS.belongsTo('donorList'),
	client: DS.belongsTo('client'),
	text: DS.belongsTo('campaigns/text'),
	topGifts: DS.hasMany('campaigns/top-gifts'),
	gifts: DS.hasMany('gift'),
	totalRaised: DS.attr(),
	campaignsSent: DS.attr(),
	campaignsConverted: DS.attr(),
	campaignConversionRate: DS.attr(),
	newSubscriptions: DS.attr()
});
