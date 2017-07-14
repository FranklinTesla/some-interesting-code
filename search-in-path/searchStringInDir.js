#!/usr/bin/env node
const fs = require('fs')
    , path = require('path');
const args = process.argv.slice(2);
// 处理windows下的路径，将相对路径转换为绝对路径并去掉文件夹路径末尾的斜杠
function parseDir(str) {
    return path.resolve(str.replace(/\\/g, '/').replace(/\/$/, ''));
}

function regExpEscape(str) {
    return str.replace(/[\-\[\]\/{}()*+?.\\^$|]/g, "\\$&");
}

function getRegExp(suffixStr) {
    return new RegExp(regExpEscape(suffixStr)+'$');
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
function getFilesWithStr(str, path, suffix) {
    let result = [];
    function _loop(currentPath, files, dir) {
        let path, isContain, isTargetFile = true;
        for (let i = 0, len = files.length;i < len;i++) {
            path = currentPath+'/'+files[i];
            if (isDir(path)) {
                _loop(path, fs.readdirSync(path), dir);
            } else {
                if (suffix) {
                    isTargetFile = getRegExp(suffix).test(path);
                }
                isContain = isTargetFile && isFileContain(dir, path);
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

const result = getFilesWithStr(args[2], parseDir(args[0]), args[1]);

if (result.length > 0) {
    console.log(result.join('\n'));
} else {
    console.log('无符合要求的结果');
}
