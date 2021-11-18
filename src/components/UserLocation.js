import React, { useState } from 'react'

function UserLocation() {


    const [ulon, setUlon] = useState();
    const [ulat, setUlat] = useState();



    const successCallback = async function (position) {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        console.log(lon, lat)
        setUlon(lon);
        setUlat(lat);


    }

    const failureCallback = () => {
        console.log('failed')
    }


    const getUserLocation = () => {
        window.navigator.geolocation
            .getCurrentPosition(successCallback, failureCallback, { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
        console.log('done')

    }


    return (
        <div>
            <div className='flex '>
                <button type="button" onClick={() => getUserLocation()} className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                    Send Location
                </button>
            </div>

        </div>
    )
}

export default UserLocation
