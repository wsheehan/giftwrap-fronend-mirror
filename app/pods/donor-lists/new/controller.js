import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['page', 'size'],
	page: 1,
	size: 5,

	session: Ember.inject.service(),

	actions: {
		sizeChange(e) {
			this.set("size", e.target.value);
			const donors = this.get('store').query('donor',{
				page: {
					number: this.get("page"),
					size: this.get("size")
				}
			});
			this.set("donors", donors);
		},
		chooseDonor(donor) {
			let row = Ember.$(".donor-id-" + donor.id);
			row.addClass("donor-row-selected");
			row.click(false);
			Ember.$(".donor-id-" + donor.id + "> div > span").attr("class", " glyphicon glyphicon-ok");
			let selectedDonors = this.get('selectedDonors');
			if (!selectedDonors.includes(donor)) {
				selectedDonors.pushObject(donor);
			}
		},
		removeDonor(donor) {
			Ember.$(".donor-id-" + donor.id).removeClass("donor-row-selected");
			Ember.$(".donor-id-" + donor.id + "> div > span").attr("class", " glyphicon glyphicon-plus");
			this.get('selectedDonors').removeObject(donor);
		},
		searchDonors(e) {
			this.get('store').query('donor', { "q": e }).then((donors) => {
				this.set('donorSearchResults', donors);
			});	
		}
	}
});
