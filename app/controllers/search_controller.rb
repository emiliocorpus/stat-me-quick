require 'open-uri'
class SearchController < ApplicationController
  def find
  	search = params["searchValue"]
  	@result = Player.where('full_name ~* :pat', :pat => search)
  	if request.xhr?
        render :json => {:result => @result }
  	else
  		redirect_to root_path
 	end
  end

  def view
  	if request.xhr?
        render :json => {:data => parse_result("http://www.foxsports.com#{params["link"]}") }
  	else
  		redirect_to root_path
 	end
  end

  private
 
  def parse_position(pos)
  	case pos

	  	when 'WR'
	  		pos_id = 1
	  	when 'C'
	  		pos_id = 2
	  	when 'TE'
	  		pos_id = 3
	  	when 'QB'
	  		pos_id = 4
	  	when 'RB'
	  		pos_id = 5
	  	when 'FB'
	  		pos_id = 6
	  	when 'NT'
	  		pos_id = 7
	  	when 'K'
	  		pos_id = 8
	  	when 'P'
	  		pos_id = 9
	  	when 'CB'
	  		pos_id = 10
	  	when 'LB'
	  		pos_id = 11
	  	when 'DE'
	  		pos_id = 12
	  	when 'DT'
	  		pos_id = 13
	  	when 'DB'
	  		pos_id = 14
	  	when 'S'
	  		pos_id = 15
	  	when 'OL'
	  		pos_id = 16
	  	when 'DL'
	  		pos_id = 17
	  	when 'SB'
	  		pos_id = 18
	  	when 'G'
	  		pos_id = 19
	  	when 'T'
	  		pos_id = 20
	  	when 'LS'
	  		pos_id = 21
	  	else 
	  		pos_id = 0
  	end
  end


  def parse_result(initial_load_url)
  	player_page = Nokogiri::HTML(open(initial_load_url))
  	picture_src = player_page.css('img.wisfb_headshotImage').last.attributes["src"].value
  	quick_bio_nokogiri = player_page.css('table.wisfb_playerData').first.css('tbody').first.css('tr')
  	quick_bio = []
  	quick_bio_nokogiri.each do |stat|
  		quick_bio.push([stat.elements.first.text.downcase, stat.elements.last.text])
  	end
  	{"pictureSource": picture_src, "quickBio": quick_bio}
  end


end


=begin
	POSITIONS
		wide receiver = 1                 | WR
		center = 2                        | C
		tight end = 3                     | TE
		quarterback = 4                   | QB
		running back = 5                  | RB
		fullback = 6                      | FB
		nose tackle = 7                   | NT
		kicker = 8                        | NT
		punter = 9                        | P
		cornerback = 10                   | CB
		linebacker = 11                   | LB
		defense end = 12                  | DE
		defensive tackle = 13             | DT
		defensive back = 14               | DB
		safety = 15                       | S
		offensive lineman = 16            | OL    - none
		defensive lineman = 17            | DL    - none
		splitback = 18                    | SB    - none
		guard = 19                        | G
		tackle = 20                       | T
		long snapper = 21                 | LS    - none
=end

