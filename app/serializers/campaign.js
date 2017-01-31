import DS from 'ember-data';
import { ActiveModelSerializer } from 'active-model-adapter';

export default ActiveModelSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    gifts: { embedded: 'always' },
    donorList: { embedded: 'always' },
    user: { embedded: 'always'},
    topGifts: { embedded: 'always' }
  }
});
