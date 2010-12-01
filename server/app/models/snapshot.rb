class Snapshot

  include Mongoid::Document
  include ModelExtensions::Serialization

  field :name, :type => String
  field :timestamp, :type => DateTime

  scope :ordered, desc(:timestamp)

  def restore
    with_snapshot_collections do |collection|
      self.restore_collection(collection.name)
    end
  end

  def age
    Time.now = self.timestamp
  end

protected

  set_callback(:create, :before) do |snapshot|
    snapshot.timestamp = Time.now
  end

  set_callback(:create, :after) do |snapshot|
    with_snapshot_collections do |collection|
      snapshot.store(collection.name)
    end
  end

  set_callback(:destroy, :before) do |snapshot|

    snapshot.db.collections.each do |collection|

      db.drop_collection(snapshot_collection_name(collection.name))

    end

  end

  def with_snapshot_collections()
    db.collections.each do |collection|
      if collection.name !~ /^(system|snapshot)/
        yield(collection)
      end
    end
  end

  def store(collection_name)

    snapshot_name = snapshot_collection_name(collection_name)

    puts "storing snapshot #{snapshot_name} - #{collection_name}"

    db.eval("db.#{collection_name}.find().forEach( function(x) { db.#{snapshot_name}.save(x)});", :timeout => false)

  end

  def restore_collection(collection_name)

    db.drop_collection(collection_name)

    snapshot_name = snapshot_collection_name(collection_name)

    db.eval("db.#{snapshot_name}.find().forEach( function(x) { db.#{collection_name}.save(x)});")

  end

  def snapshot_collection_name(collection_name)
    "snapshot_#{self.id}_#{collection_name}"
  end

end
