'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Spinner from "@/components/Spinner";
import Weather from "@/components/Weather";
import { useRouter } from "next/navigation";
import { error } from "next/dist/build/output/log";
import bg from "../assets/bgphoto.avif"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(false)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
    const fetchWeather = (e) => {
        e.preventDefault()
        if (city === '') return;

        setLoading(true)
        axios.get(url).then(({ data }) => setWeather(data))
            .catch((e) => console.log(e))
            .finally(() => setLoading(false))
    }

    const router = useRouter()
    useEffect(() => {
        router.push(`?city=${city}`, { scroll: false })
    }, [city, router]);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center pb-[2rem]">
            {loading && (
                <div className="h-1 w-full absolute top-0 z-20 bg-green-950">
                    <div className="w-full border-l-[16rem] border-green-900 h-full animate-indefinite" />
                </div>
            )}

            {/* Background Image & Overlay */}
            <div className="absolute inset-0 h-auto w-full">
                <Image
                    src={bg}
                    layout="fill"
                    objectFit="cover"
                    alt="Weather Background"
                    className="blur-sm"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Header */}
            <div className="relative flex flex-col sm:flex-row justify-between items-center w-full py-5 px-4 sm:px-8 text-white z-10 gap-4 sm:gap-0">
                <h1 className="text-3xl text-white text-center sm:text-left">CloudSync</h1>

                {/* Search Form */}
                <form 
                    onSubmit={fetchWeather}
                    className="w-full sm:w-auto min-w-[400px] flex items-center bg-white/20 border border-gray-300 backdrop-blur-lg rounded-2xl px-4 py-2"
                >
                    <input 
                        onChange={(e) => setCity(e.target.value)}
                        className="bg-transparent border-none text-white focus:outline-none text-lg flex-grow placeholder-gray-200"
                        type="text"
                        placeholder="Search City"
                    />
                    <button type="submit" className="p-2 rounded-full hover:bg-white/30 transition">
                        <BsSearch size={24} className="text-white" />
                    </button>
                </form>

                <h1 className="text-white text-2xl font-semibold cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-gray-300 text-center sm:text-right">
                    Sign In
                </h1>
            </div>

            {/* Weather Component */}
            {weather.main && <Weather data={weather} />}
        </div>
    )
}
