import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donor-lists/individual-row', 'Integration | Component | donor lists/individual row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{donor-lists/individual-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#donor-lists/individual-row}}
      template block text
    {{/donor-lists/individual-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
