module.exports = {
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
