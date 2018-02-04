import { Project } from '~/src'
import assert from 'assert'

describe('Project', function () {
    it('init', () => {
        new Project()
    });

    it('add simple ping module', () => {
        const p = new Project()
        p.addModule('ping', () => ({msg: 'pong'}))

        assert.deepEqual(
            p.request({module: 'ping'}),
            {msg: 'pong'}
        )
    })
});