import DS from 'ember-data';

export default DS.Model.extend({
  total: DS.attr('string'),
  designation: DS.attr('string'),
  giftType: DS.attr('string'),
  donor: DS.belongsTo('donor'),
  campaign: DS.belongsTo('campaign')
});
