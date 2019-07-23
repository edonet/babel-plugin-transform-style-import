/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-23 20:12:26
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const createSource = require('./createSource');
const { matchStyle, matchQuery } = require('./match');


/**
 *****************************************
 * 替换资源
 *****************************************
 */
function replaceSource(type, node) {
    let resource = node.source.value,
        result = matchStyle(resource);

    // 匹配样式语句
    if (type === 'all' || result.matched && node.specifiers.length) {
        let { resourcePath, resourceQuery } = result,
            use = (
                type === 'all' ||
                node.specifiers.find(x => x.type === type && x.local.name === 'use')
            );

        // 更新路径
        if (!matchQuery(resourceQuery)) {
            let search = '?module' + (use ? '=styled' : '');

            // 拼接查询参数
            if (resourceQuery) {
                search += '&' + resourceQuery.slice(1);
            }

            // 更新源码
            node.source = createSource(resourcePath + search, node.source);
        }
    }
}


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = (type = 'ImportSpecifier') => {
    return ({ node }) => node.source && replaceSource(type, node);
};
