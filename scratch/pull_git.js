const fs = require('fs')
const http = require('isomorphic-git/http/node')
const git = require('isomorphic-git')
const dir = 'C:\\Users\\yunus\\Desktop\\Bileşim Kimya'

async function pull() {
  try {
    console.log("Pulling from origin...")
    await git.pull({
      fs,
      http,
      dir,
      ref: 'main',
      singleBranch: true,
      author: {
        name: 'System',
        email: 'system@example.com'
      }
    })
    console.log("Pull successful on main")
  } catch (err) {
    console.error("Failed on main, trying master...", err.message)
    try {
      await git.pull({
        fs,
        http,
        dir,
        ref: 'master',
        singleBranch: true,
        author: {
          name: 'System',
          email: 'system@example.com'
        }
      })
      console.log("Pull successful on master")
    } catch (err2) {
      console.error(err2)
    }
  }
}
pull()
