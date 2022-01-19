const {
  is
} = require('bpmnlint-utils')/** * Rule that reports manual tasks being used. */

const find = require('lodash/find')

module.exports = function() {
  function check(node, reporter) {
    if (is(node, 'bpmn:UserTask')) {
      var extensionElements = node.extensionElements

      if (extensionElements) {
        var properties = find(extensionElements.get('values'), function(e) {
          return is(e, 'flowable:CustomProperties')
        })
        if (!findValue(properties, 'findUserType')) {
          reporter.report(node.id, 'The employee node has no node personnel set!')
        }
      }
    }
  }

  function findValue(properties, name) {
    if (!properties) {
      return
    }
    return properties.$attrs[name] || properties.get(name)
  }

  return {
    check
  }
}

