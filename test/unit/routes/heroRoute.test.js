import test from 'node:test';
import assert from 'node:assert';
const callTracker = new assert.CallTracker()
process.on('exit', () => callTracker.verify())


import {
    routes
} from './../../../src/routes/heroRoute.js';
import { DEFAULT_HEADER } from '../../../src/util/util.js';

test('Hero routes -endpoints test suite', async (t) => {
    await t.todo('it should  call /heroes:get routes', async () => {
        const databaseMock = [{
            "id": "90bf3131-c9fb-4560a",
            "name": "Batman",
            "age": 50,
            "power": "rich"
        }]

        const heroServiceStub = {
            find: async () => databaseMock
        }

        const endpoints = routes({
            heroService: heroServiceStub
        })
        const endpoint = '/heroes:get';
        const request = {}
        const response = {
            write: callTracker.calls(item => {
                const expected = JSON.stringify({
                    results: databaseMock
                })
                //validação
                assert.strictEqual(
                    item,
                    expected,
                    'write should be called with the correct payload'
                )
            }),
            end: callTracker.calls(item => {
                assert.strictEqual(
                    item,
                    undefined,
                    'end should be  called without params'
                )
            })
        }
        const route = endpoints[endpoint]
        await route(request, response);
    })


    await t.todo('it should  call /heroes:post routes')
})