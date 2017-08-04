const app = () => {
  require('./gDriveAuth')()
  require('./thumbnailsManager').initThumbs()
  require('./navManager')
}

module.exports = app