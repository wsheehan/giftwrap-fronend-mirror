import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    donor: { embedded: 'always' },
    client: { embedded: 'always' },
    metricFormConversion: { embedded: 'always' }
  }
});
