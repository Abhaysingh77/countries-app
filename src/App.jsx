import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [apiData, setData] = useState([]);
  const debounceTime = useRef(null);
  const handleSearch = (e) => {
    console.log("handleSearch");
    const name = e.target.value;
    (async()=>{
      const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.data;
      setData(data);
    })();
  };

  const debounceSearch = (e, func, delay) => {
    if (debounceTime.current) {
      clearTimeout(debounceTime.current);
    }
    debounceTime.current = setTimeout(() => {
      func(e);
    }, delay);
  };
  useEffect(() => {
    const URL = "https://restcountries.com/v3.1/all";
    (async () => {
      const res = await axios.get(URL);
      const data = await res.data;
      setData(data);
      console.log(data);
    })();
  }, []);
  return (
    <>
      <input
        type="text"
        placeholder="Search for countries..."
        onChange={(e) => {
          debounceSearch(e, handleSearch, 1000);
        }}
      />
      <div className="container">
        {apiData.map((item) => {
          return (
            <div className="card" key={item.cca2}>
              <img
                src={item.flags.png}
                alt={item.cca2}
                height="70px"
                width="70px"
              />
              <h4>{item.name.common}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
