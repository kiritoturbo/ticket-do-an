import "../App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import * as ttapi from "@tomtom-international/web-sdk-services";
import { useState, useEffect, useRef } from "react";
import Search from "../components/search";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { removeAllMarkers, storeDistanceTime } from "../redux/actions";
import { removeAllMarkers, storeDistanceTime } from "../../../actions";
const APIKEY = process.env.REACT_APP_APIKEY;
console.log(APIKEY);
function Map() {
  const mapElem = useRef();
  const [lat, setLat] = useState(27.333);
  const [lon, setLon] = useState(27.333);
  const [zoom, setZoom] = useState(2);
  const [map, setMap] = useState({});
  const [distance, setDistance] = useState();
  const [show, setShow] = useState(false);
  let enable = false;
  const convertToValidLatitude = (lon) => {
    return ((lon + 180) % 360) - 180;
  };

  const convertToValidLongitude = (lat) => {
    return ((lat + 90) % 180) - 90;
  };
  const dispatch = useDispatch();
  const getCurrentLocation = (position) => {
    console.log(position);
    const receivedLat = position.coords.latitude;
    const receivedLon = position.coords.longitude;

    // Chuyển đổi giá trị nếu cần thiết
    const validLat = convertToValidLatitude(receivedLat);
    const validLon = convertToValidLongitude(receivedLon);

    setLat(validLat);
    setLon(validLon);
    loadMap(validLat, validLon);
  };
  const errLoc = () => {
    loadMap(lat, lon);
  };

  useEffect(() => {
    dispatch(removeAllMarkers());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCurrentLocation, errLoc, {
        enableHighAccuracy: true,
      });
    }
  }, []);

  const loadMap = (lati, long) => {
    // Chuyển đổi giá trị nếu cần thiết
    const validLat = convertToValidLatitude(lati);
    const validLon = convertToValidLongitude(long);

    let map = tt.map({
      key: APIKEY,
      container: mapElem.current,
      center: [validLat, validLon],
      zoom: zoom,
    });
    setMap(map);
    return () => map.remove();
  };

  const { allMarkers, markerDetails, pricePerKm } = useSelector(
    (state) => state.mapReducer
  );

  const displayRoute = (loc) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
    }
    if (map.getSource("route")) {
      map.removeSource("route");
    }
    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: loc,
      },
      paint: {
        "line-color": "blueviolet",
        "line-width": 4,
      },
    });
    setShow(true);
  };
  if (allMarkers !== undefined && allMarkers.length === 2) {
    enable = true;
  }
  const getRoute = (e) => {
    let options = {
      key: APIKEY,
      locations: [],
    };
    e.preventDefault();
    if (allMarkers.length > 0) {
      allMarkers.map((marker) => {
        options.locations.push(marker.marker.getLngLat());
      });

      ttapi.services.calculateRoute(options).then((res) => {
        setDistance(res.routes[0].summary.lengthInMeters / 1000);
        let loc = res.toGeoJson();
        dispatch(
          storeDistanceTime(
            res.routes[0].summary.lengthInMeters / 1000,
            res.routes[0].summary.travelTimeInSeconds / 60
          )
        );
        displayRoute(loc);
      });
    }
  };

  return (
    <div className="mapContainer">
      <div className="sidePanel">
        <p className="head">Have a great ride</p>
        <div className="inpContainer">
          <Search placeholder="Pickup point" map={map} type={"start"} />
          <Search placeholder="Dropoff point" map={map} type={"end"} />
          <button
            onClick={(e) => getRoute(e)}
            data-state={enable}
            className="btn"
          >
            Search
          </button>
        </div>
        <div className="sideComponent">
          {show ? (
            <>
              <div className="extraDetails">
                <div className="item">
                  <ion-icon
                    name="star"
                    style={{ fontSize: 15, color: "rgb(128, 128, 128)" }}
                  ></ion-icon>
                  <div className="details">
                    <p className="place">{markerDetails[0]?.result.p1}</p>
                    <p className="sub">{markerDetails[0]?.result.p2}</p>
                  </div>
                </div>
                {markerDetails?.length == 2 ? <div className="line" /> : null}
                {markerDetails[1] != undefined ? (
                  <div className="item">
                    <ion-icon
                      name="star"
                      style={{ fontSize: 15, color: "rgb(128, 128, 128)" }}
                    ></ion-icon>
                    <div className="details">
                      <p className="place">{markerDetails[1]?.result.p1}</p>
                      <p className="sub">{markerDetails[1]?.result.p2}</p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="extraDetails">
                <p className="priceDetails">
                  <span className="med">Distance:</span> {distance}{" "}
                  <span className="small">Km</span>
                </p>
                <p className="priceDetails">
                  <span className="med">Average Price:</span> {pricePerKm}{" "}
                  <span className="small">per Km</span>
                </p>
                <p className="priceDetails">
                  <span className="med">Total Price:</span>{" "}
                  {distance * pricePerKm}
                </p>
              </div>
              <Link to="/car/cabs">
                <button className="secondaryBtn">Select Cab</button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <div ref={mapElem} className="map"></div>
    </div>
  );
}

export default Map;
