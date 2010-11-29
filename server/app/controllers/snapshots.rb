get '/demo/snapshots' do
  render_backbone_json Snapshot.ordered
end

post '/demo/snapshots/:id/restore' do |id|
  Snapshot.find(id).restore
  'Snapshot has been restored'
end

post '/demo/snapshots' do
  render_backbone_json Snapshot.create(JSON.parse(request.body.read.to_s))
end

delete '/demo/snapshots/:id' do |id|
  Snapshot.find(id).destroy
end

