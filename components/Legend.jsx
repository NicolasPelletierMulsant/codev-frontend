import L from "leaflet"
import * as React from "react"

export default function Legend({ map, data, showEnergy }) {
  React.useEffect(() => {
    if (map) {
      const legend = L.control({ position: "bottomright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        
        let spans = [];
        for (const [energyClass, color] of Object.entries(data)) {
            spans.push(`<span><i style="background: ${color}"></i> ${energyClass}</span>`);
        }
        div.innerHTML = "<div class='legend-title'>" + (showEnergy ? "Consommation énergétique" : "Estimation GES") + "</div>\n";
        div.innerHTML += spans.join("");

        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;

}