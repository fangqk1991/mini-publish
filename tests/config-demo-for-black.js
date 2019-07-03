module.exports = {
  name: 'SomeProject-Black',
  sourceDir: __dirname,
  ignores: [
    '.git',
    '.DS_Store',
    '.idea',
    '.nyc_output',
    '/exclude-dir/'
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
