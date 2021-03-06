/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-15 10:25:22
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const path = require('path');
const plugin = require('./plugin');


/**
 *****************************************
 * 配置加载器地址
 *****************************************
 */
plugin.loader = path.resolve(__dirname, './loader.js');


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
module.exports = plugin;
