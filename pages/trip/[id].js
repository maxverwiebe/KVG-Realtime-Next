import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';

function Page({tripId}) {
    const router = useRouter()
    const [stopList, setStopList] = useState([]);
    const [liveTripData, setLiveTripData] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(0);

    function getLastUpdate(unixTimestamp) {
      const date = new Date(unixTimestamp * 1000);
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      
      return `${hours}:${minutes}:${seconds}`;
    }

    const pullData = async () => {
      const apiEndpoint = 'http://localhost:3000/api/gettripinfo?id=' + tripId;
      const headers = {
        'X-API-KEY': 'AAN-2D9-ZFV-23O-8SH',
      };
  
      try {
        const response = await fetch(apiEndpoint);
        const apiData = await response.json();
  
        setLastUpdate(Math.floor(Date.now() / 1000));
        setLiveTripData(apiData);
        let tStopList = []

        {apiData.old.map((value, index) => (
            tStopList.push(value)
        ))}

        {apiData.actual.map((value, index) => (
            tStopList.push(value)
        ))}

        setStopList(tStopList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    useEffect(() => {
        pullData();
        const interval = setInterval(() => {
          pullData();
        }, 1000 * 10)
        return () => clearInterval(interval)
  }, []);

    return (
        <div>
          <div className="lg:mx-auto lg:container p-4 border border-gray-500 rounded-lg shadow-lg bg-[#333333] m-2"> 
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-200">{tripId} {liveTripData.directionText}</h2>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0"/>
            
            <div class="flex flex-wrap">
            <div className="flex-none w-1/2 h-14 h-full overflow-auto m-1">
              <div class="flex items-center">
                  <h3 className="text-2xl font-semibold text-gray-300">Departures</h3>
                  <span class="flex ml-2 mt-0.5 font-medium items-center rounded-br rounded-tl text-red-300 text-xs">
                    <span class="h-2 w-2 flex mr-1.5">
                      <span class="absolute inline-flex animate-ping bg-red-400 h-2 opacity-75 rounded-full w-2"></span>
                      <span class="relative inline-flex bg-red-500 h-2 rounded-full w-2"></span>
                    </span>
                    Live
                  </span>
                </div>
                    
                <ol class="relative m-3 text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    {stopList.map((value, index) => (
                        <li class="mb-5 ml-6 text-gray-300">
                            {console.log(value.status == "DEPARTED" ? 'bg-green-200' : 'bg-gray-100')}       
                            <span class={`absolute flex items-center justify-center w-4 h-4 ${
                                value.status == "DEPARTED" ? 'bg-[#67bd4d]' : 'bg-gray-700'
                            } rounded-full -left-2 ring-4 ring-[#383838] dark:ring-gray-900 dark:bg-green-900`}>
                                <svg class="w-3.5 h-1.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                                </svg>
                            </span>
                            {stopList[index-1] && stopList[index-1].status === "DEPARTED" && value.status === "PREDICTED" && (
                              <span class="bg-[#404040] text-yellow-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-yellow-400">On the way</span>
                            )}
                            {value.status === "STOPPING" && (
                              <span class="bg-[#404040] text-red-400 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-red-400">Stopped</span>
                            )}
                            <h3 class="font-medium leading-tight">{value.stop.name}</h3>
                            <p class="text-sm">{value.actualTime}</p>
                        </li>
                    ))}                  
                </ol>

                <div class="bg-[#383838] rounded-lg shadow p-2 sticky">
                  <p class="ml-1 text-gray-500">Last re-fetch: {getLastUpdate(lastUpdate)}</p>
                </div>

            </div>
    
            </div>
    
          </div>
        </div>
      );
}

// We are using getServerSideProps to get the id, because the router object might be undefined in the page component if we - for example - reload the page.
// We dont need it for data fetching, cuz we set up an interval-controlled query in the UI / Page component.
export async function getServerSideProps({ params }) {
  const tripId = params.id;

  return {
    props: { tripId },
  };
}

export default Page;