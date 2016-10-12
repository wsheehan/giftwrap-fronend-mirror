import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('update-donor-after-submit', 'Integration | Component | update donor after submit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{update-donor-after-submit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#update-donor-after-submit}}
      template block text
    {{/update-donor-after-submit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
