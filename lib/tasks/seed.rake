namespace :seed do

  ADDRESSES = [
    ['4020 Fee Fee Road', 'Bridgeton', 'MO', 63044],
    ['1077 Cave Springs Blvd.', 'St. Peters', 'MO', 63376],
    ['11739 Manchester Road', 'Des Peres', 'MO', 63131],
    ['13 Collinsville Ave.', 'East St. Louis', 'IL', 62201],
    ['1467 W. 5th Street', 'Eureka', 'MO', 63025],
    ['601 Greenway Chase', 'Florissant', 'MO', 63031],
    ["29 O'Fallon Square", "O'Fallon", 'MO', 63366],
    ["9200 Olive Blvd.", "Olivette", 'MO', 63132]
  ]

  ACCOUNTS = [
    ["Checking", 200.0, 15000.0, "12340927"],
    ["Share Savings", 5.0, 3500.0, "98123494"],
    ["Auto Loan", -10000.0, -500.0, "49128401"],
    ["Home Equity Line of Credit", -40000.0, -500.0, "93270912"]
  ]

  EVENT_TYPE_FREQUENCIES = [
    ["card", 40],
    ["atm", 2],
    ["branch", 2],
    ["check", 4],
    ["billpay", 5]
  ]

  EVENT_TYPES = EVENT_TYPE_FREQUENCIES.collect { |event_type, frequency|
    [event_type] * frequency
  }.flatten

  def create_member

    address = ADDRESSES.rand

    member = Factory.build(:member)

    puts "First name: #{member.first_name}"

    #member = Member.create(
      #:first_name => Faker::Name.first_name,
      #:last_name => Faker::Name.last_name,
      #:street1 => address[0],
      #:city => address[1],
      #:region => address[2],
      #:postal_code => address[3]
    #)

    #user = create_user(member)

    #account_count = 1 + Kernel.rand(ACCOUNTS.length)

    #account_count.times do |i|
      #create_account(member, ACCOUNTS[i])
    #end

  end

  def create_user(member)

    password = [member.first_name.downcase, member.last_name.downcase].join('-')

    user = User.create(
      :email => Faker::Internet.email([member.first_name, member.last_name].join(' ')),
      :password => password,
      :confirm_password => password,
      :member_id => member.id
    )

  end

  def create_account(member, account_info)

    balance = account_info[1] + Kernel.rand * (account_info[2] - account_info[1])

    mult = 10 ** 2
    balance = (balance * mult).truncate.to_f / mult

    account = member.accounts.create(
      :name => account_info[0],
      :balance => balance,
      :number => account_info[3]
    )

  end

  def add_account_events(account)

    120.times do |day|

      timestamp = day.days.ago

      event_count = Kernel.rand(10)

      puts "Timestamp: #{timestamp}, Event count: #{event_count}"

      event_count.times do

        event_type = EVENT_TYPES.rand

        puts "event_type: #{event_type}"

      end

    end

  end

  task :members => :environment do

    #add_account_events(nil)

    2.times { create_member }

  end

end
