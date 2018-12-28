const path = require('path')

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
let src

const setMainImg = (payload) => {
  src = `${path.join(payload.sourceDir, payload.fileName)}`
  $('#img-wrapper').children('#img').css({'background-image': `url(file://${src})`});
}

ipcRenderer.on('set-main-img', (e, payload) => setMainImg(payload))

$('#img-wrapper').on('mousemove', function(e){
  $(this).children('#img').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
})
