import React from 'react'
import '../styles/components/DirSelect.css'
import camera from '../static/svg/camera.svg'
import { selectSourceDir } from '../nodeActions'

export default () => <div className='dirSelect'>
  
  <div onClick={selectSourceDir} className='iconWrapper'>
    <img src={`./${camera}`} alt='camera icon'/>
  </div>

</div>
