const Project = require('../lib/Project')
const shell = require('shelljs')
const assert = require('assert')

describe('Test HomeDir', () => {
  it(`Shell`, () => {
    shell.cd('~')
    const homeDir = shell.pwd().stdout
    assert.ok(!!homeDir)
  })
})

describe('Test Publish', () => {
  it(`Publish With Black List`, () => {
    const project = new Project(`${__dirname}/config-demo-for-black.js`)
    project.build()
  })
  it(`Publish With White List`, () => {
    const project = new Project(`${__dirname}/config-demo-for-white.js`)
    project.build()
  })
})
