/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 17:04:14
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const createSource = require('./createSource');
const { IGNORE_SIGN, matchStyle, matchQuery } = require('./match');


/**
 *****************************************
 * 解析样式加载调用语句
 *****************************************
 */
module.exports = isUseStyled => {
    return (node, expr) => {
        let resource = expr.node.arguments[0].value,
            style = matchStyle(resource);

        // 匹配样式语句
        if (style.matched && !matchQuery(style.resourceQuery)) {
            let styled = isUseStyled(expr.parent, expr.parentPath);

            // 忽略处理
            if (styled !== IGNORE_SIGN) {
                let { resourcePath, resourceQuery } = style;

                // 添加参数
                resourcePath += '?module' + (styled ? '=styled' : '');

                // 拼接查询参数
                if (resourceQuery) {
                    resourcePath += '&' + resourceQuery.slice(1);
                }

                // 更新源码
                node.arguments[0] = createSource(resourcePath, node.arguments[0]);
            }
        }
    };
};
