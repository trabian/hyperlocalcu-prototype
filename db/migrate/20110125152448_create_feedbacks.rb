class CreateFeedbacks < ActiveRecord::Migration
  def self.up
    create_table :feedbacks do |t|
      t.integer :event_id
      t.text :comment
      t.integer :rating
      t.integer :subject_id
      t.string :subject_type
      t.timestamps
    end
  end

  def self.down
    drop_table :feedbacks
  end
end
