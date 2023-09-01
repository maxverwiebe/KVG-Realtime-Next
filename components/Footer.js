export default function Footer() {
    return (
        <footer className="bg-[#1c1c1c] rounded-lg shadow m-4  sticky top-[100vh]">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between flex-grow">
                <span className="text-sm text-gray-400 sm:text-center dark:text-gray-400">© <a href="https://github.com/maxverwiebe" className="hover:underline">Maximilian Verwiebe</a>. All Rights Reserved.</span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                    <li><a href="#" className="mr-4 hover:underline md:mr-6 ">About</a></li>
                    <li><a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a></li>
                    <li><a href="#" className="mr-4 hover:underline md:mr-6">Licensing</a></li>
                </ul>
            </div>
        </footer>
    );
}
