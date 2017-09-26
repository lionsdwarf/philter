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

export const addWriteSuccess = (existingWriteSuccesses, payload) => {
  const writeSuccesses = objectAssign({}, existingWriteSuccesses)
  if (!writeSuccesses[payload.targetDir]) {
    writeSuccesses[payload.targetDir] = new Set()
  } 
  writeSuccesses[payload.targetDir].add(payload.fileName)
  return writeSuccesses
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

export const addJpgMetadata = (existingMetadata, jpg) => {
  const jpgMetadata = objectAssign(existingMetadata, {})
  jpgMetadata[jpg.fileName] = jpg.metadata
  return jpgMetadata
}

export const addTargetDirContents = (existingTargetContents, payload) => {
  const targetContents = objectAssign(existingTargetContents, {})
  targetContents[payload.dir.id || payload.dir] = new Set(payload.dirContents)
  return targetContents
}
