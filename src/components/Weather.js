'use client'
import Image from "next/image";

const Weather = ({ data }) => {
    console.log(data);

    return (
        <div className="relative flex flex-col items-center max-w-[500px] w-full mt-6 sm:mt-10 mx-auto  p-6 sm:p-8 text-gray-300 z-10 bg-white/20 backdrop-blur-lg rounded-2xl">
            {/* Weather Icon & Temperature */}
            <div className="relative flex flex-row justify-between items-center sm:items-start w-full text-center sm:text-left">
                <div className="flex flex-col items-center">
                    <Image
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
                        alt="weather icon"
                        width={100}
                        height={100}
                    />
                    <p className="text-2xl sm:text-4xl">{data.weather[0].main}</p>
                </div>
                <p className="text-7xl sm:text-9xl font-bold">
                    {((data.main.temp - 32) * 5 / 9).toFixed(0)}&#176;
                </p>
            </div>

            {/* Weather Details */}
            <div className="bg-black/50 w-full p-4 sm:p-8 rounded-md mt-6">
                <p className="text-2xl font-semibold text-center pb-4">Weather in {data.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                    <div>
                        <p className="font-bold text-2xl sm:text-3xl">{data.main.feels_like.toFixed(0)}&#176;</p>
                        <p className="text-lg">Feels Like</p>
                    </div>
                    <div>
                        <p className="font-bold text-2xl sm:text-3xl">{data.main.humidity}%</p>
                        <p className="text-lg">Humidity</p>
                    </div>
                    <div>
                        <p className="font-bold text-2xl sm:text-3xl">{data.wind.speed.toFixed(0)} <span className=" sm:text-xl"> MPH</span></p>
                        <p className="text-lg">Winds</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Weather;
