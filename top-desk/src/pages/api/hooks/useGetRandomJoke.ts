import {useCallback, useEffect, useState} from "react";

import {JokeModel} from "@/pages/api/model/JokeModel";
import JokeController from "@/pages/api/api/JokeController";

interface JokeProps {
    enable: boolean
}

const UseGetRandomJoke = ({enable}: JokeProps) => {
    const [data, setData] = useState<JokeModel>()
    const [error, setError] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const jokeService = await JokeController()
            setData(jokeService.data)
        } catch {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (enable) {
            fetchData().then()
        }
    }, [enable])

    return {data, error, loading, fetchData}
}

export default UseGetRandomJoke