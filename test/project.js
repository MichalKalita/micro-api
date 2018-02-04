import { Project } from '~/src'
import assert from 'assert'

describe('Project', function () {
    it('init', () => {
        new Project()
    });

    it('info request', () => {
        const p = new Project()
        assert.deepEqual(
            p.request({module: 'info', auth: {token: 'abc'}}),
            {msg: 'Hello :)'}
        )
    });
});