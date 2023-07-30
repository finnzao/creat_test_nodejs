import { once } from 'node:events'
import Hero from '../entities/hero.js';
import { DEFAULT_HEADER } from '../util/util.js';
const routes = ({
    heroService
}) => ({
    '/heroes:get': async (request, response) => {
        const heroes = await heroService.find()
        response.write(JSON.stringify({
            result: heroes
        }));
        return response.end()
    },

    '/heroes:post': async (request, response) => {
        const data = await once(request, 'data')
        const item = JSON.parse(data)
        const hero = new Hero(item)

        const id = await heroService.create(hero)
        response.writeHead(201, DEFAULT_HEADER)
        response.write(JSON.stringify({ id, sucess: 'User created with sucess' }));
        return response.end()
    }

})


export {
    routes
}
