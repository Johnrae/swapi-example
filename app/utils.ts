export const getPlanetIdFromUrl = (url: string) => {
  // "https://swapi.dev/api/planets/1/" -> ["https:", "", "swapi.dev", "api", "planets", "1", ""]
  return url.split('/')[5]
}

export const unslugify = (slug: string) =>
  slug.split('_').map(capitalize).join(' ')

export const capitalize = (word: string) =>
  word[0].toUpperCase() + word.slice(1)
