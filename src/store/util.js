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

// export const  resolveThumbsSourceDir = payload => {
//   return (payload.devEnv ? '../../' : '../') + payload.dir
// }

// export const toggleStaged = (stagedFiles, fileName, toStage) => {
//   let updatedStage = new Set(stagedFiles)
//   toStage ? updatedStage.add(fileName) : updatedStage.delete(fileName)
//   return updatedStage
// }

// export const addTargetDir = (targets, newTarget) => {
//   const newTargets = targets.slice()
//   newTargets.push(newTarget)
//   return newTargets
// }