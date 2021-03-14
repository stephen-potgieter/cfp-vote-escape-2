const { readFile, writeFile, lstat, rm } = require('fs')
const { promisify } = require('util')
const read = promisify(readFile)
const write = promisify(writeFile)
const stat = promisify(lstat)
const remove = promisify(rm)

const getFile = (str) => {
  const buff = Buffer.from(str, 'utf-8');
  const key = buff.toString('base64');
  return `/tmp/${key}`
}

module.exports.read = async (name) => {
  const file = getFile(name)
  const cacheStat = await stat(file)
  const ageMinutes = (new Date() - new Date(cacheStat.mtimeMs)) / 1000 / 60
  console.log(ageMinutes)

  if (ageMinutes >= 60) {
    await remove(file, {
      force: true
    })

    throw Error('Not found in cache')
  }

  return await read(file)
}

module.exports.write = async (name, data) => {
  const file = getFile(name)
  await write(file, data)
}
