
//ipcMain node process does not accept js Set - must convert to Array
const convertSetsToArrs = filesData => {
  let formattedFilesData = {}
  for (let file in filesData) {
    formattedFilesData[file] = [...filesData[file]]
  }
  return formattedFilesData
}

export const formatSyncData = filesToSync => {
  const formattedSyncData = {}
  for (let syncType in filesToSync) {
    formattedSyncData[syncType] = convertSetsToArrs(filesToSync[syncType])
  }
  return formattedSyncData
}