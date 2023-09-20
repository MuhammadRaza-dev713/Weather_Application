'use client'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import axios from 'axios'
import {useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Spinner from "@/components/Spinner";
import Weather from "@/components/Weather";


const inter = Inter({subsets: ['latin']})

export default function Home() {

    const [city, setCity] = useState('')
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(false)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    const fetchWeather = (e) => {
        e.preventDefault()

        if (city === '') {
            return
        }
        setLoading(true)
        axios.get(url).then(({data}) => setWeather(data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
        // console.log(response.data)

        setCity('')
        // setLoading(false)
    }


    return (


        <div>
            {loading ? (<div className="h-1 w-full absolute top-0 z-20 bg-green-950">
                <div className="w-full border-l-[16rem] border-green-900 h-full animate-indefinite"/>
            </div>) : undefined}
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]"></div>
            <Image
                src="https://images.unsplash.com/photo-1527482937786-6608f6e14c15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80"
                layout='fill'
                alt='weatherImage'
                className="object-cover blur-sm"
            />
            <div
                className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
                <form onSubmit={fetchWeather}
                      className="flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-400 text-white rounded-2xl">
                    <div>
                        <input onChange={(e) => setCity(e.target.value)}
                               className="bg-transparent border-none text-white focus:outline-none text-2xl "
                               type="text"
                               placeholder="Search City"/>
                    </div>
                    <button onClick={fetchWeather}><BsSearch size={20}/></button>
                </form>
            </div>
            {weather.main && <Weather data={weather}/>}
        </div>
    )


}
