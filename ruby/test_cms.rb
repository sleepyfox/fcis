require 'test/unit'
require 'date'
require 'json'
require_relative 'cms'

class MyTest < Test::Unit::TestCase
  # def setup
  # end

  # def teardown
  # end
  @@today = Date.today.strftime("%F")
  @@filename = "./cms-#@@today.json"

  # Delete existing report, if any
  File.delete(@@filename) if File.exist?(@@filename)

  # Run report generator
  generate_report()


  def test_cms_writes_report_file
    assert(File.exist?(@@filename), "File #@@filename not found")
  end

  def test_report_file_contains_cms_data
    data = File.read(@@filename)
    report = JSON.parse(data)
    assert_equal(report['posts'], 100, "Report should contain 100 posts")
    assert_equal(report['users'], 10, "Report should contain 10 users")
  end

  def test_calculate_mean_users
    data = File.read(@@filename)
    report = JSON.parse(data)
    assert_equal(report['mean_posts_per_user'], 10, "Report should contain 100 average posts per user")
  end
end
