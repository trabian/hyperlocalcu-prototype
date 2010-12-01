get '/demo/snapshots' do
  Snapshot.ordered.to_json
end

post '/demo/snapshots/:id/restore' do |id|
  Snapshot.find(id).restore
  'Snapshot has been restored'
end

post '/demo/snapshots' do
  Snapshot.create(JSON.parse(request.body.read.to_s)).to_json
end

delete '/demo/snapshots/:id' do |id|
  Snapshot.find(id).destroy
end

