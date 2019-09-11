import uuid from 'uuid/v4'

export const Groups = (initGroups = []) => {
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

  function addGroup(name) {
    if (Object.values(groups).includes(name)) {
      throw new Error(`Group with name ${name} already exists`)
    }
    const id = uuid()
    const newGroup = {
      name,
      properties: {},
      members: [],
      id
    }
    groups[id] = newGroup
    return newGroup
  }
  function addGroupMember(member, groupName) {
    const group = findByName(groupName)
    if (group) {
      groups[group.id].members.push(member)
    } else {
      const newGroup = addGroup(groupName)
      groups[newGroup.id].members.push(member)
    }
  }
  function removeGroup({ id, name } = {}) {
    const groupToDelete = findByNameOrId({ id, name })
    delete groups[groupToDelete.id]
  }

  function getGroupMembers({ id, name } = {}) {
    const group = findByNameOrId({ id, name }) || {}
    return group.members
  }

  return {
    addGroup,
    addGroupMember,
    findByName,
    get list() {
      return Object.values(groups)
    },
    remove: removeGroup,
    getGroupMembers

  }
}

/**
 * группы данной ноды - задаем в свойствах ноды.
 * ноды данной группы - задаем в свойствах группы.
 */
