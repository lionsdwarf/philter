import objectAssign from 'object-assign'

export const addFileName = (fileNames, newFile) => {
  let updatedFileNames = new Set(fileNames)
  updatedFileNames.add(newFile)
  return updatedFileNames
}

export const stageDirToSync = (prevStagedFiles, toStage) => {
  const stagedFiles = objectAssign(prevStagedFiles, {})
  if (!stagedFiles[toStage.img]) {
    stagedFiles[toStage.img] = new Set()
  }
  stagedFiles[toStage.img].add(toStage.dir)
  return stagedFiles
}

export const unstageDir = (prevStagedFiles, toUnstage) => {
  const stagedFiles = objectAssign(prevStagedFiles, {})
  stagedFiles[toUnstage.fileName].delete(toUnstage.dir)
  //rm file from staging if it has no targets
  if (stagedFiles[toUnstage.fileName].size === 0) {
    delete stagedFiles[toUnstage.fileName]
  }
  return stagedFiles
}

export const addJpgOrientation = (existingOrientations, jpgMetadata) => {
  const jpgOrientations = objectAssign(existingOrientations, {})
  jpgOrientations[jpgMetadata.fileName] = jpgMetadata.orientation
  return jpgOrientations
}