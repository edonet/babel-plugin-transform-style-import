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
const { matchQuery } = require('./helpers/match');


/**
 *****************************************
 * 定义代码
 *****************************************
 */
const transform = (source) => {
    let idx = source.indexOf('module.exports =');

    // 变化源码
    if (idx > -1) {
        return (
            source.slice(0, idx) +
            'var locals ' +
            source.slice(idx + 15) +
            '\nObject.defineProperty(exports, "__esModule", { value: true });' +
            '\nexports.default = locals;' +
            '\nexports.use = require("@airb/style/styled.js")(locals);'
        );
    }

    // 返回源码
    return source;
};


/**
 *****************************************
 * 定义加载器
 *****************************************
 */
function loader(source) {
    let query = this.query,
        matched;

    // 匹配参数
    if (typeof query === 'object') {
        matched = query.styled;
    } else {
        matched = matchQuery(this.resourceQuery || '');
        matched = matched && matched[1] === 'styled';
    }

    // 返回源码
    return matched ? transform(source) : source;
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = loader;
