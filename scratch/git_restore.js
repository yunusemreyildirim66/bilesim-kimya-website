const git = require('isomorphic-git');
const fs = require('fs');

async function restore() {
  try {
    await git.checkout({
      fs,
      dir: '.',
      ref: 'main',
      force: true // overwrite all files
    });
    console.log("Git checkout complete!");
  } catch (err) {
    console.error("Error checking out:", err);
  }
}
restore();
