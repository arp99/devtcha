export const isWordaLink = ( currentWord ) => {
  // eslint-disable-next-line no-useless-escape
  const URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

  const result = currentWord.match(URL_REGEX);
  return result !== null
}