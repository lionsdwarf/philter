import React from 'react'
import SVGIcon from './SVGIcon'
import DiskTargetsList from './DiskTargetsList'
import '../styles/components/DirSelect.css'

export default ({
  dirType, 
  svgPaths, 
  targets, 
  onClick, 
  imgStyle, 
  svgFill,
  buttonLabel,
}) => <div className='dirSelect'>
  
  <div onClick={onClick} className='iconWrapper'>
    <SVGIcon 
      paths={svgPaths}
      fill={svgFill}
    />
  </div>

  {
    targets && targets.length > 0 ?
      <DiskTargetsList targets={targets}/>
      :
      <div className='buttonLabel'>{buttonLabel}</div>
  }

</div>
