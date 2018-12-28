import ImgNavItems from '../components/ImgNavItems'
import { connect } from 'react-redux'
import { setMainImg } from '../nodeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    sourceJpgs: state.sourceContents.jpgs,
    thumbFileNames: state.thumbs.fileNames,
    filesToSync: state.filesToSync,
    writeStatus: state.writeStatus,
    sourceDir: state.diskDirs.source,
    jpgsMetadata: state.sourceContents.jpgsMetadata
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    unstageDir: (dirType, dir, fileName) => dispatch({
      type: `UNSTAGE_${dirType.toUpperCase()}_DIR`,
      payload: {
        fileName: fileName,
        dir: dir,
      }
    }),
    setMainImg: (sourceDir, fileName, jpgMetadata) => dispatch({
      type: 'SET_MAIN_IMG',
      payload: fileName
    }) && setMainImg(sourceDir, fileName, jpgMetadata)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgNavItems)

