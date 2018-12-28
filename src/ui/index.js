const path = require('path')

const electron = window.require('electron')
const ipcRenderer = electron.ipcRenderer
let src

const setMainImg = (payload) => {
  src = `${path.join(payload.sourceDir, payload.fileName)}`
  $('.tile')
    .children('.photo').css({'background-image': `url(file://${src})`});
  // const img = document.getElementById('main-img')
  // img.src = src
  // const img = document.createElement('img')
  // img.src = `${path.join(payload.sourceDir, payload.fileName)}`
  // rootEl.append(img)
}

ipcRenderer.on('set-main-img', (e, payload) => setMainImg(payload))

$('.tile')
  // tile mouse actions
  // .on('mouseover', function(){
  //   $(this).children('.photo').css({'transform': 'scale(2)'});
  // })
  // .on('mouseout', function(){
  //   $(this).children('.photo').css({'transform': 'scale(1)'});
  // })
  .on('mousemove', function(e){
    $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
  })
  // // // tiles set up
  // .each(function(){
  //   $(this)
      // add a photo container
      // .append('<div class="photo"></div>')
      // some text just to show zoom level on current item in this example
      // .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
      // .children('.photo').css({'background-image': `url(${src})`});
  // })
