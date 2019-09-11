import { Groups } from '../groups'

describe('groups', () => {
  it('should create an empty group', () => {
    const nodesGroups = Groups()
    expect(nodesGroups.list).toEqual([])
  })
  it('should create a pre-defined group', () => {
    const nodesGroups = Groups([{ name: 'group1' }, { name: 'group2', members: [1, 2] }])
    expect(nodesGroups.list.length).toEqual(2)
    expect(nodesGroups.list[0].name).toEqual('group1')
    expect(nodesGroups.list[0].members).toEqual([])
    expect(nodesGroups.list[1].name).toEqual('group2')
    expect(nodesGroups.list[1].members).toEqual([1, 2])
  })

  it('should list groups', () => {
    const nodesGroups = Groups([{ name: 'group1', id: 1 }, { name: 'group2', id: 2 }])
    expect(nodesGroups.list).toEqual([
      { name: 'group1', id: 1, members: [], properties: {} },
      { name: 'group2', id: 2, members: [], properties: {} }
    ])
  })

  it('should add new group', () => {
    const nodesGroups = Groups()
    nodesGroups.addGroup('mySuperGroup')
    expect(nodesGroups.list.length).toEqual(1)
    expect(nodesGroups.findByName('mySuperGroup').name).toEqual('mySuperGroup')
  })
  it('should find a group by name', () => {
    const groupsList = [
      { name: 'group1', id: 1, members: [], properties: {} },
      { name: 'group2', id: 2, members: [], properties: {} },
      { name: 'group3', id: 3, members: [], properties: {} }
    ]
    const nodesGroups = Groups(groupsList)
    expect(nodesGroups.findByName('group2')).toEqual(groupsList[1])
  })
  it('should add a group member to an existing group', () => {
    const nodesGroups = Groups([{ name: 'group1' }])
    const someObj = { id: 1, name: 'theObjectToGroup' }
    nodesGroups.addGroupMember(someObj, 'group1')
    const theGroup = nodesGroups.findByName('group1')
    expect(theGroup.members[0]).toBe(someObj)
  })

  it('should add a group member to a non-existing group', () => {
    const nodesGroups = Groups()
    const someObj = { id: 1, name: 'theObjectToGroup' }
    nodesGroups.addGroupMember(someObj, 'group1')
    expect(nodesGroups.list.length).toEqual(1)
    const theGroup = nodesGroups.findByName('group1')
    expect(theGroup.members[0]).toBe(someObj)
  })

  it('should remove a group by name', () => {
    const nodesGroups = Groups([{ name: 'group1', id: 1 }, { name: 'group2', id: 2 }])
    nodesGroups.remove({ name: 'group1' })
    expect(nodesGroups.list).toEqual([{ name: 'group2', id: 2, members: [], properties: {} }])
  })
  it('should remove a group by id', () => {
    const nodesGroups = Groups([{ name: 'group1', id: 1 }, { name: 'group2', id: 2 }])
    nodesGroups.remove({ id: 1 })
    expect(nodesGroups.list).toEqual([{ name: 'group2', id: 2, members: [], properties: {} }])
  })

  it('should get group members by group id', () => {
    const nodesGroups = Groups([{ name: 'group1', id: 1, members: [1, 2, 3] }, { name: 'group2', id: 2 }])
    expect(nodesGroups.getGroupMembers({ id: 1 })).toEqual([1, 2, 3])
  })
  it('should get group members by group name', () => {
    const nodesGroups = Groups([
      { name: 'group1', id: 1, members: [1, 2, 3], properties: {} },
      { name: 'group2', id: 2, members: [4, 5, 6], properties: {} }
    ])
    expect(nodesGroups.getGroupMembers({ name: 'group2' })).toEqual([4, 5, 6])
  })
})
