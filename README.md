# mini-publish
## Installation
```
npm install -g mini-publish
```

## Configuration file
You should create a configuration file. Example: 

```
// YOUR-CONFIG-FILE.js
module.exports = {
  name: 'SomeProject',
  sourceDir: __dirname,
  includes: [
    '/some-dir/'
  ],
  ignores: [
    '.git',
    '.DS_Store',
    '.idea',
    '.nyc_output'
    '/node_modules/'
  ],
  exeBefore: [
    `echo "[Echo in local] Prepare files..."`,
  ],
  exeAfter: [
    `echo "[Echo in local] Publish finished"`,
  ],
  remote: {
    host: '127.0.0.1',
    targetDir: '/var/www/some',
    publishBefore: [
      `echo "[Echo in remote server] Files uploading..."`,
    ],
    publishAfter: [
      `echo "[Echo in remote server] Files has been uploaded."`,
    ],
  }
}
```

* `name`: project name
* `sourceDir`: the path of project which will be upload to server
* `includes`: items will be include for rsync, it takes higher priority then `ignores`
* `ignores`: items will be exclude for rsync
* `remote.host`: the remote server, such as fang@example.com
* `remote.targetDir`: the remote directory for project

You can see `lib/publish.tmpl` for more information.

## Usage
```
mini-publish YOUR-CONFIG-FILE.js
```

## Extras
You can mini-publish in any project other than JavaScript.
