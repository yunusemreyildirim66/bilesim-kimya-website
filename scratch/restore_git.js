const fs = require('fs')
const git = require('isomorphic-git')
const dir = 'C:\\Users\\yunus\\Desktop\\Bileşim Kimya'

async function restore() {
  try {
    const statusMatrix = await git.statusMatrix({ fs, dir })
    console.log("Checking out modified files to HEAD...")
    for (const row of statusMatrix) {
        const filepath = row[0]
        const headStatus = row[1]
        const worktreeStatus = row[2]
        
        if (headStatus === 1 && worktreeStatus !== 1) {
            await git.checkout({ fs, dir, filepaths: [filepath], force: true })
            console.log(`Restored: ${filepath}`)
        }
    }
    console.log("Done")
  } catch (err) {
    console.error(err)
  }
}
restore()
