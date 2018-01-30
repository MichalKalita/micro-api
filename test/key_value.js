import { KeyValue } from '~/src'
import assert from 'assert'

describe('Key Value', function () {
    it('get', () => {
        const KV = new KeyValue()

        KV.set('a', 1)
    });

    it('set', () => {
        const KV = new KeyValue()

        KV.set('a', 1)

        assert.equal(KV.get('a'), 1);
        assert.equal(KV.get('b'), undefined);
    })

    it('delete', () => {
        const KV = new KeyValue()

        KV.set('a', 1)

        assert.equal(KV.delete('a'), true);
        assert.equal(KV.delete('a'), false);
        assert.equal(KV.delete('b'), false);
    })
});