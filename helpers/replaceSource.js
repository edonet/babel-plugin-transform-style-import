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
const { STYLED_IDENT, matchStyle, matchQuery } = require('./match');


/**
 *****************************************
 * 替换资源
 *****************************************
 */
function replaceSource(type, node) {
    let resource = node.source.value,
        style = matchStyle(resource);

    // 匹配样式语句
    if (style.matched && (type === 'all' || node.specifiers.length)) {
        let { resourcePath, resourceQuery } = style,
            styled = (
                type === 'all' ||
                node.specifiers.find(
                    x => x.type === type && (
                        x.imported ?
                        x.imported.name === STYLED_IDENT :
                        x.local.name === STYLED_IDENT
                    )
                )
            );

        // 更新路径
        if (!matchQuery(resourceQuery)) {
            let search = '?module' + (styled ? '=styled' : '');

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
