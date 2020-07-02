import React from "react";
import axios from "axios";
import NavBar from "../components/Navbar";
import "../styles/Services.css";
import Service from "../components/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight , faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const Services = () => {

  const [serviceList, useServiceList] = React.useState([]);
  const [pagination, usePagination] = React.useState(0);
  const [pages, usePages] = React.useState(0);

  const SetPages = (value) => {
    usePages(value);
  }

  const SetPagination = (value) => {
    usePagination(pagination + value);
  }


  const SetServiceList = (data) => {
    useServiceList(data);
  };

  React.useEffect(() => {
    getServices();
  }, []);

  const chunkArray = (myArray, chunk_size) => {
    let index = 0;
    const arrayLength = myArray.length;
    let tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        let myChunk = myArray.slice(index, index+chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

  const getServices = () => {
    axios
      .get("http://localhost:3001/services", {
        withCredentials: true,
      })
      .then((response) => {
        SetServiceList(chunkArray(response.data.services, 3));
        console.log((chunkArray(response.data.services, 3)))
        SetPages(Math.ceil((response.data.services.length-1)/3));
      })
      .catch((error) => {
      });
  };

  

  // const art = getArticles();
  return (
    <div>
      <NavBar option={"services"}/>
      <div className="float-right ServicesContainer"> 
        <h1 className="ServiceTile text-center">Our Services</h1>
        <h3 className="ServiceSubTile text-center">Check the differents services tha we offer.
        </h3>
        <div className="ServicesDisplay mt-3 d-flex justify-content-center">
          { serviceList.length > 0 ? ( serviceList[pagination].map((service) => (
        <Service key={service.id} className={service.id} service={service}/>
        ))) : null}
       
          
        </div>
        <div className="paginationButCont">
          { pagination < pages ? <button onClick={()=>{SetPagination(1)}}className="buttonPagination btr float-right"><FontAwesomeIcon icon={faChevronRight} className={"fa-2x"}/></button> : null}

          { pagination > 0 ? <button onClick={()=>{SetPagination(-1)}} className="buttonPagination btl float-left"><FontAwesomeIcon icon={faChevronLeft} className={"fa-2x"}/></button> : null}
          
        </div>
        {/* <button onClick={getServices}className="btn btn-success">get services</button> */}
    </div>
    </div>
    
  )
};

export default Services;
