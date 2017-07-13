#!/usr/bin/env node
const fs = require('fs')
    , args = process.argv.slice(-2);
// 转换windows下的路径
function parseDir(str) {
    return str.replace(/\\/g, '/')
}

// 判断给定路径是否是文件夹
function isDir(path) {
    let stat = fs.lstatSync(path);
    return stat.isDirectory();
}

// 判断给定字符串str是否存在于给定文件中
function isFileContain(str, file) {
    return fs.readFileSync(file, 'utf-8').indexOf(str) !== -1;
}
// 获取含有字符串str的文件路径列表
function getFilesWithStr(str, path) {
    let result = [];
    function _loop(currentPath, files, dir) {
        let path, isContain;
        for (let i = 0, len = files.length;i < len;i++) {
            path = currentPath+'/'+files[i];
            if (isDir(path)) {
                _loop(path, fs.readdirSync(path), dir);
            } else {
                isContain = /.js$/.test(path) && isFileContain(dir, path);
                if (isContain) {
                    result.push(path);
                }
            }
        }
    }
    let files = fs.readdirSync(path);
    _loop(path, files, str);
    return result;
}

function isStrExist(str, path) {
    return getFilesWithStr(str, path).length > 0;
}

console.log(isStrExist(args[1], parseDir(args[0])));