let defaultFolderId

const handleDefaultFolderSelect = folderId => {
  defaultFolderId = folderId
}

const populateDefaultFolderPicklist = folders => {
  const defaultFolderPicklist = document.getElementById('driveDefaultFolder')
  defaultFolderPicklist.onchange = () => handleDefaultFolderSelect(defaultFolderPicklist.value)
  for (let folder of folders) {
    const folderOption = document.createElement('option')
    folderOption.value = folder.id
    folderOption.innerHTML = folder.name
    defaultFolderPicklist.appendChild(folderOption)
  }
}

module.exports = {
  populateDefaultFolderPicklist: populateDefaultFolderPicklist,
  getDefaultFolderId: () => defaultFolderId,
}