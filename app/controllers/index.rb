get '/' do
  if request.xhr?
    words = Word.all.shuffle[0..19]
    meanings = Word.all.map {|w| w.meaning}
    content_type :json
    [words, meanings].to_json
  else
    @words = Word.all.shuffle[0..19]
    erb :'index', locals: {words: @words}
  end
end


get '/question' do
  if request.xhr?
    p params
    word = Word.find(params[:word_id])
    content_type :json
    word.to_json
  else
    @words = Word.all.shuffle[0..19]
    erb :'index', locals: {words: @words}
  end
end