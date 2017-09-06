import objectAssign from 'object-assign'

export const addFileName = (fileNames, newFile) => {
  let updatedFileNames = new Set(fileNames)
  updatedFileNames.add(newFile)
  return updatedFileNames
}

export const stageDirToSync = (prevStagedFiles, toStage, dirType) => {
  const stagedFiles = objectAssign(prevStagedFiles, {})
  stagedFiles[toStage.img] ? 
    stagedFiles[toStage.img][dirType].push(toStage.dir)
    :
    stagedFiles[toStage.img] = {
      disk: [],
      drive: []
    }
  stagedFiles[toStage.img][dirType].push(toStage.dir)
  console.log(prevStagedFiles)
  console.log(stagedFiles)
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