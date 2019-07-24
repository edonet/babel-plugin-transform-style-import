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
const resolveRequireExpr = require('./helpers/resolveRequireExpr');
const resolveImportExpr = require('./helpers/resolveImportExpr');


/**
 *****************************************
 * 校验调用加载函数
 *****************************************
 */
function validateCallExpr(args, parent) {
    return (
        args.length === 1 &&
        args[0].type === 'StringLiteral' &&
        parent.type !== 'ExpressionStatement'
    );
}


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
            CallExpression(expr) {
                let node = expr.node,
                    callee = node.callee;

                // 处理加载语句
                if (callee.name === 'require') {

                    // 处理动态加载
                    if (validateCallExpr(node.arguments, expr.parent)) {
                        resolveRequireExpr(node, expr);
                    }

                    // 退出处理
                    return;
                }

                // 动态加载
                if (callee.type === 'Import') {

                    // 处理动态加载
                    if (validateCallExpr(node.arguments, expr.parent)) {
                        resolveImportExpr(node, expr);
                    }
                }
            }
        }
    };
});
