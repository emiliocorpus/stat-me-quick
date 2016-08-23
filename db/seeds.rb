# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
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
	  			name = info[0].children.children.children.children[0].text.delete(",")
	  			last_first = name.split(" ")
	  			last_name = last_first[0]
	  			first_name = last_first[1]
	  			full_name = first_name + " " + last_name
	  			team = info.children.children[3].text
	  			exp = info[4].text
	  			pos = info[3].text
	  			school = info.last.children.children.text

	  			Player.create(full_name: full_name, first_name: first_name, last_name: last_name, pos: pos, exp: exp.to_i, school: school)

	  			puts "# * 50"
	  			puts ""
	  			puts "First Name is #{first_name}"
	  			puts "Last Name is #{last_name}"
	  			puts "Full Name is #{full_name} and plays #{pos} for #{team} and has #{exp} years of experience."
	  			puts ""
			end
			current_page +=1
		end

	end
	
	i+=1
end
