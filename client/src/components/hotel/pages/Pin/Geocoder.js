import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Marker, useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useState } from "react";
import { Room } from "@mui/icons-material";

const Geocoder = () => {
  const [markerCoordinates, setMarkerCoordinates] = useState(null);
  const handleResult = (e) => {
    const coords = e.result.geometry.coordinates;
    setMarkerCoordinates({
      latitude: coords[1],
      longitude: coords[0],
    });
  };

  const clearMarker = () => {
    setMarkerCoordinates(null);
  };
  const ctrl = new MapBoxGeocoder({
    accessToken: process.env.REACT_APP_MAPBOX,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  //   ctrl.on("result", (e) => {
  //     const coords = e.result.geometry.coordinates;
  //   });
  ctrl.on("result", handleResult);
  return (
    <>
      {markerCoordinates && (
        <Marker
          latitude={markerCoordinates.latitude}
          longitude={markerCoordinates.longitude}
        >
          <Room style={{ cursor: "pointer", color: "red", fontSize: "35px" }} />
        </Marker>
      )}
    </>
  );
};

export default Geocoder;
