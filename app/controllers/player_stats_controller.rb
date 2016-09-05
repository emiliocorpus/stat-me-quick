require 'open-uri'
class PlayerStatsController < ApplicationController

	def more

		binding.pry
		info = parse_more_info(params)

		if request.xhr?
	        render :json => {:result => info }
	  	else
	  		redirect_to root_path
	 	end
	end



	private

	def parse_more_info(params)

		case params["tab"]
			when "Career Summary"
				page = Nokogiri::HTML(open(params["url"] + "-stats"))
			when "Season Stats"
				page = Nokogiri::HTML(open(params["url"] + "-game-log"))
			else 
				page = "poop"
		end

		binding.pry
	end


end
