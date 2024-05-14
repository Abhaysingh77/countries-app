import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [apiData, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const debounceTime = useRef(null);

  const handleSearch = (e) => {
    const text = e.target.value.toLowerCase();
    const filterData = apiData.filter((item) => {
      return item.name.common.toLowerCase().includes(text);
    });
    setFilteredData(filterData);
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
    const fetchData = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        setData(res.data);
        setFilteredData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
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
        {filteredData.map((item) => {
          return (
            <div className="countryCard" key={item.cca2}>
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
