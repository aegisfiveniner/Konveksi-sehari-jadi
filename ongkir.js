function ongkir (cities, userCity) {
  let a = null
  for (let i in cities) {
    if (cities[i].city === userCity) {
      a = [cities[i].price, cities[i].id]
    }
  }
  return a
}

module.exports = ongkir