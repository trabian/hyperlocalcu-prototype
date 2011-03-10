class Member < ActiveRecord::Base

  has_many :accounts

  def name
    [first_name, last_name].join(' ')
  end

  def short_name
    "#{first_name} #{last_name[0, 1]}."
  end

  def as_json(options = {})

    defaults = {
      :methods => { :name => {}, :short_name => {}},
      :include => {
        :accounts => {
          :include => {
            :subaccounts => { :include => :statements }
          }
        }
      }
    }

    super defaults.deep_merge(options || {})

  end

end
