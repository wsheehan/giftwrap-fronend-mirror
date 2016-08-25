import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		setTotal(total, newGift) {
			this.set("newGift.total", total);
			Ember.$(".gift-total-box").removeClass("gift-total-selected");
			Ember.$("#gift-total-" + total).addClass("gift-total-selected");
			Ember.$("#total-other").css("color", "#fff");
		},
		showText() {
			Ember.$("#total-other").val("");
			Ember.$("#total-other").css("color", "black");
			Ember.$(".gift-total-box").removeClass("gift-total-selected");
		},
		showDesignations() {
			Ember.$("#designation-wrapper").css("display", "block");
		},
		designateSelect(newGift) {
			if (Ember.$("#designate-select").val() === "Other") {
				Ember.$("#designation-other").show();
			} else {
				this.set("newGift.designation", Ember.$("#designate-select").val());
			}
		}
	}
});
