import Ember from 'ember';

export default Ember.Controller.extend({
	actions: {
		setTotal(total, newGift) {
			this.set("newGift.total", total);
			$(".gift-total-box").removeClass("gift-total-selected");
			$("#gift-total-" + total).addClass("gift-total-selected");
			$("#total-other").css("color", "#fff");
		},
		showText() {
			$("#total-other").val("");
			$("#total-other").css("color", "black");
			$(".gift-total-box").removeClass("gift-total-selected");
		}
	}
});
