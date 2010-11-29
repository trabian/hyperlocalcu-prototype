get '/demo/snapshots' do
  Snapshot.ordered.to_json(:except => ["_id"], :methods => ["id"])
end

post '/demo/snapshots/:id/restore' do |id|
  Snapshot.find(id).restore
  'Snapshot has been restored'
end

post '/demo/snapshots' do
  snapshot = Snapshot.create(JSON.parse(request.body.read.to_s))
  "Snapshot created"
end

delete '/demo/snapshots/:id' do |id|
  Snapshot.find(id).destroy
end

