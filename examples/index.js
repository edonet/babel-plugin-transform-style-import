/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-23 19:14:01
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const fs = require('fs');
const path = require('path');
const { transform } = require('@babel/core');
const query = require('./query');
const loader = require('./loader');


/**
 *****************************************
 * 读取文件内容
 *****************************************
 */
function readFile(name) {
    return fs.readFileSync(path.join(__dirname, name), 'utf8');
}


/**
 *****************************************
 * 定义脚本
 *****************************************
 */
function main() {
    let source = readFile('source.js'),
        options = {
            ast: true,
            plugins: [
                require('@babel/plugin-syntax-dynamic-import').default,
                require('../plugin')
            ]
        };

    // 转化代码
    transform(source, options, (err, result) => {

        // 抛出错误
        if (err) {
            return console.error(err);
        }

        // 打印结果
        console.log(result.code === readFile('result.js').trim());

        // 启动校验
        query();
        loader();
    });
}


/**
 *****************************************
 * 执行脚本
 *****************************************
 */
main();
