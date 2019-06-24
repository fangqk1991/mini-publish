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
  it(`Publish`, () => {
    const project = new Project(`${__dirname}/config-demo.js`)
    project.build()
  })
})
