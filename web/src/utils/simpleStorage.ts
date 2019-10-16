// A small helper for localStorage
export default {
  get: (name: string): any => JSON.parse(localStorage.getItem(name)),
  set: (name: string, data: any): void =>
    localStorage.setItem(name, JSON.stringify(data)),
}
