export default class SwapiService {
    _apiBase = 'https://swapi.dev/api';
    _imageBase = 'https://starwars-visualguide.com/assets/img'

    getResources = async (url) => {
        try {
            const res = await fetch(`${this._apiBase}${url}`);

            if (!res.ok) {
                throw new Error('Response Error')
            }

            return await res.json();

        } catch (err) {
            console.log('Ошибка: ' + err.message)
        }
    }

    getAllPeople = async () => {
        const res = await this.getResources('/people/')
        return res.results
    }

    getPerson = async (id) => {
        const res = await this.getResources(`/people/${id}`)
        return res
    }

    getAllPlanets = async () => {
        const res = await this.getResources('/planets/')
        return res.results
    }

    getPlanet = async (id) => {
        const res = await this.getResources(`/planets/${id}`)
        return res
    }

    getAllStarships = async () => {
        const res = await this.getResources('/starships/')
        return res.results
    }

    getStarship = async (id) => {
        const res = await this.getResources(`/starships/${id}`)
        return res
    }

    getPersonImage = (id) => {
        return `${this._imageBase}/characters/${id}.jpg`
    }

    getPlanetImage = (id) => {
        return `${this._imageBase}/planets/${id}.jpg`
    }

    getStarshipImage = (id) => {
        return `${this._imageBase}/starships/${id}.jpg`
    }
}