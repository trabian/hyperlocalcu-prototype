require 'spec_helper'

describe Feedback do

  before :each do
    @client = REDIS
  end

  after :each do
    client.flushdb
  end

  let(:client) { @client }

  it "should be able to store a feedback in the data store" do

    feedback = Factory.build(:feedback)

    feedback.save!

    client.get(feedback.to_key).should be_present

  end

  it "should be able to store and retrieve feedbacks for an event" do

    Factory.create(:feedback, :event_id => 1)
    Factory.create(:feedback, :event_id => 1)

    Feedback.for_event(1).should have(2).entries

  end

  it "shouldn't cause any problems if we haven't saved feedbacks to an event" do

    Feedback.for_event(1).should be_empty

  end

  it "should be able to store and retrieve feedbacks for a subject" do

    Factory.create(:feedback, :event_id => 1, :subject_type => :teller, :subject_id => 1)

    Factory.create(:feedback, :event_id => 1, :subject_type => :teller, :subject_id => 2)

    Factory.create(:feedback, :event_id => 2, :subject_type => :teller, :subject_id => 1)

    Feedback.for_event(1).should have(2).entries

    Feedback.for_subject(:teller, 1).should have(2).entries

  end

end
