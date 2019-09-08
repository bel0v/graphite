import uuid from 'uuid/v4'

export const Groups = (initGroups = []) => {
  const groups = initGroups.reduce((obj, item) => {
    const id = item.id || uuid()
    const members = item.members || []
    const name = item.name
    obj[id] = { ...item, members, name, id }
    return obj
  }, {})

  function addGroup(name) {
    if (Object.values(groups).includes(name)) {
      throw new Error(`Group with name ${name} already exists`)
    }
    const id = uuid()
    const newGroup = {
      name,
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
  function findByName(groupName) {
    return Object.values(groups).find((group) => group.name === groupName)
  }
  function removeGroup({ id, name } = {}) {
    if (id) {
      return delete groups[id]
    }
    const groupToDelete = findByName(name)
    if (groupToDelete) {
      delete groups[groupToDelete.id]
    }
  }

  function getGroupMembers({ id, name } = {}) {
    if (id) {
      return groups[id].members
    }
    const group = findByName(name)
    if (group) {
      return groups[group.id].members
    }
    return null
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
