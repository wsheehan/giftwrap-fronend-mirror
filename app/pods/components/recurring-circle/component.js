import Ember from 'ember';

export default Ember.Component.extend({
	didInsertElement() {
		console.log(this.$(".recurring-circle")[0]);
		this.$(".recurring-circle").each(function() {
			$(this).css("height", $(this).css("width"));
		})
	},
	actions: {
		chooseRecurring(frequency, newDonor) {
			this.set("newDonor.giftFrequency", frequency);
			this.$(".recurring-circle").removeClass("recurring-circle-selected");
			this.$("#recurring-circle-" + frequency).addClass("recurring-circle-selected");
		}
	}
});
