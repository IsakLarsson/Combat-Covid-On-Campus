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

      var map = new window.Mazemap.Map({
        // container id specified in the HTML
        container: "map",

        campuses: 289, //UMEÅ CAMPUS ID 289

        // initial position in lngLat format
        center: { lng: 20.307517, lat: 63.819489 },

        // initial zoom
        zoom: 18,

        zLevel: 3,
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
    };
    campusInfo();
  }, []);

  const generateJson = (parsedRespones) => {
    let startLat = 20.30711;
    let startLong = 63.820009;

    let featureCollection = {};
    featureCollection.type = "FeatureCollection";
    featureCollection.features = [];

    for (let i = 0; i < parsedRespones.data.length; i++) {
      startLong = startLong - 0.00002;

      for (let j = 0; j < parsedRespones.data[i].dd.pir; j++) {
        let latVariance = Math.random() * 0.000025;
        let longVariance = Math.random() * 0.00002;
        latVariance *= Math.round(Math.random()) ? 1 : -1;
        longVariance *= Math.round(Math.random()) ? 1 : -1;

        let feature = {};
        feature.geometry = {
          type: "Point",
          coordinates: [startLat + latVariance, startLong + longVariance],
        };
        featureCollection.features.push(feature);
      }
    }

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
