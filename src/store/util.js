// export const  resolveThumbsSourceDir = payload => {
//   return (payload.devEnv ? '../../' : '../') + payload.dir
// }

export const addFileName = (fileNames, newFile) => {
  let updatedFileNames = new Set(fileNames)
  updatedFileNames.add(newFile)
  return updatedFileNames
}

export const toggleStaged = (stagedFiles, fileName, toStage) => {
  let updatedStage = new Set(stagedFiles)
  toStage ? updatedStage.add(fileName) : updatedStage.delete(fileName)
  return updatedStage
}

export const addTargetDir = (targets, newTarget) => {
  const newTargets = targets.slice()
  newTargets.push(newTarget)
  return newTargets
}