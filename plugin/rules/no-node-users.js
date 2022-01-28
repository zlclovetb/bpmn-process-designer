const {
  is
} = require('bpmnlint-utils')/** * Rule that reports manual tasks being used. */

const find = require('lodash/find')

module.exports = function() {
  function check(node, reporter) {
    if (is(node, 'bpmn:UserTask')) {
      const assignee = (node.assignee || '').trim();
      const candidateUsers = (node.candidateUsers || '').trim();
      const candidateGroups = (node.candidateGroups || '').trim();

      if (assignee.length === 0 && candidateUsers.length === 0 && candidateGroups.length === 0) {
        reporter.report(node.id, 'The employee node has no node personnel set!');
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

