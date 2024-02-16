import { VectorMap } from '@react-jvectormap/core'
import { usLcc } from "@react-jvectormap/unitedstates"
import { useEffect, useRef, useState } from 'react'

const categories = {
  "Category 1": ["US-CA", "US-TX"],
  "Category 2": ["US-NY", "US-AL"]
};

function App() {
  const mapRef = useRef(null);
  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setSelectedRegions(selectedStates);
    }
  }, [selectedStates])

  useEffect(() => {
    setSelectedStates(categories[selectedCategory] || []);
  }, [selectedCategory])

  return (
    <>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">Please select a category</option>
        {Object.keys(categories).map((k) => <option>{k}</option>)}
      </select>
      {selectedCategory}
      {JSON.stringify(selectedStates)}
      <VectorMap
        mapRef={mapRef}
        map={usLcc}
        style={{ height: "100vh" }}
        selectedRegions={selectedStates}
        regionsSelectable
        regionStyle={{
          initial: {
            fill: 'white',
            "fill-opacity": 1,
            stroke: 'none',
            "stroke-width": 0,
            "stroke-opacity": 1
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: 'pointer'
          },
          selected: {
            fill: 'yellow'
          },
          selectedHover: {
          }
        }}
      />
    </>
  )
}

export default App
