const fs = require('fs')
const assert = require('assert')

const sut = require('./cms').main
const expected = ""
const today = new Date()
const date_today = today.toISOString().slice(0,10)
console.log('todays date is', date_today)
const filename = './cms-' + date_today + '.json'

function delete_existing_cms_file() {
  if (fs.existsSync(filename)) {
    console.log('removing data file')
    fs.rmSync(filename)
  } else {
    console.log('no data file to remove')
  }
}

async function test_cms_writes_report_file() {
  await sut({}, fs)
  assert.ok(fs.existsSync(filename), 'failed finding report file ' + filename)
}

function test_report_file_contains_cms_data() {
  let contents = fs.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.equal(100, data?.posts, 'posts should be 100')
  assert.equal(10, data?.users, 'users should be 10')
}

function test_calculate_mean_users() {
  let contents = fs.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.equal(10, data?.mean_posts_per_user, 'average posts per user should be 10')
}

async function run_tests() {
  delete_existing_cms_file()
  await test_cms_writes_report_file()
  test_report_file_contains_cms_data()
  test_calculate_mean_users()
}

run_tests()
