import React, {useEffect, useState} from "react";
import Papa from "papaparse";
import {Icon} from "leaflet";
import 'leaflet/dist/leaflet.css';
import {MapContainer, TileLayer, Marker, Popup, Polyline} from 'react-leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";

import './App.css';
import {Bus} from "./class/Bus";
import {BusStop} from "./class/BusStop";
import {TelraamCapt} from "./class/TelraamCapt";
import {Graph} from "./component/graph"

function App() {
    const [markers, setMarkers] = useState([]);
    const [busStop, setBusStop] = useState([]);

    const polyline = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.51, -0.12],
    ]
    const [telraamCaptor, setTelraamCaptor] = useState(new TelraamCapt("test", polyline, 0, 0, 0, 0));

    useEffect(() => {
        const mesHeaders = new Headers([["Content-Type", "application/json"],["x-api-key", "91cab0beb0424fa2b10839ba985b605d"]])
        const request = new Request("http://localhost/api/Vehicles?format=json", {
            method: "GET",
            headers: mesHeaders,
        })
        fetch(request).then(data => data.json())
            .then(json => json.entity)
            .then(entity => entity.map(elt => new Bus(elt["id"], elt["vehicle"]["position"]["longitude"], elt["vehicle"]["position"]["latitude"])))
            .then(markers => setMarkers(markers))

        const stop = [];
        Papa.parse('http://localhost/busStop.txt', {
            download: true,
            mode: "cors",
            methode: "GET",
            complete: function (row) {
                // console.log(row.data[0][10])
                row.data.map(elt =>
                    stop.push(new BusStop(elt[2], Number(elt[11]), Number(elt[10])))
                )
            }
        })
        setBusStop(stop)

        fetch('http://localhost/telraam/segments/id/9000006678',
            {
                headers: {
                    'X-Api-Key': 'h8DwM3fFtn2hutVsEZdz77K2n36bZJTk3btiwL9o'
                },
                method: 'GET',
                mode: 'cors'
            }).then(response => response.json())
            .then(data => {
                const coord = data["features"][0]["geometry"]["coordinates"][0];
                for (const coordElement of coord) {
                    coordElement.reverse()
                }
                return new TelraamCapt(data["features"][0]["properties"]["oidn"],
                    coord,
                    0, 0, 0, 0)
            })
            .then(captor => setTelraamCaptor(captor))
    }, [setMarkers, setBusStop, setTelraamCaptor]);

    console.log("marker : ", markers)
    console.log("stop : ", busStop)
    console.log("telraam : ", telraamCaptor)

    const customIconBus = new Icon({
        iconUrl: require("./img/bus.png"),
        iconSize: [38, 38]
    })
    const customIconBusStop = new Icon({
        iconUrl: require("./img/busStop.png"),
        iconSize: [28, 14]
    })
    const limeOptions = { color: 'lime' }

  return (
      <div>
        <MapContainer center={[51.903614, -8.468399]} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

              <MarkerClusterGroup chunkedLoading>
                  {markers ?                                                                                              // if markers is define and not null
                      markers.map(marker => (                                                                             //  do this
                          <Marker key={marker.id} position={marker.place} icon={customIconBus}>
                              <Popup>{marker.id}</Popup>
                          </Marker>
                      )) : []}
              </MarkerClusterGroup>

              <MarkerClusterGroup chunkedLoading>
                  {busStop.map(sto => (
                      <Marker position={sto.place} icon={customIconBusStop}>
                          <Popup>{sto.name}</Popup>
                      </Marker>
                  ))}
              </MarkerClusterGroup>

            <Polyline key={telraamCaptor.id} pathOptions={limeOptions} positions={telraamCaptor.place}>
                <Popup maxWidth="auto" maxHeight="auto">{
                    <Graph/>
                }</Popup>
            </Polyline>

          </MapContainer>
      </div>
  );

}

export default App;
