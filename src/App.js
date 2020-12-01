import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const campusInfo = async () => {
      let finished = false;
      let index = 1;
      while (!finished) {
        try {
          let campus = await window.Mazemap.Data.getCampus(index);
          let name = campus.properties.name;
          console.log(name);
          if (name.includes("Umeå")) {
            finished = true;
            console.log(campus.properties.id);
            return;
          }
          index++;
        } catch (error) {
          index++;
          continue;
        }
      }
    };

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
    //campusInfo();
    console.log(map);
  }, []);

  return (
    <div className="App">
      <div id="map" class="mazemap" style={{ width: "100%" }}></div>
    </div>
  );
}

export default App;
