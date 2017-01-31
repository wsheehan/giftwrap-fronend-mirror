import Ember from 'ember';
import ProgressBar from 'npm:progressbar.js';

export default Ember.Component.extend({
  didRender() {
    if (this.get('width')) {
        Ember.$(".progress-bar-target").css("width", this.get('width'));
    }

    const shape = this.get('shape');
    if (shape === "line") {
      var bar = new ProgressBar.Line(".progress-bar-target", {
        color: this.get('color'),
        duration: this.get('duration'),
        easing: this.get('easing'),
        strokeWidth: 4,
        trailColor: "#eee",
        trailWidth: 1
      })
    } else if (shape === "semicircle") {
      var bar = new ProgressBar.SemiCircle(".progress-bar-target", {
        color: this.get('color'),
        duration: this.get('duration'),
        easing: this.get('easing'),
        strokeWidth: 4,
        text: {
          value: this.get("percent") + "%"
        }
      });
    }
    bar.animate("." + this.get('percent')*100);
  }
});
