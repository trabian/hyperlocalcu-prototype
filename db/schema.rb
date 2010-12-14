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

ActiveRecord::Schema.define(:version => 20101213054051) do

  create_table "accounts", :force => true do |t|
    t.string   "name"
    t.string   "number"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

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

end
