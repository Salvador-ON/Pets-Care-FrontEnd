import React from "react";
import axios from "axios";
import NavBar from "../components/Navbar";
import "../styles/Services.css";
import { useSelector } from "react-redux";
import Service from "../components/Service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import ServiceShow from "../components/ServiceShow";
const Services = () => {
  const user = useSelector((state) => state.loggedInStatus);
  const [serviceList, useServiceList] = React.useState([]);
  const [pagination, usePagination] = React.useState(0);
  const [pages, usePages] = React.useState(0);

  const [serviceOpen, useServiceOpen] = React.useState({
    status: false,
    data: {},
  });

  const SetServiceTrue = (value) => {
    useServiceOpen({
      status: true,
      data: value,
    });
  };

  const ResetSetService = () => {
    useServiceOpen({
      status: false,
      data: {},
    });
  };

  const SetPages = (value) => {
    usePages(value);
  };

  const SetPagination = (value) => {
    usePagination(pagination + value);
  };

  const SetServiceList = (data) => {
    useServiceList(data);
  };

  React.useEffect(() => {
    getServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ActivateService = (data) => {
    SetServiceTrue(data);
  };

  const chunkArray = (myArray, chunk_size) => {
    let index = 0;
    const arrayLength = myArray.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  };

  const getServices = () => {
    axios
      .get("http://pets-care-api.herokuapp.com/services", {
        withCredentials: true,
      })
      .then((response) => {
        SetServiceList(chunkArray(response.data.services, 3));
        SetPages(Math.ceil((response.data.services.length - 1) / 3) - 1);
      })
      .catch((error) => {});
  };

  return (
    <div>
      <NavBar option={"services"} />
      {!serviceOpen.status ? (
        <div className="float-right ServicesContainer">
          <h1 className="ServiceTile text-center">Our Services</h1>
          <h3 className="ServiceSubTile text-center">
            Check the differents services tha we offer.
          </h3>
          <div className="ServicesDisplay mt-3 d-flex justify-content-center">
            {serviceList.length > 0
              ? serviceList[pagination].map((service) => (
                  <div
                    className="serviceContainer"
                    onClick={() => {
                      ActivateService(service);
                    }}
                    key={service.id}
                  >
                    <Service className={service.id} service={service} />
                  </div>
                ))
              : null}
          </div>
          <div className="paginationButCont">
            {pagination < pages ? (
              <button
                onClick={() => {
                  SetPagination(1);
                }}
                className="buttonPagination btr float-right"
              >
                <FontAwesomeIcon icon={faChevronRight} className={"fa-2x"} />
              </button>
            ) : null}

            {pagination > 0 ? (
              <button
                onClick={() => {
                  SetPagination(-1);
                }}
                className="buttonPagination btl float-left"
              >
                <FontAwesomeIcon icon={faChevronLeft} className={"fa-2x"} />
              </button>
            ) : null}
          </div>

          {user.loggedInStatus !== "LOGGED_IN" ? (
            <h6 className="text-center mt-1">
              Log In or Sign Up to request an appointment
            </h6>
          ) : null}
        </div>
      ) : null}

      {serviceOpen.status ? (
        <ServiceShow
          serviceOpen={serviceOpen}
          ResetSetService={ResetSetService}
          user={user}
        />
      ) : null}
    </div>
  );
};

export default Services;
