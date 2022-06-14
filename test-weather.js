const fs = require('fs')
const {is, testRunner} = require('@gowerstreet/infintestimal')
const assert = require('assert')

const sut = require('./weather').main
const expected = ""
const today = new Date()
const date_today = today.toISOString().slice(0,10)
console.log('todays date is', date_today)
const filename = './weather-' + date_today + '.json'

function delete_existing_weather_file() {
  if (fs.existsSync(filename)) {
    console.log('removing data file')
    fs.rmSync(filename)
  } else {
    console.log('no data file to remove')
  }
}

async function test_weather_writes_file() {
  await sut({ city: 'london'})
  assert.ok(fs.existsSync(filename), 'failed finding file ' + filename)
}

function test_weather_file_contains_weather_data() {
  let contents = fs.readFileSync(filename, 'utf8')
  let data = JSON.parse(contents)
  assert.ok(data?.name == 'London', 'data should be for the city of London')
  assert.ok(data?.weather.length > 0, 'weather should return results')
  assert.ok(data?.weather[0]?.main == 'Clouds', 'London is always cloudy')
}

async function run_tests() {
  delete_existing_weather_file()
  await test_weather_writes_file()
  test_weather_file_contains_weather_data()
}

run_tests()
