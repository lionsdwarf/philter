import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  console.log('in', state.sourceContents.jpgsMetadata)  
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbFileNames: state.thumbs.fileNames,
    filesToSync: state.filesToSync,
    jpgsMetadata: state.sourceContents.jpgsMetadata,
    // diskTargetContents: state.diskDirs.targetContents,
    // driveTargetContents: state.driveDirs.targetContents,
    sourceDir: state.diskDirs.source,
    thumbsSourceDir: state.thumbs.dir,
    devEnv: state.thumbs.devEnv,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  return {
    unstageDir: (dirType, dir, fileName) => dispatch({
      type: `UNSTAGE_${dirType.toUpperCase()}_DIR`,
      payload: {
        fileName: fileName,
        dir: dir,
      }
    }),
    setMainImg: (sourceDir, fileName) => dispatch({
      type: 'SET_MAIN_IMG',
      payload: fileName
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNavItems)

