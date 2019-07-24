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
import st, { use as u7 } from './a.less?v=122';
import { use as u6 } from './a.less?v=122';
import { use as u } from './u.js?./a.less?v=122';
import * as a1 from './a.scss?v=122';

import('./b.css');

export default async () => {
    const b = import('./b.scss');
    const ab = await import('./b.css');
    const { default: def } = await import('./b.less');
    const { use } = await import('./b.less');
    const cb = ({ use }) => use;

    await import('./b.css');
    cb(await import('./b.less'));

    import('./b.sass?use').then((style) => style);
    import('./b.sass').then(({ use }) => use);
    import('./b.less').then(function ({ use }) { return use; });
    import('./b.scss').then(function () { return use; });
    import('./b.css').then(cb);

    return { b, ab, def, use, a1, u };
};

require('./c.css');
const c = require('./c.scss');
const { use: u3 } = require('./c.less');
const u5 = require('./c.scss').use;

export * from './d.css';
export { use } from './d.scss';
export { use as u2 } from './d.scss';
export { default as u4 } from './d.scss';
export { a, use as u1, c, u3, u5, st, u6, u7 };
