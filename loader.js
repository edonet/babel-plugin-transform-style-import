/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-13 21:12:10
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const match = require('@airb/style/match');


/**
 *****************************************
 * 定义代码
 *****************************************
 */
const transform = (() => {

    // 返回方法
    return source => (
        source.replace('module.exports ', 'var locals ') +
        '\nObject.defineProperty(exports, "__esModule", { value: true });' +
        '\nexports.default = locals;' +
        '\nexports.use = require("@airb/style/styled.js")(locals);'
    );
})();


/**
 *****************************************
 * 定义加载器
 *****************************************
 */
function loader(source) {
    let matched = match(this.resource);

    // 替换源码
    if (matched && matched.query.module === 'styled') {
        return transform(source);
    }

    // 返回源码
    return source;
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = loader;
