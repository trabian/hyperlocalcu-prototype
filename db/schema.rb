# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110124061224) do

  create_table "accounts", :force => true do |t|
    t.string   "name"
    t.string   "number"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "member_id"
  end

  create_table "atms", :force => true do |t|
    t.string "name"
    t.string "street1"
    t.string "city"
    t.string "region"
    t.string "postal_code"
  end

  create_table "branches", :force => true do |t|
    t.string   "name"
    t.string   "street1"
    t.string   "city"
    t.string   "region"
    t.string   "postal_code"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", :force => true do |t|
    t.float    "amount"
    t.string   "type"
    t.integer  "atm_id"
    t.datetime "posted_at"
    t.integer  "account_id"
    t.integer  "branch_id"
    t.integer  "teller_id"
    t.integer  "merchant_id"
    t.integer  "check_number"
    t.string   "rewards"
    t.string   "name"
    t.float    "opening_balance"
    t.float    "deposits"
    t.float    "withdrawals"
    t.float    "ending_balance"
    t.integer  "bill_payment_processing_days"
    t.datetime "bill_payment_submitted_date"
    t.integer  "vendor_rating",                :default => 0
    t.text     "vendor_comment"
    t.string   "check_image"
    t.text     "check_image_comment"
    t.integer  "teller_rating"
    t.text     "teller_comment"
  end

  create_table "histories", :force => true do |t|
    t.string   "message"
    t.string   "username"
    t.integer  "item"
    t.string   "table"
    t.integer  "month",      :limit => 2
    t.integer  "year",       :limit => 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "histories", ["item", "table", "month", "year"], :name => "index_histories_on_item_and_table_and_month_and_year"

  create_table "items", :force => true do |t|
    t.string   "original_name"
    t.string   "name"
    t.string   "memo"
    t.float    "amount"
    t.datetime "timestamp"
    t.integer  "account_id"
    t.integer  "merchant_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "rating"
    t.text     "comment"
  end

  create_table "members", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "merchants", :force => true do |t|
    t.string   "name"
    t.string   "street1"
    t.string   "city"
    t.string   "region"
    t.string   "postal_code"
    t.text     "address_summary"
    t.text     "full_result"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "twitter_username"
    t.string   "facebook_username"
    t.string   "avatar"
  end

  create_table "tellers", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "password_salt",                       :default => "", :null => false
    t.string   "reset_password_token"
    t.string   "remember_token"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

  create_table "vendors", :force => true do |t|
    t.string   "name"
    t.string   "event_type"
    t.text     "question"
    t.string   "avatar"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
