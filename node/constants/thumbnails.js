const thumbs = `${process.argv[3] === 'dev' ? 'public' : 'build'}/.thumbs/`
// const thumbs = '.thumbnails/'

module.exports = {
  THUMBS_DIR: thumbs,
  REL_THUMBS_DIR: './' + thumbs
}