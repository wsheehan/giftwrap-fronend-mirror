import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['page', 'size'],
	page: 1,
	size: 5,

	actions: {
		chooseDonorList(donorList) {
			this.set('chosenDonorList', donorList);
			Ember.$(".donor-list-checkbox > span").attr("class", "glyphicon glyphicon-plus");
			Ember.$(".donor-list-id-" + donorList.id + " > div > span").attr("class", "glyphicon glyphicon-ok");
		},
		nextDonorLists(offset) {
			this.incrementProperty("page", offset);
			const donorLists = this.get('store').query('donor-list',{
				page: {
					number: this.get("page"),
					size: this.get("size")
				}
			});
			this.set("donorLists", donorLists);
		},
		sizeChange(e) {
			this.set("size", e.target.value);
			const donorLists = this.get('store').query('donor-list',{
				page: {
					number: this.get("page"),
					size: this.get("size")
				}
			});
			this.set("donorLists", donorLists);
		},
		searchDonorLists(e) {
			this.get('store').query('donor-list', { "q": e }).then((donorLists) => {
				this.set('donorListSearchResults', donorLists);
			});
		}
	}
});
