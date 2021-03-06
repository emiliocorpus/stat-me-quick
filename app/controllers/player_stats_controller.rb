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
				if page
					headers = []
					page.css('thead').first.css('tr').each do |tr|
						row = []
						tr.css('th').each do |th|
							if th["colspan"] == nil 
								colspan = 1
							else
								colspan = th['colspan']
							end
							item = {text: th.text, colspan: th["colspan"]}
							row.push(item)
						end
						headers.push(row)
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
				end
			when "Season Stats"
				page = Nokogiri::HTML(open(params["url"] + "-game-log")).css('table.wisfb_standard').first
				if page
					headers = []
					page.css('thead').first.css('tr').each do |tr|
						row = []
						tr.css('th').each do |th|
							if th["colspan"] == nil 
								colspan = 1
							else
								colspan = th['colspan']
							end
							item = {text: th.text, colspan: th["colspan"]}
							row.push(item)
						end
						headers.push(row)
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
					foot.insert(1,'')
					foot.insert(2,'')
				end
			else 
				return
		end

		if page
			{headers: headers, body: body, foot: foot, successful:true}	
		else
			{successful:false}
		end
	end


	def parse_career_stats(source_page)

	end

	def parse_season_stats(source_page)

	end


end
