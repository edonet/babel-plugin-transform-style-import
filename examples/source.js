/**
 *****************************************
 * Created by edonet@163.com
 * Created on 2019-07-23 18:25:06
 *****************************************
 */
'use strict';

import './a.css';
import a from './a.scss?v=122';
import { use } from './a.less?v=122';
import { use as u } from './u.js?./a.less?v=122';
import * as a1 from './a.scss?v=122';

import('./b.css');

export default async () => {
    const b = import('./a.scss');
    const { use } = await import('./b.less');

    import('./b.sass?use').then((style) => style);
    import('./b.sass').then(({ use }) => use);

    return { b, use, a1, u };
};

require('./c.css');
const c = require('./c.scss');
const { use: u3 } = require('./c.less');

export * from './d.css';
export { use } from './d.scss';
export { use as u2 } from './d.scss';
export { default as u4 } from './d.scss';
export { a, use as u1, c, u3 };
