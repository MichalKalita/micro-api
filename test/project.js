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

    it('before request', () => {
        const p = new Project()
        p.beforeRequest(() => {throw Error('Error in before request')})

        assert.throws(
            () => p.request(),
            /Error in before request/
        )
    })
});