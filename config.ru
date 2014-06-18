use Rack::Static, urls: [''], root: 'public', index: 'index.html'

app = Proc.new do |env|
  ['200', { 'Content-Type' => 'text/html' } ]
end

run app
