import DiskTargetsSelectList from '../components/DiskTargetsSelectList'
import { connect } from 'react-redux'
import { getUnstagedTargets } from './util'

const mapStateToProps = (state, ownProps) => {
  return {
    targets: state.diskDirs.targets,
    unstagedTargets: getUnstagedTargets(state.diskDirs.targets, state.filesToSync.disk, state.sourceContents.mainImg),
    filesToSync: state.filesToSync.disk,
    mainImg: state.sourceContents.mainImg,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    stageDirToSync: (img, dir) => dispatch({
      type: 'STAGE_DISK_DIR_FOR_SYNC',
      payload: {
        dir: dir,
        img: img,
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiskTargetsSelectList)

