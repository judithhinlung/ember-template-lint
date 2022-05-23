import generateRuleTests from '../../helpers/rule-test-harness.js';

generateRuleTests({
  name: 'role-has-required-attributes',

  config: true,

  good: [
    '<div role="complementary" />',
    '<div role="combobox" aria-expanded="false" aria-controls="ctrlId" />',
    '<div role="option" aria-selected={{false}} />',
    '<CustomComponent role="checkbox" aria-checked="false" />',
    '<SomeComponent role={{this.role}} aria-notreal="bar" />',
    '<OtherComponent @role={{@role}} aria-required={{this.required}} />',
    '<FakeElement aria-disabled="true" />',
    '{{some-component role="heading" aria-level="2"}}',
    '{{foo-component role="button"}}',
  ],

  bad: [
    {
      template: '<div role="combobox" aria-controls="someId" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 46,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "The attributes aria-controls, aria-expanded are required by the role combobox",
              "rule": "role-has-required-attributes",
              "severity": 2,
              "source": "<div role=\\"combobox\\" aria-controls=\\"someId\\" />",
            },
          ]
        `);
      },
    },
    {
      template: '<div role="option"  />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 22,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "The attribute aria-selected is required by the role option",
              "rule": "role-has-required-attributes",
              "severity": 2,
              "source": "<div role=\\"option\\"  />",
            },
          ]
        `);
      },
    },
    {
      template: '<CustomComponent role="checkbox" aria-required="true" />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 56,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "The attribute aria-checked is required by the role checkbox",
              "rule": "role-has-required-attributes",
              "severity": 2,
              "source": "<CustomComponent role=\\"checkbox\\" aria-required=\\"true\\" />",
            },
          ]
        `);
      },
    },
    {
      template:
        '<SomeComponent role="scrollbar" @aria-now={{this.valuenow}} aria-controls={{some-id}} />',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 88,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "The attributes aria-controls, aria-valuenow are required by the role scrollbar",
              "rule": "role-has-required-attributes",
              "severity": 2,
              "source": "<SomeComponent role=\\"scrollbar\\" @aria-now={{this.valuenow}} aria-controls={{some-id}} />",
            },
          ]
        `);
      },
    },
    {
      template: '{{some-component role="heading"}}',

      verifyResults(results) {
        expect(results).toMatchInlineSnapshot(`
          [
            {
              "column": 0,
              "endColumn": 33,
              "endLine": 1,
              "filePath": "layout.hbs",
              "line": 1,
              "message": "The attribute aria-level is required by the role heading",
              "rule": "role-has-required-attributes",
              "severity": 2,
              "source": "{{some-component role=\\"heading\\"}}",
            },
          ]
        `);
      },
    },
  ],
});
