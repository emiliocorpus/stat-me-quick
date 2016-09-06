require 'open-uri'
class PlayerStatsController < ApplicationController

	def more

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
				page = Nokogiri::HTML(open(params["url"] + "-stats")).css('table.wisfb_standard').first
				headers = []
				page.css('thead').first.css('th').each do |th|
					headers.push(th.text)
				end
				body = []
				page.css('tbody').first.css('tr').each do |tr|
					row = []
					tr.css('td').each do |td|
						row.push(td.text)
					end
					body.push(row)
				end
				foot = []
				page.css('tfoot').first.css('tr').first.css('td').each do |td|
					foot.push(td.text)
				end
			when "Season Stats"
				page = Nokogiri::HTML(open(params["url"] + "-game-log")).css('table.wisfb_standard').first

			else 
				return
		end

		{headers: headers, body: body, foot: foot}
	end


	def parse_career_stats(source_page)

	end

	def parse_season_stats(source_page)

	end


end
