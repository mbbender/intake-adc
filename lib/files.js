const fs = require('fs');
const path = require('path');

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

  readFile : (filepath) => {
    try{
      const data = fs.readFileSync(filepath);

      const uint16 = []
      for(let i = 0; i < data.length; i++)
      {
        if(i%2 !== 0 )
        {
          const buf = Buffer.from([data[i-1], data[i]])
          const int = buf.readUInt16BE(0);
          uint16.push(int)
         // console.log(int)
        }
      }
      return uint16
    } catch (err) {
      console.log('error', err)
      return err
    }
  }
};