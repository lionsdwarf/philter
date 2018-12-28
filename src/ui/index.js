const path = require('path')

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
let src, isPO

const getRotation = orientation => {
  switch (orientation) {
    case 3:
      return '180'
    case 6:
      return '90'
    case 8:
      return '270'
    default:
      return '0'
  }
}

const isPortraitOrientation = (orientation) => orientation === 6 || orientation === 8

const setMainImg = (payload) => {
  isPO = isPortraitOrientation(payload.jpgMetadata.orientation)
  src = `${path.join(payload.sourceDir, payload.fileName)}`
  isPO && $('.inspect').addClass(`portrait${getRotation(payload.jpgMetadata.orientation)}`)
  $('.img-wrapper').children('.img').css({'background-image': `url(file://${src})`});
}

ipcRenderer.on('set-main-img', (e, payload) => setMainImg(payload))

$('.img-wrapper').on('mousemove', function(e){
  $(this).children('.img').css({
    'transform-origin': isPO ?
      (100 - ((e.pageY - $(this).offset().top) / $(this).height()) * 100) +'% ' + ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '%'
      :
      ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'
  });
})
