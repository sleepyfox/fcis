require 'date'
require 'net/http'

def generate_report
  today = Date.today.strftime("%F")
  puts "today's date is: #{today}"
  filename = "./cms-#{today}.json"
  puts "file is #{filename}"

  # Get posts from CMS
  puts 'Getting CMS data'
  url = 'http://jsonplaceholder.typicode.com/posts'
  uri = URI(url)
  response = Net::HTTP.get(uri)
  posts = JSON.parse(response)

  # Analyse data
  report = { 'posts' => 0, 'users' => 0, 'mean_posts_per_user' => 0 }
  report['posts'] = posts.length()
  users = []
  posts.each { |post|
    users.push(post['userId']) if !users.include?(post['userId'])
  }
  report['users'] = users.length()
  report['mean_posts_per_user'] = (posts.length() / users.length()).round
  puts "CMS data has #{posts.length()} posts"

  # Write report
  File.open(filename, 'w') { |file| file.write(report.to_json) }
  puts 'Wrote CMS report'
end
