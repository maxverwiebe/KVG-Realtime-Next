import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Cookies from 'js-cookie';
import Link from 'next/link';

function calculateDelay(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
  
    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
  
    const delayInMinutes = endTotalMinutes - startTotalMinutes;
  
    return delayInMinutes;
}

function Page({ stationId }) {
  const router = useRouter();

  const [cookieSet, setCookieSet] = useState(false);
  const [liveStationData, setLiveStationData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(0);

  function getLastUpdate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  }

  const pullData = async () => {
    console.log("Request")
    const apiEndpoint = window.location.origin + '/api/getstopinfo?id=' + stationId;

    try {
      const response = await fetch(apiEndpoint);
      const apiData = await response.json();

      setLastUpdate(Math.floor(Date.now() / 1000));
      setLiveStationData(apiData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    const isCookieSet = Cookies.get(stationId) ? true : false;
    setCookieSet(isCookieSet);

    pullData()
    const interval = setInterval(() => {
      pullData();
    }, 1000 * 30)
    return () => clearInterval(interval)
  }, []);

  const handleCookieClick = () => {
    if (Cookies.get(liveStationData.stopShortName)) {
      Cookies.remove(liveStationData.stopShortName);
      setCookieSet(false);
      console.log("Cookie found, let's remove it! " + liveStationData.stopShortName);
    } else {
      Cookies.set(liveStationData.stopShortName, true);
      setCookieSet(true);
      console.log("Cookie not found, let's add it! " + liveStationData.stopShortName);
    }
  };

  return (
    <div>
      <div className="lg:mx-auto lg:container p-4 border border-gray-500 rounded-lg shadow-lg bg-[#333333] m-2"> 
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-gray-200">{liveStationData.stopName}</h2>
          <button class="ml-auto" onClick={handleCookieClick}>
              {cookieSet ?
                <svg class="w-6 h-6 text-yellow-500 hover:text-yellow-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg> 
                :
                <svg class="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"/>
                </svg>
              }
          </button>
        </div>
        <div className="flex mt-3 flex-wrap">
          {liveStationData && liveStationData.routes && liveStationData.routes.map((route, index) =>   (
            <span
              key={index}
              className="bg-[#2D2C2D] text-[#FFCDD2] text-xs font-medium m-1 px-2.5 py-0.5 rounded border border-gray-500"
            >
              {route.shortName}
            </span>
          ))}
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0"/>
        
        <div class="flex flex-wrap">
        <div className="flex-none w-full h-14 h-full overflow-auto m-1">
        <div class="flex items-center">
        <h3 class="text-2xl font-semibold text-gray-300">Departures</h3>
        <span class="flex ml-2 mt-0.5 font-medium items-center rounded-br rounded-tl text-red-300 text-xs">
          <span class="h-2 w-2 flex mr-1.5">
            <span class="absolute inline-flex animate-ping bg-red-400 h-2 opacity-75 rounded-full w-2"></span>
            <span class="relative inline-flex bg-red-500 h-2 rounded-full w-2"></span>
          </span>
          Live
        </span>
        <button class="ml-auto text-gray-400 hover:text-gray-200 transition-all" onClick={pullData}>
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
          </svg>
        </button>
      </div>

          
            {liveStationData && liveStationData.actual && liveStationData.actual.map((trip, index) => (
                <div className="rounded-lg shadow-lg p-2 bg-[#383838] my-2" key={index}>
                <div className="flex items-center justify-between"> {/* Hier wird die rechtsbündige Ausrichtung erreicht */}
                  <div
                    key={index}
                    className="bg-[#2D2C2D] text-[#FFCDD2] text-xs font-medium m-1 px-2.5 py-0.5 rounded-full border-red-400"
                    style={{ width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    {trip.patternText}
                  </div>
                  <div className="flex-grow">
                    <Link href={`/trip/${trip.tripId}`} className="ml-2 text-gray-300">{trip.direction}</Link>
                  </div>
                <span
                    key={index}
                    className="bg-[#2D2C2D] text-[#FFCDD2] text-xs font-medium rounded border-red-400 flex"
                    >
                    <p className="text-right text-gray-300 m-1">{trip.plannedTime}</p>
                    {trip.actualTime && calculateDelay(trip.plannedTime, trip.actualTime) > 0 && (
                        <p className={`text-right text-gray-300 pl-1 m-1 ${
                            calculateDelay(trip.plannedTime, trip.actualTime) > 4 ? 'text-red-600' : 'text-orange-500'
                          }`}>
                        +{calculateDelay(trip.plannedTime, trip.actualTime)}min
                        </p>
                    )}
                </span>


                </div>
              </div>
              
            ))}

              <div class="bg-[#383838] rounded-lg shadow p-2 sticky">
                <p class="ml-1 text-gray-500">Last re-fetch: {getLastUpdate(lastUpdate)}</p>
              </div>
            </div>
          {/*
          <div class="flex-initial w-1/3">
            <h3 className="text-2xl font-semibold text-gray-300">Information</h3>

          </div>
          <div class="flex-initial w-32 ...">
            <h3 className="text-2xl font-semibold text-gray-300">Map</h3>


          </div>
          */}
        </div>

      </div>
    </div>
  );
}

/* export async function getServerSideProps(context) {
  const apiEndpoint = 'http://localhost:3001/stations/get_info/id/' + context.query.id;
  const headers = {
    'X-API-KEY': 'AAN-2D9-ZFV-23O-8SH',
  };

  try {
    const response = await fetch(apiEndpoint, { headers });
    const apiData = await response.json();

    return {
      props: {
        apiData,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {},
    };
  }
} */

// We are using getServerSideProps to get the id, because the router object might be undefined in the page component if we - for example - reload the page.
// We dont need it for data fetching, cuz we set up an interval-controlled query in the UI / Page component.
export async function getServerSideProps({ params }) {
  const stationId = params.id;

  return {
    props: { stationId },
  };
}

export default Page;
