import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Cookie() {
    const cookieAcceptedClick = () => {
        Cookies.set("COOKIES_DISCLAIMER_ACCEPTED", true);
    }

    useEffect(() => {
        if (!Cookies.get("COOKIES_DISCLAIMER_ACCEPTED")) {
            return (
                <div className="flex justify-between items-center gap-2 bg-[#363535] px-4 py-2 fixed bottom-0 left-0 w-full">
                    <p className="text-sm text-gray-200">
                        We use cookies to ensure you get the best experience on our website. Learn more
                        <a href="#" className="underline">here</a>.
                    </p>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            cookieAcceptedClick()
                        }}
                    >
                        Got it
                    </button>
                </div>
            );
        }
    }, []);

    return null;
}
