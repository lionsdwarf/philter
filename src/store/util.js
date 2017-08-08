export const addFileName = (fileNames, newFile) => {
  let updatedFileNames = new Set(fileNames)
  updatedFileNames.add(newFile)
  return updatedFileNames
}
