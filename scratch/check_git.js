const fs = require('fs')
const git = require('isomorphic-git')
const dir = 'C:\\Users\\yunus\\Desktop\\Bileşim Kimya'

async function listBranches() {
  try {
    let branches = await git.listBranches({ fs, dir })
    console.log("Local branches:", branches)
    
    // Read the refs directly if possible, or just look at .git/refs/remotes
    const refs = await git.resolveRef({ fs, dir, ref: 'HEAD' })
    console.log("Current HEAD:", refs)
  } catch(e) {
    console.error(e)
  }
}
listBranches()
