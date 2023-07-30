import {
    readFile,
    writeFile
} from 'node:fs/promises';

export default class HeroRespoity {
    constructor({
        file
    }) {
        this.file = file
    }

    //This function only can use inside of class Hero
    async #currenteFileContent() {
        return JSON.parse(await readFile(this.file))
    }

    find() {
        return this.#currenteFileContent()
    }

    async create(data) {
        const currentFile = await this.#currenteFileContent()
        currentFile.push(data)

        await writeFile(
            this.file,
            JSON.stringify(currentFile)
        )
        return data.id
    }

}

const heroRespoity = new HeroRespoity({
    file: './../database/data.json'
})

/*
console.log(
    await heroRespoity.create({
        id: 2,
        name: 'Chapolin'
    })
)

console.log(await heroRespoity.find())// é preciso usar await para ser resolvido o promise ,caso contrario apenas aparecia que estária pedente
*/