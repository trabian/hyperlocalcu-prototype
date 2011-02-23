Given /^a user is logged in as (.+)$/ do |login|
  @current_user = User.create!(
    :login => login,
    :password => 'generic',
    :password_confirmation => 'generic',
    :email => "#{login}@example.com"
  )

  # :create syntax for restful_authentication w/ aasm. Tweak as needed.
  # @current_user.activate! 

  visit "/users/sign_in" 
  fill_in("user_email", :with => @current_user.email) 
  fill_in("user_password", :with => 'generic') 
  click_button("Sign in")
end
