import MainImgDisplay from '../components/MainImgDisplay'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    mainImg: state.sourceContents.mainImg,
    jpgsMetadata: state.sourceContents.jpgsMetadata,
    sourceDir: state.diskDirs.source,
  }
}

export default connect(mapStateToProps)(MainImgDisplay)

