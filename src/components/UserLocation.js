import React, { useState, useEffect, useCallback } from "react";

import { connect, JSONCodec } from "../../node_modules/nats.ws/lib/src/mod.js";

const jc = JSONCodec();

function UserLocation() {
  const [ulon, setUlon] = useState();
  const [ulat, setUlat] = useState();

  const [natsConnection, setConnection] = useState(undefined);
  const [lastError, setError] = useState(undefined);

  const connectToNats = useCallback(async () => {
    try {
      const connection = await connect({
        // servers: ["ws://192.168.29.195:9090"],
        servers: ["nats://demo.nats.io:4222"],
        json: true,
      });
      console.log(connection);
      setConnection(connection);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }, []);

  useEffect(() => {
    if (natsConnection) return;
    connectToNats();
    return () => {
      natsConnection?.drain();
    };
  }, [connectToNats, natsConnection]);

  const successCallback = async function (position) {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    // setUlon(lon);
    // setUlat(lat);
    natsConnection.publish(
      "students.locations",
      jc.encode({
        msg: {
          latitude: lat,
          longitude: lon,
        },
      })
    );
  };

  const failureCallback = () => {
    setError("failed");
  };

  const getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      successCallback,
      failureCallback,
      { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true }
    );
    console.log("done");
  };

  return (
    <div>
      <div className="flex">
        <button
          type="button"
          onClick={() => getUserLocation()}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
          </svg>
          Send Location
        </button>
      </div>
    </div>
  );
}

export default UserLocation;
