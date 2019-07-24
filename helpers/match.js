/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-23 19:32:49
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 定义匹配模式
 *****************************************
 */
const styleRE = /\.(css|scss|less|sass)$/i;
const moduleRE = /(?:\?|&)module(?:=(.*?))?(?:$|&)/i;


/**
 *****************************************
 * 解析路径
 *****************************************
 */
function matchStyle(resource) {
    let idx = resource.indexOf('?'),
        resourcePath = resource,
        resourceQuery = '',
        matched;

    // 分割参数
    if (idx > -1) {
        resourcePath = resource.slice(0, idx);
        resourceQuery = resource.slice(idx);
    }

    // 匹配样式
    matched = resourcePath.match(styleRE);

    // 返回结果
    return {
        type: matched && matched[1],
        matched,
        resource,
        resourcePath,
        resourceQuery
    };
}


/**
 *****************************************
 * 配置是否存在模块
 *****************************************
 */
function matchQuery(query) {
    return query.match(moduleRE);
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = {
    STYLED_IDENT: 'use',
    IGNORE_SIGN: 'IGNORE_SIGN',
    matchStyle,
    matchQuery
};
