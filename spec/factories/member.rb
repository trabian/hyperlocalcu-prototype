Factory.define :member do |f|

  f.first_name { Faker::Name.first_name }
  f.last_name { Faker::Name.last_name }

end
