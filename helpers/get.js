/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 11:03:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 获取值
 *****************************************
 */
module.exports = (obj, path, callback) => {

    // 遍历路径
    while (path.length) {
        let prop = path.shift();

        // 判断是否存在属性
        if (prop in obj) {
            obj = obj[prop];
        } else {
            return;
        }
    }

    // 返回结果
    return callback(obj);
};
