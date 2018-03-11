const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

module.exports = {
  getCurrentDirectoryBase : () => {
    return path.basename(process.cwd());
  },

  directoryExists : (filePath) => {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (err) {
      return false;
    }
  },

  fileExists : (filePath) => {
    try{
      return fs.statSync(filePath).isFile();
    } catch (err) {
      return false;
    }
  },

  convertToUnit16BECSV : filePaths => {
    console.log('Starting conversion')
    try{
      const data = fs.readFileSync(filePaths.input);
      const uint16 = []

      for(let i = 0; i < data.length; i++)
      {
        if(i%2 !== 0 )
        {
          const buf = Buffer.from([data[i-1], data[i]])
          const int = buf.readUInt16BE(0);
          uint16.push(int)
        }
      }

      mkdirp.sync(path.dirname(filePaths.output))

      let file = fs.createWriteStream(filePaths.output)
      file.on('error', function(err) { console.log("File Write Error: ",err) })
      uint16.forEach(function(v) { file.write(v + '\n') })
      file.end()

      return true
    } catch (err) {
      console.log('Conversion Error: ', err)
      throw err
    }
  }
};