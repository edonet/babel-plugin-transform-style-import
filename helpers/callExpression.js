/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 11:00:04
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const get = require('./get');
const validateExpression = require('./validateExpression');
const { matchStyle, matchQuery } = require('./match');


/**
 *****************************************
 * 定义调用语句规则
 *****************************************
 */
const rules = [
    ({ node: { callee }}) => (
        callee.type === 'Import' || callee.name === 'require'
    ),
    ({ parent }) => (
        parent.type !== 'ExpressionStatement'
    ),
    ({ node }) => (
        node.arguments.length === 1
    )
];


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = validateExpression(rules, (expr) => {
    let resource = expr.node.arguments[0].value,
        style = matchStyle(resource);

    // 匹配样式语句
    if (style.matched && !matchQuery(style.resourceQuery)) {
        console.log(expr);
    }
    //     let { resourcePath, resourceQuery } = style,
    //         use = (
    //             type === 'all' ||
    //             node.specifiers.find(x => x.type === type && x.local.name === 'use')
    //         );

    //     // 更新路径
    //     if (!matchQuery(resourceQuery)) {
    //         let search = '?module' + (use ? '=styled' : '');

    //         // 拼接查询参数
    //         if (resourceQuery) {
    //             search += '&' + resourceQuery.slice(1);
    //         }

    //         // 更新源码
    //         node.source = createSource(resourcePath + search, node.source);
    //     }
    // }

});
