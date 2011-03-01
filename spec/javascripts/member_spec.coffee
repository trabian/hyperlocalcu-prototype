require '/assets/timeline.js'

describe 'a member with accounts', ->

  beforeEach ->
    @member = new App.model.Member
      accounts: [
        {
          id: 1
          name: "Test Account"
        },
        {
          id: 2
          name: "Test Account 2"
        }
        {
          id: 3
          name: "Test Account 3"
        }
      ]

  it 'should be able to access its accounts as a list', ->
    expect(@member.accounts.length).toEqual(3)

  it 'should select the first account by default', ->
    expect(@member.accounts.current().get('id')).toEqual(1)

  it 'should allow an account to be selected', ->

    @member.accounts.selectOne(2)

    expect(@member.accounts.current().get('id')).toEqual(2)

  it 'should allow a single different account to be selected', ->

    _.each [3, 2, 3], (index) =>

      @member.accounts.selectOne @member.accounts.get(index)

      expect(@member.accounts.current().get('id')).toEqual(index)

    selectedAccounts = @member.accounts.filter (account) ->
      account.get 'selected'

    expect(selectedAccounts.length).toEqual(1)
