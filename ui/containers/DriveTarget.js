import { connect } from 'react-redux'
import DriveTarget from '../components/DriveTarget'
import {
  createDriveDir
} from '../nodeActions'

const mapStateToProps = (state, ownProps) => {
  return {
    targetDirs: state.driveDirs.targets,
    mainImg: state.sourceContents.mainImg,
    createDriveDir: createDriveDir,
  }
}

export default connect(mapStateToProps)(DriveTarget)

