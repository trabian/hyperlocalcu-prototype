Given /^I have an account with the number "([^"]*)"$/ do |number|
  @current_user.member.accounts << Factory.build(:account, :number => number)
end

Given /^account "([^"]*)" has the following subaccounts:$/ do |number, subaccounts|

  account = Account.find_by_number(number)

  subaccounts.hashes.each do |hash|
    account.subaccounts.create(hash)
  end

end

Cucumber::Factory.add_steps(self)
