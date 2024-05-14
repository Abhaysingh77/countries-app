import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [apiData, setData] = useState([]);
  const debounceTime = useRef(null);
  const handleSearch = (e) => {
    console.log("handleSearch");
    const text = e.target.value;
    const filterData = apiData.filter((item) => {
      return item.name.common.toLowerCase().includes(text.toLowerCase());
    });
    console.log(filterData);
    setData(filterData);
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
      try {
        const res = await axios.get(URL);
        const data = await res.data;
        setData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
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
              <p>{item.name.common}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
