module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'selector-max-id': 0,
    'declaration-no-important': true,
    'max-nesting-depth': 3,
  },
}
