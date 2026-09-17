const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const gitDir = path.join('c:', 'Users', 'yunus', 'Desktop', 'Bileşim Kimya', '.git');

function readObject(hash) {
    const dir = hash.substring(0, 2);
    const file = hash.substring(2);
    const objectPath = path.join(gitDir, 'objects', dir, file);
    if (!fs.existsSync(objectPath)) return null;
    const compressed = fs.readFileSync(objectPath);
    return zlib.inflateSync(compressed);
}

// Read HEAD to find current branch
const headContent = fs.readFileSync(path.join(gitDir, 'HEAD'), 'utf-8').trim();
let ref = '';
if (headContent.startsWith('ref: ')) {
    ref = headContent.substring(5);
}

// Get commit hash
const commitHash = fs.readFileSync(path.join(gitDir, ref), 'utf-8').trim();
console.log('Latest commit hash:', commitHash);

const commitData = readObject(commitHash).toString('utf-8');
const treeHash = commitData.match(/tree ([a-f0-9]{40})/)[1];
console.log('Tree hash:', treeHash);

function parseTree(buffer) {
    let offset = buffer.indexOf(0) + 1; // skip "tree <size>\0"
    const entries = [];
    while (offset < buffer.length) {
        const space = buffer.indexOf(32, offset);
        const nullByte = buffer.indexOf(0, space);
        const mode = buffer.toString('utf8', offset, space);
        const name = buffer.toString('utf8', space + 1, nullByte);
        const hash = buffer.slice(nullByte + 1, nullByte + 21).toString('hex');
        entries.push({ mode, name, hash });
        offset = nullByte + 21;
    }
    return entries;
}

const treeObj = readObject(treeHash);
const entries = parseTree(treeObj);
const argeEntry = entries.find(e => e.name === 'arge.html');
const iletisimEntry = entries.find(e => e.name === 'iletisim.html');

if (argeEntry) {
    console.log('Found arge.html hash:', argeEntry.hash);
    const argeBlob = readObject(argeEntry.hash);
    const content = argeBlob.slice(argeBlob.indexOf(0) + 1).toString('utf8');
    fs.writeFileSync(path.join('c:', 'Users', 'yunus', 'Desktop', 'Bileşim Kimya', 'arge_recovered.html'), content);
    console.log('Recovered arge.html!');
}

if (iletisimEntry) {
    console.log('Found iletisim.html hash:', iletisimEntry.hash);
    const iletisimBlob = readObject(iletisimEntry.hash);
    const content = iletisimBlob.slice(iletisimBlob.indexOf(0) + 1).toString('utf8');
    fs.writeFileSync(path.join('c:', 'Users', 'yunus', 'Desktop', 'Bileşim Kimya', 'iletisim_recovered.html'), content);
    console.log('Recovered iletisim.html!');
}
