import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('donors/individual-row', 'Integration | Component | donors/individual row', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{donors/individual-row}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#donors/individual-row}}
      template block text
    {{/donors/individual-row}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
