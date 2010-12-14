namespace :import do

  desc "Import transaction data"
  task :qif => :environment do

    file = ENV['FILE']

    account_id = ENV['ACCOUNT'].to_i

    account_id = 1 if account_id == 0

    account = Account.find(account_id)
    
    reader = Qif::Reader.new(open(file), 'mm/dd/yyyy')

    count = 0
    duplicate_count = 0

    reader.each do |transaction|

      if account.items.where(:timestamp => transaction.date, :original_name => transaction.reference, :amount => transaction.amount).count > 0

        #puts "Already had a transaction from #{transaction.reference} on #{transaction.date.strftime('%d/%m/%y')} for #{transaction.amount} so we skipped this one.  We could be wrong, but this is *probably* a duplicate."

        duplicate_count += 1

      else

        account.items.create(:timestamp => transaction.date, :original_name => transaction.reference, :name => transaction.reference, :memo => transaction.description, :amount => transaction.amount)

        count += 1

      end 

    end

    puts "Imported #{count} records (and skipped #{duplicate_count}) for account #{account.name} (#{account.number})"

  end

end

