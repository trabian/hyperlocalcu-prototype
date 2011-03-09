RailsAdmin.config do |config|

  config.excluded_models << Event

  config.model AtmEvent do
    label_for_navigation "ATM Transactions"
    edit do
      field :account_id
      field :posted_at
      field :atm_id
      field :amount
    end
  end

  config.model BranchEvent do
    label_for_navigation "Branch Transactions"
    edit do
      field :account_id
      field :posted_at
      field :branch_id
      field :teller_id
      field :amount
    end
  end

  config.model BillpayEvent do
    label_for_navigation "Billpay Transactions"
    edit do
      field :subaccount_id
      field :posted_at
      field :merchant_id
      field :amount
      field :bill_payment_processing_days
      field :bill_payment_submitted_date
    end
  end

  config.model CardEvent do
    label_for_navigation "Card Transactions"
    edit do
      field :subaccount_id
      field :posted_at
      field :merchant_id
      field :name
      field :amount
      field :receipt_image
      field :account_information
    end
  end

  config.model CheckEvent do
    label_for_navigation "Check Transactions"
    edit do
      field :subaccount_id
      field :posted_at
      field :merchant_id
      field :amount
      field :check_number
      field :check_image
      field :check_image_back
    end
  end

  config.model NsfEvent do
    label_for_navigation "NSF Events"
    edit do
      field :subaccount_id
      field :posted_at
      field :amount
    end
  end

  config.model RewardEvent do
    label_for_navigation "Reward Events"
    edit do
      field :subaccount_id
      field :rewards
      field :posted_at
      field :amount
    end
  end

  config.model StatementEvent do
    label_for_navigation "Statement Events"
    edit do
      field :subaccount_id
      field :name
      field :posted_at
      field :opening_balance
      field :withdrawals
      field :deposits
      field :ending_balance
    end
  end

  config.model Feedback do
    edit do
      field :rating
      field :comment
      field :teller
    end
  end

end
