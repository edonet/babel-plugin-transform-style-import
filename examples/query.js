/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 16:47:37
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const { matchQuery } = require('../helpers/match');


/**
 *****************************************
 * 校验字符
 *****************************************
 */
module.exports = () => {
    console.log(matchQuery('') === null);
    console.log(matchQuery('?') === null);
    console.log(matchQuery('?module')[1] === undefined);
    console.log(matchQuery('?module&')[1] === undefined);
    console.log(matchQuery('?&module=&')[1] === '');
    console.log(matchQuery('?modules=&') === null);
    console.log(matchQuery('?&module=abc&')[1] === 'abc');
    console.log(matchQuery('?module=style')[1] === 'style');
    console.log(matchQuery('?modul=styled') === null);
    console.log(matchQuery('?module=styled&')[1] === 'styled');
    console.log(matchQuery('?abc&module=styled&')[1] === 'styled');
};
