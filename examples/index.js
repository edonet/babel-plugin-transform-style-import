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


/**
 *****************************************
 * 定义脚本
 *****************************************
 */
function main() {
    let source = fs.readFileSync(path.join(__dirname, 'source.js')),
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
        console.log(result.code);
    });
}


/**
 *****************************************
 * 执行脚本
 *****************************************
 */
main();
