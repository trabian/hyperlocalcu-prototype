Given /^I have an account with the number "([^"]*)"$/ do |number|
  @current_user.member.accounts << Factory.build(:account, :number => number)
end

Given /^account "([^"]*)" has the following subaccounts:$/ do |number, subaccounts|

  account = Account.find_by_number(number)

  subaccounts.hashes.each do |hash|
    account.subaccounts.create(hash)
  end

end

Given /^subaccount (\d+) has the following events:$/ do |subaccount_id, events|

  subaccount = Subaccount.find(subaccount_id)

  events.hashes.each do |hash|

    type = hash.delete('type').to_sym

    event = Factory.build(type, hash)

    subaccount.events << event

  end

end

Given /^subaccount (\d+) has the following statements:$/ do |subaccount_id, statements|

  subaccount = Subaccount.find(subaccount_id)

  statements.hashes.each do |hash|
    subaccount.statements << Factory.build(:statement, hash)
  end

end

Cucumber::Factory.add_steps(self)
