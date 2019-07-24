/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 10:54:25
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 校验语法
 *****************************************
 */
module.exports = (rules, callback) => {
    return expr => {

        // 校验规则
        for (const rule of rules) {
            if (!rule(expr)) {
                return false;
            }
        }

        // 执行回调
        return callback(expr);
    };
};
