const fs = require('fs')
const assert = require('assert')

const sut = require('./cms').main
const expected = ""
const today = new Date()
const date_today = today.toISOString().slice(0,10)
console.log('todays date is', date_today)
const filename = 'cms-' + date_today + '.json'

let fs_stub = {
  file_data: "",
  file_name: "",
  writeFileSync: (filename, data) => {
    // console.log('writefile called with', filename)
    this.file_name = filename
    this.file_data = data
    return true
  },
  existsSync: (name) => { return (this.file_name == name) },
  readFileSync: () => { return this.file_data }
}

function test_fs_stub_records_file_name() {
  fs_stub.writeFileSync('cat', 'dog')
  assert.ok(fs_stub.existsSync('cat'), 'missing cat file from stub')
}

function test_fs_stub_records_file_data() {
  fs_stub.writeFileSync('cat', 'dog')
  assert.equal(fs_stub.readFileSync('cat'), 'dog', 'file contents don\'t match')
}

async function test_cms_writes_report_file() {
  await sut({}, fs_stub)
  assert.ok(fs_stub.existsSync(filename), `failed finding report file ${filename}`)
  return Promise.resolve(true)
}

function test_report_file_contains_cms_data() {
  let contents = fs_stub.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.equal(100, data?.posts, 'posts should be 100')
  assert.equal(10, data?.users, 'users should be 10')
}

function test_calculate_mean_users() {
  let contents = fs_stub.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.equal(10, data?.mean_posts_per_user, 'average posts per user should be 10')
}

async function run_tests() {
  test_fs_stub_records_file_name()
  test_fs_stub_records_file_data()
  await test_cms_writes_report_file()
  test_report_file_contains_cms_data()
  test_calculate_mean_users()
}

run_tests()
