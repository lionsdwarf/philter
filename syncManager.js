const filesToSync = {
  drive: new Set(),
  disk: new Set()
}

const syncSelection = (input, type) => {
  input.checked ? filesToSync[type].add(selectedFile) : filesToSync[type].delete(selectedFile)
}

const rememberSelections = (type) => {
  const input = document.getElementById(type)
  input.checked = filesToSync[type].has(selectedFile)
}

module.exports = {
  syncSelection: syncSelection,
  rememberSelections: rememberSelections
}