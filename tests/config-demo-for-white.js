module.exports = {
  name: 'SomeProject-White',
  sourceDir: __dirname,
  includes: [
    '/include-dir-*/'
  ],
  ignores: [
    '/*'
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
