import DiskTarget from '../components/DiskTarget'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    targets: state.diskDirs.targets,
    mainImg: state.sourceContents.mainImg,
  }
}

export default connect(mapStateToProps)(DiskTarget)

