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
const assert = require('assert');
const { matchQuery } = require('../helpers/match');


/**
 *****************************************
 * 校验字符
 *****************************************
 */
module.exports = () => {
    assert.strictEqual(matchQuery(''), null);
    assert.strictEqual(matchQuery('?'), null);
    assert.strictEqual(matchQuery('?module')[1], undefined);
    assert.strictEqual(matchQuery('?module&')[1], undefined);
    assert.strictEqual(matchQuery('?&module=&')[1], '');
    assert.strictEqual(matchQuery('?modules=&'), null);
    assert.strictEqual(matchQuery('?&module=abc&')[1], 'abc');
    assert.strictEqual(matchQuery('?module=style')[1], 'style');
    assert.strictEqual(matchQuery('?modul=styled'), null);
    assert.strictEqual(matchQuery('?module=styled&')[1], 'styled');
    assert.strictEqual(matchQuery('?abc&module=styled&')[1], 'styled');
};
