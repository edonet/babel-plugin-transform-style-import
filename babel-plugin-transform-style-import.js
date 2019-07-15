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
const { types } = require('@babel/core');
const { declare } = require('@babel/helper-plugin-utils');
const match = require('@airb/style/match');


/**
 *****************************************
 * 处理加载语句
 *****************************************
 */
function ImportDeclaration({ node }) {
    let resource = node.source.value,
        matched = match(resource);


    // 匹配样式语句
    if (matched && node.specifiers.length) {
        let use = node.specifiers.find(
                x => x.type === 'ImportSpecifier' && x.local.name === 'use'
            );

        // 更新路径
        if (!('module' in matched.query)) {
            node.source = createSource(
                resource + (matched.search ? '&' : '?') + 'module' + (use ? '=styled' : ''),
                node.source
            );
        }
    }
}


/**
 *****************************************
 * 复制节点信息
 *****************************************
 */
function createSource(value, { start, end, loc }) {
    return Object.assign(types.stringLiteral(value), { start, end, loc });
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
            ImportDeclaration
        }
    };
});
