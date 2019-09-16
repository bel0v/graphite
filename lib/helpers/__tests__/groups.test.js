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

  it('should add new group with name and default values', () => {
    const nodesGroups = Groups()
    nodesGroups.addGroup({ name: 'mySuperGroup' })
    expect(nodesGroups.list.length).toEqual(1)
    const createdGroup = nodesGroups.findByName('mySuperGroup')
    expect(createdGroup.members).toEqual([])
    expect(createdGroup.properties).toEqual({})
    expect(createdGroup.name).toEqual('mySuperGroup')
  })
  it('should add new group with name and non-default values', () => {
    const nodesGroups = Groups()
    nodesGroups.addGroup({
      name: 'mySuperGroup',
      members: [1, 2],
      properties: { color: 'green' }
    })
    expect(nodesGroups.list.length).toEqual(1)
    const createdGroup = nodesGroups.findByName('mySuperGroup')
    expect(createdGroup.members).toEqual([1, 2])
    expect(createdGroup.properties).toEqual({ color: 'green' })
    expect(createdGroup.name).toEqual('mySuperGroup')
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
  it('should find a group by id', () => {
    const groupsList = [
      { name: 'group1', id: 1, members: [], properties: {} },
      { name: 'group2', id: 2, members: [], properties: {} },
      { name: 'group3', id: 3, members: [], properties: {} }
    ]
    const nodesGroups = Groups(groupsList)
    expect(nodesGroups.findById(3)).toEqual(groupsList[2])
  })

  it('should add a group member to an existing group', () => {
    const nodesGroups = Groups([{ name: 'group1' }])
    const someObj = { id: 1, name: 'theObjectToGroup' }
    nodesGroups.addMembers([someObj], 'group1')
    const theGroup = nodesGroups.findByName('group1')
    expect(theGroup.members[0]).toBe(someObj)
  })

  it('should add several group members to an existing group', () => {
    const nodesGroups = Groups([{ name: 'group1' }])
    const someObj1 = { id: 1, name: 'theObjectToGroup' }
    const someObj2 = { id: 2, name: 'theObjectToGroup2' }
    const someObj3 = { id: 3, name: 'theObjectToGroup3' }
    nodesGroups.addMembers([someObj1, someObj2], 'group1')
    const theGroup = nodesGroups.findByName('group1')
    expect(theGroup.members.length).toBe(2)
    expect(theGroup.members[0]).toBe(someObj1)
    expect(theGroup.members[1]).toBe(someObj2)
    nodesGroups.addMembers([someObj3], 'group1')
    expect(theGroup.members.length).toBe(3)
    expect(theGroup.members[2]).toBe(someObj3)
  })

  it('should add a group member to a non-existing group', () => {
    const nodesGroups = Groups()
    const someObj = { id: 1, name: 'theObjectToGroup' }
    nodesGroups.addMembers([someObj], 'group1')
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

  it('should set group properties', () => {
    const nodesGroups = Groups([
      { name: 'group1', id: 1, members: [1, 2, 3], properties: {} },
      { name: 'group2', id: 2, members: [4, 5, 6], properties: {} }
    ])
    const properties = {
      a: 'a',
      b: 'b'
    }
    nodesGroups.setGroupProperties({
      id: 2,
      properties
    })
    expect(nodesGroups.findById(2).properties).toEqual(properties)
  })
  it('should get group properties', () => {
    const nodesGroups = Groups([
      { name: 'group1', id: 1, members: [1, 2, 3], properties: { a: 'b' } },
      { name: 'group2', id: 2, members: [4, 5, 6], properties: {} }
    ])
    expect(nodesGroups.getGroupProperties({ name: 'group1' })).toEqual({ a: 'b' })
  })
})
