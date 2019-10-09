module.exports = {
  get: name => JSON.parse(localStorage.getItem(name)),
  set: (name, data) => localStorage.setItem(name, JSON.stringify(data)),
}
