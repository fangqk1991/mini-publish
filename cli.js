#!/usr/bin/env node

const assert = require('assert')
const Project = require('./lib/Project')

const [,, ...args] = process.argv
assert.ok(Array.isArray(args) && args[0], `Please use command: mini-publish YOUR-CONFIG-FILE-PATH`)
const project = new Project(args[0])
project.build()
