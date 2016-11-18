import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donor-list-index', 'Integration | Component | donor list index', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{donor-list-index}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#donor-list-index}}
      template block text
    {{/donor-list-index}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
