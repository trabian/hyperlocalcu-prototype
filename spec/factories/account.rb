Factory.define :account do |f|

  f.number { (1..10).collect { Kernel.rand(9).to_s }.join }

  f.association :member

end

Factory.define :subaccount do |f|

  f.association :account

end
