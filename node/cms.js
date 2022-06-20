// Get CMS data from external REST API and store it in a file
const fs = require('fs')
const axios = require('axios').default
const CMS_URL = 'http://jsonplaceholder.typicode.com/posts'

// Get posts, returns an array of post objects
// Responsible for everything around the CMS DB, including:
// transport rotocol (HTTP), location (URI) and payload schema (JSON)
async function cms_get_posts(fetch) {
  try {
    var result = await fetch.get(CMS_URL)
    console.log('getting CMS data')
  } catch (err) {
    console.log('an error occurred getting the post data', err)
    return Promise.reject('error')
  }
  if (result.status === 200) {
    return Promise.resolve(result.data)
  } else {
    console.log('error occurred, status =', result.status)
    return Promise.reject('error')
  }
}

function write_report(fs, report) {
  const today = new Date()
  const today_date = today.toISOString().slice(0,10)
  const filename = 'cms-' + today_date + '.json'
  fs.writeFileSync(filename, JSON.stringify(report))
}

module.exports = {
  main: async function(context, filesystem = fs, fetch = axios) {
    const posts = await cms_get_posts(fetch)
    console.log('CMS data has: ', posts.length, 'records')

    let summary = { posts: 0, users: 0, posts_per_user: 0 }
    let users = []
    for (let i = 0; i < posts.length; i++) {
      // console.log('processing record', i, 'for user', res.data[i].userId)
      summary.posts++
      if (!users.includes(posts[i].userId)) {
        users.push(posts[i].userId)
      }
    }
    summary.users = users.length
    summary.mean_posts_per_user = Math.round(summary.posts / summary.users)

    write_report(filesystem, summary)
    console.log('wrote CMS report')

    return Promise.resolve(true)
  }
}
