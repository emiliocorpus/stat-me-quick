require 'open-uri'

i = 1
while i <35
	if i != 29 || i != 30
		initial_load_url = "http://www.foxsports.com/nfl/players?teamId=#{i}&season=2016&position=0&page=1"
		paginator = Nokogiri::HTML(open(initial_load_url)).css("div.wisbb_paginator")
		paginator_links = paginator.css('a').count
		current_page = 1
		while current_page < paginator_links + 1

			url = "http://www.foxsports.com/nfl/players?teamId=#{i}&season=2016&position=0&page=#{current_page}"
	  		page = Nokogiri::HTML(open(url))
	  		tbody = page.css("tbody")
	  		players = tbody.css("tr")

	  		players.each do |player|
	  			info = player.css("td")
	  			link = info[0].elements[0].elements[0].attributes["href"]
	  			name = info[0].children.children.children.children[0].text.split(", ")
	  			last_name = name[0]
	  			first_name = name[1]
	  			full_name = first_name + " " + last_name
	  			team = info.children.children[3].text
	  			exp = info[4].text
	  			pos = info[3].text
	  			
	  			school = info.last.children.children.text
	  			Player.create(full_name: full_name, first_name: first_name, last_name: last_name, pos: pos, exp: exp.to_i, school: school, link: link, team: team)

	  			puts "*"*50
	  			puts "This is #{full_name} who playes #{pos} for #{team}. His link is http://www.foxsports.com#{link}"

	  			puts "="*50
			end
			current_page +=1
		end
	end
	i+=1
end
