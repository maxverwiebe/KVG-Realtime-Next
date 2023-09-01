import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import {useRouter} from 'next/router';

const option = [
	{
		text: "Search",
		link: "/",
		aliasLink: "/station" // CHANGE IN FUTURE!!!
	},
	{
		text: "About",
		link: "/about",
		aliasLink: "/statio111n"
	},
]

export default function Home() {
	const router = useRouter()
  const [navbar, setNavbar] = useState(false);
  return (
    <div>
      <nav className="w-full bg-[#1c1c1c] shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-8xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <a href="/" class="flex items-center">
                <img src="https://www.freeiconspng.com/uploads/red-bus-icon-8.png" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-100">KVG Tracker</span>
            </a>
              
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
				{option.map((value, index) => (
					<li className={`text-white hover:text-red-500 transition duration-300 md:hover:underline underline-offset-4 ${(router.asPath === value.link || router.asPath.includes(value.aliasLink)) && "underline"}`}>
						<Link href={value.link}>
							<p>{value.text}</p>
						</Link>
					</li>
				))}
            </ul>

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}