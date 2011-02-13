Factory.define :user do |f|

  f.association :member

  f.email do |u|

    member = u.member

    Faker::Internet.email([member.first_name, member.last_name].join(' '))

  end 

  f.password "password"
  f.password_confirmation { |u| u.password }

end
