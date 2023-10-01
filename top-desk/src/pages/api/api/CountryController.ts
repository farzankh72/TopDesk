import axios from "axios";

const URL_GET_COUNTRY: string = 'https://restcountries.com/v3.1/all'

const CountryController = async () => {
    return await axios.get(URL_GET_COUNTRY)
}

export default CountryController