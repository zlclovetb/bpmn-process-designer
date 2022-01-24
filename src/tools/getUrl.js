import qs from 'qs'

export let bpmnParams = qs.parse(location.search.replace('?', ''))
export {bpmnParams as default}
