#!/usr/bin/env node

const assert = require('assert')
const path = require('path')
const Project = require('./lib/Project')

const [,, ...args] = process.argv
assert.ok(Array.isArray(args) && args[0], `Please use command: mini-publish YOUR-CONFIG-FILE-PATH`)

const configFile = path.resolve(process.cwd(), args[0])
const project = new Project(configFile)
project.build()
