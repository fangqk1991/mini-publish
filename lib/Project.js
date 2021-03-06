const assert = require('assert')
const fs = require('fs')
const crypto = require('crypto')
const shell = require('shelljs')

function md5(content) {
  return crypto.createHash('md5').update(content).digest('hex')
}

class Project {
  constructor(configFile) {
    assert.ok(fs.existsSync(configFile), 'config file not exists')

    this._projectName = null
    this._sourceDir = null

    this._remoteHost = null
    this._remotePort = 22
    this._remotePath = null

    this._excludeInfo = ''
    this._includeInfo = ''
    this._publishBefore = ''
    this._publishAfter = ''

    this._exeBefore = ''
    this._exeAfter = ''

    this._configFile = configFile
    this._tmplFile = `${__dirname}/publish.tmpl`
  }

  _loadInfo() {
    const dic = require(this._configFile)
    assert.ok(!!dic && typeof dic === 'object', 'config file not exists')
    assert.ok(!!dic.remote && typeof dic.remote === 'object', 'Params Error: config.remote')

    const remoteInfo = dic.remote

    this._projectName = dic.name
    this._sourceDir = dic.sourceDir
    this._remoteHost = remoteInfo.host
    if (remoteInfo.port) {
      this._remotePort = remoteInfo.port
    }
    this._remotePath = remoteInfo.targetDir

    if (Array.isArray(dic.includes)) {
      this._includeInfo = dic.includes.map(item => `--include "${item}"`).join(' ')
    }

    if (Array.isArray(dic.ignores)) {
      this._excludeInfo = dic.ignores.map(item => `--exclude "${item}"`).join(' ')
    }

    if (Array.isArray(remoteInfo.publishBefore)) {
      this._publishBefore = remoteInfo.publishBefore.join('; ')
    }

    if (Array.isArray(remoteInfo.publishAfter)) {
      this._publishAfter = remoteInfo.publishAfter.join('; ')
    }

    if (Array.isArray(dic.exeBefore)) {
      this._exeBefore = dic.exeBefore.join('; ')
    }

    if (Array.isArray(dic.exeAfter)) {
      this._exeAfter = dic.exeAfter.join('; ')
    }
  }

  build() {
    this._loadInfo(this._configFile)
    const tmpl = fs.readFileSync(this._tmplFile, 'utf8')

    const properties = {
      projectName: this._projectName,
      sourceDir: this._sourceDir,
      remoteHost: this._remoteHost,
      remotePort: this._remotePort,
      remotePath: this._remotePath,
      includeInfo: this._includeInfo,
      excludeInfo: this._excludeInfo,
      publishBefore: this._publishBefore,
      publishAfter: this._publishAfter,
      exeBefore: this._exeBefore,
      exeAfter: this._exeAfter,
    }
    const content = tmpl.replace(/\{\{\$(\w+)\}(\})/g, (match, key) => {
      return properties[key]
    })
    const hash = md5(this._configFile).substr(0, 4)

    shell.cd('~')
    const homeDir = shell.pwd().stdout
    const outputDir = `${homeDir}/.mini-publish-bin/${this._projectName}-${hash}`
    shell.exec(`mkdir -p ${outputDir}`)

    const buildFile = `${outputDir}/build.sh`
    fs.writeFileSync(buildFile, content)

    shell.exec(`chmod +x ${buildFile}`)
    shell.exec(`${buildFile}`)
  }
}

module.exports = Project
