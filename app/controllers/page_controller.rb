require 'open-uri'

class PageController < ApplicationController
  def index



  	# http://www.foxsports.com/nfl/players
  	i = 1
  	# while i < 34

  		url = "http://www.foxsports.com/nfl/players?teamId=#{i}&season=2016&position=0&name="


  		page = Nokogiri::HTML(open(url))
  		tbody = page.css("tbody")
  		players = tbody.css("tr")
  		binding.pry








  		i+=1
  	# end



  end
end
