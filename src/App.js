import axios, { Axios } from 'axios';
import { useState,useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setcountries] = useState([]);
  const [SingleCountry, setSingleCountry] = useState("");
  const [cities, setcities] = useState(null);
  const [singlecity, setsinglecity] = useState("");
  const [submit, setsubmit] = useState(false);

  const fetchcountires=async()=>
  {
    try {
      const country=await axios.get('https://countriesnow.space/api/v0.1/countries');
      setcountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
  fetchcountires();
  }, []);

  const fetchcities=(country)=>{
    setsubmit(false);
    setsinglecity(null);
    setSingleCountry(country);
    const findcities=countries.find((c)=>c.country===country);
    setcities(findcities.cities);
  };
  const submitHandle=()=>{
    if(SingleCountry&&singlecity){
      setsubmit(true);
      console.log(submit);
    }
  };

  return (
    <div className='App'>
      <div className='app-header'>
        <h1>Select your hometown</h1>
        <div>
          {
          countries && (
          <select onChange={(e)=>fetchcities(e.target.value)} value={SingleCountry}>
            <option disabled selected hidden> 
              Select country
            </option>
            {
              countries.map((country)=>
              (
              <option key={`${country.country}`} value={country.country}>
                {country.country}
              </option>
              )
              )
          }
          </select>
          )}
          {cities && <select onChange={(e)=>setsinglecity(e.target.value)} value={singlecity}>
            <option disabled selected hidden> 
              Select city
            </option>
       
             {
              cities.map((city)=>(
                <option value={city} key={city}>{city}</option> 
              ))
             }
        
          </select>
        }
          <button onClick={submitHandle}>Add</button>
        </div>
        {
          submit &&(
            <h3>
              Your country is {SingleCountry} and Your city is {singlecity}
            </h3>
          )
        }

      </div>
    </div>
   
  )
}




export default App;
