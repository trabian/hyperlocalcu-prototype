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

end
