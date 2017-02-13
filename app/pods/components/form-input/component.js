import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['form-input-group'],

  actions: {
    clickInput() {
      Ember.$("#" + this.get("inputId") + "~ label").addClass("form-label-focus");
    },
    validate(e) {
      let valid = true; let msg = "";
      let input = Ember.$("#" + this.get("inputId"));

      if (this.get("validation") === "email") {
        valid = /\S+@\S+\.\S+/.test(e);
        msg = "invalid email";
      } else if (this.get("validation") === "blank") {
        if (!e) {
          valid = false;
          msg = "field cannot be blank";
        }
      }

      if (valid) {
        input.removeClass('form-input-error');
        input.addClass('form-input-valid');
        this.sendAction("setControllerProp", e, this.get("prop"));
      } else {
        input.focus();
        input.addClass('form-input-error');
        Ember.$("#" + this.get("inputId") + "-error").text(msg);
      }
    }
  }
});
