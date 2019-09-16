import uuid from 'uuid/v4'
import e from '../constants/events'
import NanoEvents from 'nanoevents'

export const Groups = (initGroups = []) => {
  const groupsEvents = new NanoEvents()
  const groups = initGroups.reduce((obj, item) => {
    const id = item.id || uuid()
    const members = item.members || []
    const properties = item.properties || {}
    const name = item.name
    obj[id] = { ...item, members, name, id, properties }
    return obj
  }, {})

  function findByName(groupName) {
    return Object.values(groups).find((group) => group.name === groupName)
  }
  function findById(groupId) {
    return groups[groupId]
  }
  function findByNameOrId({ name, id }) {
    if (id) {
      return findById(id)
    }
    return findByName(name)
  }

  function addGroup({ name, properties, members, id }) {
    if (Object.values(groups).includes(name)) {
      throw new Error(`Group with name ${name} already exists`)
    }
    if (members) {
      groupsEvents.emit(e.ADD_GROUP_MEMBERS, { groupName: name, memberIds: members })
    }
    const groupId = id || uuid()
    const newGroup = {
      name,
      properties: properties || {},
      members: members || [],
      id: groupId
    }
    groups[groupId] = newGroup
    return newGroup
  }
  function addMembers(memberIds, groupName) {
    const group = findByName(groupName) || addGroup({ name: groupName })
    memberIds.forEach(id => groups[group.id].members.push(id))
    groupsEvents.emit(e.ADD_GROUP_MEMBERS, { groupName, memberIds })
  }
  function removeGroup({ id, name } = {}) {
    const groupToDelete = findByNameOrId({ id, name })
    delete groups[groupToDelete.id]
  }

  function getGroupMembers({ id, name } = {}) {
    const group = findByNameOrId({ id, name }) || {}
    return group.members
  }
  function getGroupProperties({ id, name } = {}) {
    const group = findByNameOrId({ id, name }) || {}
    return group.properties
  }

  function setGroupProperties({ id, name, properties } = {}) {
    const group = findByNameOrId({ id, name }) || {}
    groups[group.id].properties = { ...properties }
  }

  return {
    addGroup,
    addMembers,
    findByName,
    findById,
    get list() {
      return Object.values(groups)
    },
    remove: removeGroup,
    getGroupMembers,
    setGroupProperties,
    getGroupProperties,
    // events
    on() {
      return groupsEvents.on.apply(groupsEvents, arguments)
    }
  }
}

/**
 * группы данной ноды - задаем в свойствах ноды.
 * ноды данной группы - задаем в свойствах группы.
 */
