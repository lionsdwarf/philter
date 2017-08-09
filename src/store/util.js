export const addFileName = (fileNames, newFile) => {
  let updatedFileNames = new Set(fileNames)
  updatedFileNames.add(newFile)
  return updatedFileNames
}

export const toggleStaged = (stagedFiles, fileName, toStage) => {
  let updatedStage = new Set(stagedFiles)
  toStage ? updatedStage.add(fileName) : updatedStage.delete(fileName)
      console.log('td2', updatedStage)

  return updatedStage
}