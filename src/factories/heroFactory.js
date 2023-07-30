import HeroRespoity from "../repositores/heroRespository.js"
import HeroService from "../services/heroService.js"

const generateInstance = ({
    filePath
}) => {
    //hero goes all db conections 
    const heroRepository = new HeroRespoity({
        file: filePath
    })
    const heroService = new HeroService({
        heroRepository
    })
    return heroService

}

export {
    generateInstance
}