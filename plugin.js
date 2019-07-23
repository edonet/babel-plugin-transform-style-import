/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-14 16:02:33
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { declare } = require('@babel/helper-plugin-utils');
const replaceSource = require('./helpers/replaceSource');


/**
 *****************************************
 * 定义插件
 *****************************************
 */
module.exports = declare(api => {

    // 校验版本
    api.assertVersion(7);

    // 返回接口
    return {
        name: 'transform-style-import',
        visitor: {
            ImportDeclaration: replaceSource('ImportSpecifier'),
            ExportAllDeclaration: replaceSource('all'),
            ExportNamedDeclaration: replaceSource('ExportSpecifier'),
            CallExpression(...args) {
                console.log(args);
            }
        }
    };
});
