//import Layout from '../components/layout'
import '../styles/stylesglobals.css'
import Navbar from '../components/Navbar';
import Footer from '@/components/Footer';
import Cookie from '@/components/CookieConsent';

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-[#262525] min-h-screen'>
      <Navbar />
        <Component {...pageProps} />
      <Footer />
      <div><Cookie/></div>
    </div>
  )
}

export default MyApp