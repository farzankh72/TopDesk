import axios from "axios";

const JokeController = () => {
    const JOKE_URL: string = 'https://api.chucknorris.io/jokes/random'
    return axios.get(JOKE_URL)
}

export default JokeController