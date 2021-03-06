Factory.sequence :check_number do |n|
  1050 + n
end

Factory.define :event do |f|

end

Factory.define :card_event do |f|
  f.posted_at { Time.now }
end

Factory.define :check_event do |f|
  f.check_number { Factory.next(:check_number) }
  f.check_image "/images/sample/checks/sample_check_1.png"
  f.check_image_back "/images/sample/checks/sample_check_1_reverse.png"
end

Factory.define :atm_event do |f|
  f.atm { Atm.all.rand }
end

Factory.define :branch_event do |f|
  f.branch { Branch.all.rand }
  f.teller { Teller.all.rand }
end

Factory.define :billpay_event do |f|
  f.bill_payment_processing_days { 1 + Kernel.rand(4) }
  f.bill_payment_submitted_date { |e| e.posted_at - e.bill_payment_processing_days.days }
end

Factory.define :statement_event do |f|

end
