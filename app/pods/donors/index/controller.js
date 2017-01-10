import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page', 'size'],
	page: 1,
	size: 25,

  table: Ember.inject.service(),
	actions: {
		sizeChange(e) {
			const newDonors = this.get('table').sizeChange(e, 'donor', this.get('page'));
      this.set('model', newDonors);
      this.set('size', e.target.value);
		},
    changePage(offset) {
      const newDonors = this.get('table').changePage(offset, 'donor', this.get('page'), this.get('size'));
      this.set('model', newDonors);
      this.set('page', this.get('page') + offset);
    },
    searchDonors(e) {
      const donors = this.get('table').searchRecords(e, 'donor');
      this.set("donorSearchResults", donors);
    }
	}
});
