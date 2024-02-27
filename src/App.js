import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [output, setOutput] = useState("")

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error Fetching Data", error));
  }, []);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    width: "200px",
  };

  const flagStyle = {
    height: "100px",
    width: "100px",
  };
  const searchStyle = {
    height: "auto",
    width: "100vh",
    position: "relative",
  }
  const inpSt = {
    height: "50%",
    width: "100%",
    borderRadius: "5px",
    
  }
  const handleSearch = (e) =>{
    setOutput(e.target.value);
  }
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(output.toLowerCase())
  );

  return (
    <div>
      <div style={searchStyle}>
        <input style={inpSt} type="text" placeholder="Search for countries" onChange={handleSearch}/>
      </div>
     <div  style={containerStyle} className="countryCard">{filteredCountries.map((ele) => {
        return (
          <div className="countryCard" key={ele.cca3} style={cardStyle}>
            <img
              src={ele.flags.png}
              alt={`Flag of ${ele.flags.png}`}
              style={flagStyle}
            />
            <h2>{ele.name.common}</h2>
          </div>
        );
      })}</div>
      
    </div>
  );
}