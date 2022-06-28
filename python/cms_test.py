import datetime, json, os, unittest
import cms

today = datetime.date.today().isoformat()
print("todays date is %s" % today)
report_filename = "cms-" + today + ".json"

print("Deleting report file")
try:
    os.remove(report_filename)
except Exception as e:
    print("No report file to remove")

class TestCMS(unittest.TestCase):
    cms.store_cms_summary_report()

    def test_cms_writes_report_file(self):
        with open(report_filename, "r") as report_file:
            report = json.load(report_file)
        self.assertIn("posts", report, "report file not found")

    def test_report_file_contains_cms_data(self):
        with open(report_filename, "r") as report_file:
            report = json.load(report_file)
        self.assertEqual(100, report["posts"], "posts should be 100")
        self.assertEqual(10, report["users"], "users should be 10")

    def test_calculate_mean_users(self):
        with open(report_filename, "r") as report_file:
            report = json.load(report_file)
        self.assertEqual(10, report["mean_posts_per_user"], "average posts per user should be 10")


if __name__ == '__main__':
    unittest.main()
