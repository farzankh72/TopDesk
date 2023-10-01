import {useCallback, useEffect, useState} from "react";
import CountryController from "@/pages/api/api/CountryController";

const UseGetCountry = () => {
    const [data, setData] = useState<Array<CountryModel>>()
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = useCallback(async () => {
            const randomItems: Array<CountryModel> = []
            const hasIndex = new Set()
            try {
                setLoading(true)
                const countryService = await CountryController()
                const countries = countryService.data as Array<CountryModel>;

                while (randomItems.length < 20) {
                    const randomIndex = Math.floor(Math.random() * countries.length)
                    if (!hasIndex.has(randomIndex)) {
                        hasIndex.add(randomIndex)
                        randomItems.push(countries[randomIndex])
                    }
                }
                setData(randomItems)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }, []
    )

    useEffect(() => {
        fetchData().then()
    }, [])

    return {data, loading, error, fetchData}
}

export default UseGetCountry