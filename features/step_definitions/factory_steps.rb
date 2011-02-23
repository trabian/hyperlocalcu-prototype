Given /^I have an account with the number "([^"]*)"$/ do |number|
  @current_user.member.accounts << Factory.build(:account, :number => number)
end

Cucumber::Factory.add_steps(self)
