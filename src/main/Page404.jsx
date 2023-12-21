import React from 'react'
import Header from './header'
import Footer from './footer'
import { Link } from 'react-router-dom';

function Page404() {
    return (
        <div className='bg-blue-100 w-screen h-3/4 text-center'>
          <Header />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <h1 className="text-2xl text-blue-800 mb-6 tracking-wide">ERROR PAGE</h1>

            <img src='image/404_Asset-5.png 'className='w-85 h-60 mb-8'></img>
            <h1 className="text-4xl font-medium py-8">Oops! Page not found</h1>
            <p className="text-1xl pb-2 px-6 font-medium">The page you are looking for does not exist. It might have been moved or deleted.</p>
            <Link to="/" className="btn bg-white text-black hover:bg-blue-200 hover:text-black">Back to Homepage</Link>
          </div>
          <Footer />
        </div>
      );
      
}

export default Page404
