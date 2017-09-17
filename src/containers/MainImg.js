import MainImgDisplay from '../components/MainImgDisplay'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    mainImg: state.sourceContents.mainImg,
    sourceDir: state.diskDirs.source,
    devEnv: state.thumbs.devEnv,
  }
}

export default connect(mapStateToProps)(MainImgDisplay)

