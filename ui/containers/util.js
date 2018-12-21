export const getUnstagedTargets = (targets, stagedFiles, mainImg) => {
  const stagedTargets = stagedFiles[mainImg]
  return stagedTargets ?
    targets.filter(
      target => !stagedTargets.has(target)
    )
    :
    targets
}