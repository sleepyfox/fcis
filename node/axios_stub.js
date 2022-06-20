module.exports = {
  uri_called: "",
  get: async (uri) => {
    this.uri_called = uri
    return Promise.resolve(JSON.stringify({
      status: 200,
      data: [
        {
          "userId": 1,
          "id": 1,
          "title": "sunt aut facere",
          "body": "quia et suscipit"
        },
        {
          "userId": 1,
          "id": 2,
          "title": "qui est esse",
          "body": "est rerum tempore vitae"
        }
      ]
    }))
  }
}
