require 'sinatra'
require 'open-uri'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/quiz' do
  content_type 'text/xml'
  open('http://localhost:8080/AnimalQuiz/rest/getGame').read
end
