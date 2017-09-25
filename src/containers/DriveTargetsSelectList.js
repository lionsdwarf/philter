import DriveTargetsSelectList from '../components/DriveTargetsSelectList'
import { connect } from 'react-redux'
import { getUnstagedTargets } from './util'

const mapStateToProps = (state, ownProps) => {
  return {
    unstagedTargets: getUnstagedTargets(state.driveDirs.targets, state.filesToSync.drive, state.sourceContents.mainImg),
    filesToSync: state.filesToSync.drive,
    mainImg: state.sourceContents.mainImg,
    targetContents: state.driveDirs.targetContents,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    stageDirToSync: (img, dir) => dispatch({
      type: 'STAGE_DRIVE_DIR_FOR_SYNC',
      payload: {
        dir: dir,
        img: img,
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DriveTargetsSelectList)

