import React from "react";
import axiosCalls from "../services/axiosCalls";
import NavBar from "../components/Navbar";
import "../styles/Services.css";
import { useSelector } from "react-redux";
import Service from "../components/Service";
import utilities from "../utils/utilities"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import ServiceShow from "../components/ServiceShow";
import HidenNav from '../components/HidenNav';

const Services = () => {
  const user = useSelector((state) => state.loggedInStatus);
  const [serviceList, setServiceList] = React.useState([]);
  const [pagination, setPagination] = React.useState(0);
  const [pages, setPages] = React.useState(0);

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
    setPages(value);
  };

  const SetPagination = (value) => {
    setPagination(pagination + value);
  };

  const SetServiceList = (data) => {
    setServiceList(data);
  };

  React.useEffect(() => {
    getServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const ActivateService = (data) => {
    SetServiceTrue(data);
  };

  const getServices = () => {
    axiosCalls.showServices()
      .then((response) => {
        console.log(Math.ceil((response.data.services.length - 1) / 3));
        
        SetServiceList(utilities.chunkArray(response.data.services, 3));
        SetPages(Math.ceil((response.data.services.length) / 3));
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="d-lg-none"><HidenNav/></div>
      
      <NavBar option={"services"} />
      {!serviceOpen.status ? (
        <div className="float-none float-lg-right ServicesContainer">
          <h1 className="ServiceTile text-center">Our Services</h1>
          <h3 className="ServiceSubTile text-center">
            Check the differents services tha we offer.
          </h3>
          <div className="ServicesDisplay mt-3 d-flex flex-md-row flex-column justify-content-center justify-content-sm-between mx-lg-0 mx-auto">
            {serviceList.length > 0
              ? serviceList[pagination].map((service) => (
                  <div
                    className="serviceContainer mx-2"
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

          {user.loggedInStatus !== "LOGGED_IN" ? (
            <h6 className="mx-auto mx-sm-0  mt-4 mt-sm-0 text-center">
              Log In or Sign Up to request an appointment
            </h6>
          ) : null}
          
          <div className="paginationButCont">
            {pagination < pages-1 ? (
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
