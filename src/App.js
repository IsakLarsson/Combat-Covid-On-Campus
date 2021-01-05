import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import heatdata from "./heatpoints_single.geojson";

const axios = require("axios");

function App() {
  useEffect(() => {
    const campusInfo = async () => {
      let response = await axios.get("http://localhost:1880/sensors");
      console.log(JSON.parse(response.data.replace(/&quot;/g, '"')));
      let parsedRespones = JSON.parse(response.data.replace(/&quot;/g, '"'));
      console.log(parsedRespones);
      var map = new window.Mazemap.Map({
        // container id specified in the HTML
        container: "map",

        campuses: 289, //UMEÅ CAMPUS ID 289

        // initial position in lngLat format
        center: { lng: 20.307517, lat: 63.819489 },

        // initial zoom
        zoom: 18,

        zLevel: 2,
      });

      map.on("load", () => {
        map.addSource("heatpoints", {
          type: "geojson",
          data: generateJson(parsedRespones),
        });

        map.addLayer({
          id: "heatpoints",
          type: "heatmap",
          source: "heatpoints",
          maxzoom: 24,
          paint: {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": 1,
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              16,
              0.2,
              22,
              1,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0,0,255,0)",
              0.2,
              "#1FAFFC",
              0.4,
              "#5BD76F",
              0.6,
              "#FFE61E",
              0.8,
              "#FF7B00",
              1,
              "#FF3333",
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              10,
              5,
              22,
              30,
            ],
            "heatmap-opacity": 0.8,
          },
        });
      });
      map.on("click", onMapClick);
    };
    campusInfo();
  }, []);

  const onMapClick = (e) => {
    var lngLat = e.lngLat;

    console.log(lngLat);
  };

  const generateJson = (parsedRespones) => {
    const coordinateArr = [
      { lng: 20.308349705835496, lat: 63.81900592551949 },
      { lng: 20.308192882367734, lat: 63.81900568662371 },
      { lng: 20.307978380978028, lat: 63.81900697599215 },
      { lng: 20.307055316506563, lat: 63.81906415884902 },
      { lng: 20.30706140226104, lat: 63.81923733767948 },
      { lng: 20.307065643789542, lat: 63.81931117656464 },
      { lng: 20.30707299349453, lat: 63.81950588172853 },
      { lng: 20.3070748958213, lat: 63.81956184331548 },
      { lng: 20.306956961518694, lat: 63.81952031622194 },
      { lng: 20.307181110854373, lat: 63.81968109837368 },
    ];

    let featureCollection = {};
    featureCollection.type = "FeatureCollection";
    featureCollection.features = [];

    coordinateArr.map((coord, i) => {
      if (parsedRespones.data[i] !== null) {
        for (let j = 0; j < parsedRespones.data[i].dd.pir; j++) {
          let latVariance = Math.random() * 0.000019;
          let longVariance = Math.random() * 0.000022;
          latVariance *= Math.round(Math.random()) ? 1 : -1;
          longVariance *= Math.round(Math.random()) ? 1 : -1;

          let feature = {};
          feature.geometry = {
            type: "Point",
            coordinates: [coord.lng + longVariance, coord.lat + latVariance],
          };
          featureCollection.features.push(feature);
        }
      }
    });

    // console.log(featureCollection);
    return featureCollection;
  };

  return (
    <div className="App">
      <div id="map" className="mazemap" style={{ width: "100%" }}></div>
    </div>
  );
}

export default App;
