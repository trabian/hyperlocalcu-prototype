namespace :seed do

  #ADDRESSES = [
    #['4020 Fee Fee Road', 'Bridgeton', 'MO', 63044],
    #['1077 Cave Springs Blvd.', 'St. Peters', 'MO', 63376],
    #['11739 Manchester Road', 'Des Peres', 'MO', 63131],
    #['13 Collinsville Ave.', 'East St. Louis', 'IL', 62201],
    #['1467 W. 5th Street', 'Eureka', 'MO', 63025],
    #['601 Greenway Chase', 'Florissant', 'MO', 63031],
    #["29 O'Fallon Square", "O'Fallon", 'MO', 63366],
    #["9200 Olive Blvd.", "Olivette", 'MO', 63132]
  #]

  ADDRESSES = [
    ['13949 Charleswood Ct', 'Fishers', 'IN', 46038]
  ]

  SUBACCOUNTS = [
    ["Checking", 200.0, 15000.0, "11", "share"],
    ["Share Savings", 5.0, 3500.0, "10", "share"],
    ["Auto Loan", -10000.0, -500.0, "20", "loan"],
    ["Home Equity Line of Credit", -40000.0, -500.0, "21", "loan"]
  ]

  #EVENT_TYPE_FREQUENCIES = [
    #[:card_event, 40],
    #[:atm_event, 2],
    #[:branch_event, 2],
    #[:check_event, 4],
    #[:billpay_event, 5]
  #]

  EVENT_TYPE_FREQUENCIES = [
    [:card_event, 1],
    [:atm_event, 1],
    [:branch_event, 1],
    [:check_event, 1],
    [:billpay_event, 1]
  ]

  EVENT_TYPES = EVENT_TYPE_FREQUENCIES.collect { |event_type, frequency|
    [event_type] * frequency
  }.flatten

  def random_number_in_range(lower, upper)
    lower + Kernel.rand * (upper - lower)
  end

  def number_with_precision(number, pre)
    mult = 10 ** pre
    (number * mult).truncate.to_f / mult
  end

  def create_member

    address = ADDRESSES.rand

    member = Factory(:member, :street1 => address[0], :city => address[1], :region => address[2], :postal_code => address[3])

    user = Factory(:user, :member => member)

    account = Factory(:account, :member => member)

    subaccount_count = 1 + Kernel.rand(SUBACCOUNTS.length)

    subaccounts = []

    subaccount_count.times do |i|
      subaccounts << create_subaccount(account, SUBACCOUNTS[i])
    end

    add_subaccount_events(subaccounts[0])

  end

  def create_subaccount(account, subaccount_info)

    balance = random_number_in_range(subaccount_info[1], subaccount_info[2]) 

    available_balance = balance

    subaccount = Factory(:subaccount,
                         :account => account,
                         :balance => number_with_precision(balance, 2),
                         :available_balance => number_with_precision(balance, 2),
                         :name => subaccount_info[0],
                         :account_type => subaccount_info[4],
                         :suffix => subaccount_info[3])

  end

  def add_subaccount_events(subaccount)

    days_to_include = 30 

    (0..days_to_include).to_a.reverse.each do |day|

      timestamp = day.days.ago

      event_count = Kernel.rand(10)

      event_count.times do

        event_type = EVENT_TYPES.rand

        amount = 0
        precision = 2

        if [:billpay_event, :card_event, :check_event].include?(event_type)
          amount = -200 * Kernel.rand
        else
          amount = -1000 + (2000 * Kernel.rand)
        end

        # Withdrawals should be in multipes of 10
        if event_type == :atm_event
          precision = -1 if amount < 0
        end

        event_options = {
          :subaccount => subaccount,
          :posted_at => timestamp
        }

        if [:card_event, :billpay_event].include?(event_type)

          merchant = MERCHANTS.rand

          event_options[:name] = merchant[0]
          event_options[:merchant_number] = merchant[1]
          amount = -1 * random_number_in_range(merchant[2].to_f, merchant[3].to_f)

        end

        amount_with_precision = number_with_precision(amount, precision)

        event_options[:amount] = amount_with_precision

        subaccount.balance = subaccount.balance + amount_with_precision
        subaccount.save

        event_options[:balance] = subaccount.balance

        event = Factory(event_type, event_options)

      end

    end

  end

  task :members => :environment do

    MERCHANTS = FasterCSV.read(Rails.root.join("db", "seed", "merchants.csv"))

    1.times { create_member }

  end

end
