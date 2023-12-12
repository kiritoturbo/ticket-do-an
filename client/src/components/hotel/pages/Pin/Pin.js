import React, { useEffect, useState } from "react";
import "./Pin.css";
import NavbarHotel from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import axios from "axios";
import { format } from "timeago.js";
import Map, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import { Room, Star, StarBorder } from "@mui/icons-material";
import Geocoder from "./Geocoder";

const Pin = () => {
  const myStorage = window.localStorage;
  const [currentUsername, setCurrentUsername] = useState(
    myStorage.getItem("user")
  );
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 47.040182,
    longitude: 17.071727,
    zoom: 4,
  });
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };

  const handleAddClick = (e) => {
    const { lat, lng } = e.lngLat;
    setNewPlace({
      lat: lat,
      long: lng,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    };

    try {
      const res = await axios.post("http://localhost:2020/pin", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("http://localhost:2020/pin");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleLogout = () => {
    setCurrentUsername(null);
    myStorage.removeItem("user");
  };
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NavbarHotel />
      <Header type="list" />
      <div className="w-full">
        <Map
          // {...viewport}
          initialViewState={{
            longitude: 105.83416,
            latitude: 21.027763,
            zoom: 14,
          }}
          touchZoomRotate
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          style={{ width: "100vw", height: "100vh" }}
          transitionDuration="200"
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(viewport) => setViewport(viewport)}
          onDblClick={currentUsername && handleAddClick}
        >
          <NavigationControl position="top-right" />
          {/* NavigationControl là nút cộng trừ để phóng to thu nhỏ  */}
          <GeolocateControl position="top-right" showUserLocation={true} auto />
          {/* GeolacateControl để lấy vị trí hiện tại 
          showUserLocation để hiển thị biểu tượng vị trí của người dùng và 
          auto để tự động lấy vị trí người dùng khi trang web được tải. */}
          <Geocoder />
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color:
                      currentUsername === p.username ? "tomato" : "slateblue",
                    cursor: "pointer",
                  }}
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor="left"
                >
                  <div className="cardPin">
                    <label>Place</label>
                    <h4 className="place">{p.title}</h4>
                    <label>Review</label>
                    <p className="desc">{p.desc}</p>
                    <label>Rating</label>
                    <div className="stars">
                      {Array(p.rating).fill(<Star className="star" />)}
                    </div>
                    <label>Information</label>
                    <span className="username">
                      Created by <b>{p.username}</b>
                    </span>
                    <span className="datePin">{format(p.createdAt)}</span>
                  </div>
                </Popup>
              )}
            </>
          ))}

          {newPlace && (
            <>
              <Marker
                latitude={newPlace.lat}
                longitude={newPlace.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <Room
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: "tomato",
                    cursor: "pointer",
                  }}
                />
              </Marker>
              <Popup
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewPlace(null)}
                anchor="left"
              >
                <div>
                  <form onSubmit={handleSubmit} className="formPin">
                    <label>Title</label>
                    <input
                      placeholder="Enter a title"
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                      placeholder="Say us something about this place."
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Rating</label>
                    <select onChange={(e) => setStar(e.target.value)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <button type="submit" className="submitButtonPin">
                      Add Pin
                    </button>
                  </form>
                </div>
              </Popup>
            </>
          )}
        </Map>
      </div>
    </div>
  );
};
export default Pin;
