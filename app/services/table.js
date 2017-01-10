import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  sizeChange(e, model, page) {
    let newSize = e.target.value;
    return this.get('store').query(model,{
      page: {
        number: page,
        size: newSize
      }
    });
  },

  changePage(offset, model, page, size) {
    const newPage = page + offset;
    return this.get('store').query(model, {
      page: {
        number: newPage,
        size: size
      }
    });
  },

  searchRecords(query, model) {
    return this.get('store').query(model, { "q": query });
  }
});
