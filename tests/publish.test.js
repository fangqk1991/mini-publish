const Project = require('../lib/Project')
const assert = require('assert')

describe('Test Publish', () => {
  it(`Publish`, () => {
    const project = new Project(`${__dirname}/config-demo.js`)
    assert.ok(project)
    project.build()
  })
})
