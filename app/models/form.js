import DS from 'ember-data';

export default DS.Model.extend({
  donor: DS.belongsTo('donor'),
  campaign: DS.belongsTo('campaign'),
  client: DS.belongsTo('client'),
  metricFormConversion: DS.belongsTo('metrics/forms/conversion')
});
