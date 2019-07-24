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
const { STYLED_IDENT } = require('./match');
const resolveCallExpr = require('./resolveCallExpr');


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
function isUseStyled(parent) {
    let type = parent.type;

    // 处理赋值表达式
    if (type === 'VariableDeclarator') {
        return findStyledIdent(parent.id);
    }

    // 匹配【use】属性
    if (type === 'MemberExpression' && parent.property.name === STYLED_IDENT) {
        return true;
    }
}


/**
 *****************************************
 * 解析加载语句
 *****************************************
 */
module.exports = resolveCallExpr(isUseStyled);

