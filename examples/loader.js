/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-24 17:48:35
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
const assert = require('assert');
const loader = require('../loader');


/**
 *****************************************
 * 测试实例
 *****************************************
 */
module.exports = () => {
    let styled = (ob, code, result) => {
            assert.strictEqual(loader.call(ob, code).indexOf('@airb/style/styled.js') !== -1, result);
        };

    // 校验结果
    styled({}, 'module.exports = {}', false);
    styled({ query: { styled: 0 }}, 'module.exports = {}', false);
    styled({ query: { styled: 1 }}, '', false);
    styled({ query: { styled: 1 }}, 'module.exports = {}', true);
    styled({ query: '?module=styled&' }, 'module.exports = {}', false);
    styled({ resourceQuery: '' }, 'module.exports = {}', false);
    styled({ resourceQuery: '?module' }, 'module.exports = {}', false);
    styled({ resourceQuery: '?module=' }, 'module.exports = {}', false);
    styled({ resourceQuery: '?module=abc' }, 'module.exports = {}', false);
    styled({ resourceQuery: '?module=styled' }, '', false);
    styled({ resourceQuery: '?module=styled' }, 'module.exports = {}', true);
    styled({ resourceQuery: '?module=styled&' }, 'module.exports = {}', true);
    styled({ resourceQuery: '', query: { styled: 0 } }, 'module.exports = {}', false);
    styled({ resourceQuery: '', query: { styled: 1 } }, 'module.exports = {}', true);
    styled({ resourceQuery: '?module=styled', query: { styled: 0 } }, 'module.exports = {}', true);
};
