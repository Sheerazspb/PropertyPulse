"use client";
import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import pin from "../assets/images/pin.svg";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "500px",
    latitude: 0,
    longitude: 0,
    zoom: 14,
  });

  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  useEffect(() => {
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY || "",
      language: "en",
      region: "us",
    });
    const fetchCoordinates = async () => {
      try {
        const response = await fromAddress(
          `${property.location.street}, ${property.location.city}, ${property.location.state} ${property.location.zipcode}`
        );
        if (!response.results.length) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = response.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport((prevViewport) => ({
          ...prevViewport,
          latitude: lat,
          longitude: lng,
        }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [property]);

  if (loading) return <Spinner />;
  if (geocodeError) return <h3>Unable to fetch coordinates</h3>;

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ""}
        initialViewState={viewport}
        style={{ width: viewport.width, height: viewport.height }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {lat && lng && (
          <Marker latitude={lat} longitude={lng} anchor="bottom">
            <Image src={pin} width={40} height={40} alt="location" />
          </Marker>
        )}
      </Map>
    )
  );
};

export default PropertyMap;
