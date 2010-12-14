module ApplicationHelper

  def google_js_src
    api_key = ENV['GOOGLE_API_KEY'] || 'ABQIAAAA9DdL0Q0Kp_0ipylecg-0_BTJQa0g3IQ9GZqIMmInSLzwtGDKaBTQD-3NK1Px1jxcnzAE5HGnvPJB4g'
    "https://www.google.com/jsapi?key=#{api_key}"
  end

end
