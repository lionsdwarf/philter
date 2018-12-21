import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbFileNames: state.thumbs.fileNames,
    filesToSync: state.filesToSync,
    writeStatus: state.writeStatus,
    sourceDir: state.diskDirs.source,
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

