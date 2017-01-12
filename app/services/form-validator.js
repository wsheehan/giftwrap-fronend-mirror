import Ember from 'ember';

export default Ember.Service.extend({

  blank(input, inputID, errorID) {
    if (input === undefined || input === "") {
      Ember.$(inputID).addClass('input-error');
      Ember.$(inputID + "-error").text('cannot be blank');
      return true;
    } else {
      Ember.$(inputID).removeClass('input-error');
      Ember.$(inputID + "-error").text('');
      return false;
    }
  },

  email(input, inputID, errorID) {
    if (/\S+@\S+\.\S+/.test(input)) {
      Ember.$(inputID).removeClass('input-error');
      Ember.$(inputID + "-error").text("");
    } else {
      Ember.$(inputID).addClass('input-error');
      Ember.$(inputID + "-error").text('Please enter a valid email address');
    }
  },

  giftTotal(total, errorID) {
    if (total === undefined) {
      Ember.$(errorID).text("Please Specify a Total");
      Ember.$(errorID).css("display", "block");
    } else {
      Ember.$(errorID).css("display", "none");
    }
  },

  isNonce(nonce, errorID) {
    if (nonce) {
      Ember.$(errorID).css("display", "none");
    } else {
      let e = Ember.$(errorID);
      e.text("Invalid or Empty Payment Information");
      e.addClass("payment-submit-error");
    }
  },

  valid(arr) {
    let i;
    for (i=0; i < arr.length; i++) {
      if (arr[i]) {
        return false;
      }
    }
    return true;
  }
});
