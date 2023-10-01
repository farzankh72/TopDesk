import axios from "axios";

const CountryController = async () => {
    const URL_GET_COUNTRY: string = 'https://restcountries.com/v3.1/all'

    const fetchData = await axios.get(URL_GET_COUNTRY).then((resp) => resp.data as Array<CountryModel>).catch(error => error)

    return fetchData
}

export default CountryController