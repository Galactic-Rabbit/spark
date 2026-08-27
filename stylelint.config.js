module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    'selector-class-pattern': null,
    'selector-max-id': 0,
    'declaration-no-important': true,
    'max-nesting-depth': 3,
    // Глобально разрешаем только эти единицы
    'unit-allowed-list': ['%', 'deg', 'px', 'rem', 'ms', 'vh', 'vw', 'fr', 's'],
    // Тонкая настройка для конкретных свойств
    'declaration-property-unit-allowed-list': {
      // Для всех свойств, начинающихся с border, разрешаем только px
      '/^border/': ['px'],
      // Для отступов и шрифтов разрешаем только rem
      // (используем регулярное выражение, чтобы охватить padding, padding-top, margin и т.д.)
      '/^padding|^margin/': ['rem'],
      'font-size': ['rem'],
      gap: ['rem'],
      'line-height': ['rem', 'number', '%'],
      // Свойства, не перечисленные здесь, не проверяются этим правилом
    },
  },
}
