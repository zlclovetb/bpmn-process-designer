module.exports = {
  configs: {
    recommended: {
      rules: {
        'example/target-namespace': 'error',
        'example/no-manual-task': 'warn'
      }
    },
    all: {
      rules: {
        'example/target-namespace': 'warn',
        'example/no-manual-task': 'warn'
      }
    }
  }
}
