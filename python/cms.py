import datetime, json, requests

def store_cms_summary_report():
    print("Getting CMS data")
    response = requests.get("https://jsonplaceholder.typicode.com/posts")
    if response.status_code == 200:
        try:
            posts = json.loads(response.text)
            print("CMS data has %s records" % len(posts))
        except Exception as e:
            print('No valid JSON response from CMS, error %s' % type(e).__name__)
        today = datetime.date.today().isoformat()
        report_filename = "cms-" + today + ".json"
        with open(report_filename, "w") as summary_file:
            summary = { "posts": 0, "users": 0, "mean_posts_per_user": 0 }
            users = []
            for post in posts:
                if post["userId"] not in users:
                    users.append(post["userId"])
            summary["posts"] = len(posts)
            summary["users"] = len(users)
            summary["mean_posts_per_user"] = round(summary["posts"] / summary["users"])
            summary_file.write(json.dumps(summary))
            print("Wrote CMS report", flush=True)
    else:
        print('Error getting data from CMS, response code %s' % response.status_code)


if __name__ == '__main__':
    store_cms_summary_report()
