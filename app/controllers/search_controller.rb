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





  end
end
