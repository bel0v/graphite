
import e from '../constants/events'

export const view = (events) => {
  let network
  let _activeNodesGroupsCache = []
  let _activeEdgesGroupsCache = []
  return {
    get network() {
      return network
    },
    set network(value) {
      network = value
    },
    set activeNodesGroups(groups) {
      _activeNodesGroupsCache = groups
      events.emit(e.SET_ACTIVE_NODES_GROUPS, groups)
    },
    get activeNodesGroups() {
      return _activeNodesGroupsCache
    },
    set activeEdgesGroups(groups) {
      _activeEdgesGroupsCache = groups
      events.emit(e.SET_ACTIVE_NODES_GROUPS, groups)
    },
    get activeEdgesGroups() {
      return _activeEdgesGroupsCache
    }
  }
}
