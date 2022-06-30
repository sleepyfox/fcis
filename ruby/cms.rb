require 'date'
require 'net/http'
require 'json'

def generate_report
  url = 'http://jsonplaceholder.typicode.com/posts'
  today = Date.today.strftime("%F")
  puts "today's date is: #{today}"
  filename = "./cms-#{today}.json"
  puts "file is #{filename}"
  report = { 'posts' => 0, 'users' => 0, 'mean_posts_per_user' => 0 }

  # Get posts from CMS
  puts 'Getting CMS data'
  uri = URI(url)
  response = Net::HTTP.get_response(uri)
  posts = []
  if response.code == '200'
    begin
      posts = JSON.parse(response.body)
    rescue => e
      puts "Error parsing JSON from CMS #{e.message}"
    end
  else
    puts "Error reading CMS, #{response.code} response code"
  end

  if posts.length() > 0
    # Analyse data
    report['posts'] = posts.length()
    users = []
    posts.each { |post|
      users.push(post['userId']) if !users.include?(post['userId'])
    }
    report['users'] = users.length()
    report['mean_posts_per_user'] = (posts.length() / users.length()).round
    puts "CMS data has #{posts.length()} posts"

    # Write report
    begin
      File.open(filename, 'w') { |file| file.write(report.to_json) }
      puts 'Wrote CMS report'
    rescue
      puts "Error writing report"
    end
  end
end
