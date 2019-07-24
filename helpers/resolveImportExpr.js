/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 11:34:21
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const createSource = require('./createSource');
const { STYLED_IDENT, IGNORE_SIGN, matchStyle, matchQuery } = require('./match');


/**
 *****************************************
 * 查找属性标识
 *****************************************
 */
function findStyledIdent(node) {
    if (node.type === 'ObjectPattern') {
        return node.properties.find(prop => prop.key && prop.key.name === STYLED_IDENT);
    }
}


/**
 *****************************************
 * 判断是否样式化
 *****************************************
 */
function isUseStyled(parent, parentPath) {
    let type = parent.type;

    // 处理赋值表达式
    if (type === 'VariableDeclarator') {
        return false;
    }

    // 处理【await】表达式
    if (type === 'AwaitExpression') {
        let sup = parentPath.parent;

        // 处理【await】赋值表达式;
        if (sup.type === 'VariableDeclarator') {
            return findStyledIdent(sup.id);
        }

        // 匹配失败
        return sup.type === 'ExpressionStatement' ? IGNORE_SIGN : false;
    }

    // 匹配【then】调用
    if (type === 'MemberExpression' && parent.property.name === 'then') {
        let argv = parentPath.parent.arguments[0],
            param = argv && argv.params && argv.params[0];

        // 解析参数传值
        return param ? findStyledIdent(param) : IGNORE_SIGN;
    }
}


/**
 *****************************************
 * 解析动态加载语句
 *****************************************
 */
module.exports = (node, expr) => {
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
