import objectAssign from 'object-assign'

// export const addFileName = (fileNames, newFile) => {
//   let updatedFileNames = new Set(fileNames)
//   updatedFileNames.add(newFile)
//   return updatedFileNames
// }

export const addThumbMapping = (mappings, payload) => {
  console.log('mappings', mappings)
  let newMappings = objectAssign({}, mappings)
  console.log('newMappings1', newMappings)
  newMappings[payload[0]] = payload[1]
  console.log('newMappings2', newMappings)
  console.log('mappings2', mappings)

  return newMappings
}

export const toggleStaged = (stagedFiles, fileName, toStage) => {
  let updatedStage = new Set(stagedFiles)
  toStage ? updatedStage.add(fileName) : updatedStage.delete(fileName)
  return updatedStage
}