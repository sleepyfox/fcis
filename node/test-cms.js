const assert = require('assert')

const axios_stub = require('./axios_stub')
const fs_stub = require('./fs_stub')
const sut = require('./cms').main
const expected = ""
const today = new Date()
const date_today = today.toISOString().slice(0,10)
console.log('todays date is', date_today)
const filename = 'cms-' + date_today + '.json'

function test_fs_stub_records_file_name() {
  fs_stub.writeFileSync('cat', 'dog')
  assert.ok(fs_stub.existsSync('cat'), 'missing cat file from stub')
}

function test_fs_stub_records_file_data() {
  fs_stub.writeFileSync('cat', 'dog')
  assert.equal(fs_stub.readFileSync('cat'), 'dog', 'file contents don\'t match')
}

async function test_axios_stub_returns_200_OK() {
  let api = await axios_stub.get()
  assert.equal(api.status, 200, 'status should be OK')
}

async function test_axios_stub_returns_cms_data() {
  let api = await axios_stub.get()
  let result = api.data
  assert.equal(result.length, 2, 'there should be two records')
  assert.equal(result[0].userId, 1, 'first post should be by userId 1')
}

async function test_cms_writes_report_file() {
  await sut({}, fs_stub, axios_stub)
  assert.ok(fs_stub.existsSync(filename), `failed finding report file ${filename}`)
  return Promise.resolve(true)
}

function test_report_file_contains_cms_data() {
  let contents = fs_stub.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.equal(2, data?.posts, 'posts should be 2')
  assert.equal(1, data?.users, 'users should be 1')
}

function test_calculate_mean_users() {
  let contents = fs_stub.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.equal(2, data?.mean_posts_per_user, 'average posts per user should be 2')
}

async function run_tests() {
  await test_axios_stub_returns_200_OK()
  await test_axios_stub_returns_cms_data()
  test_fs_stub_records_file_name()
  test_fs_stub_records_file_data()
  await test_cms_writes_report_file()
  test_report_file_contains_cms_data()
  test_calculate_mean_users()
}

run_tests()
