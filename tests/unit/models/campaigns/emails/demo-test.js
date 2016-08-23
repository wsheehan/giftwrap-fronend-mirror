import { moduleForModel, test } from 'ember-qunit';

moduleForModel('campaigns/emails/demo', 'Unit | Model | campaigns/emails/demo', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
