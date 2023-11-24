import React from "react";
import Radio from "@mui/material/Radio";
// import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import { selectFlight, selectReturnFlight } from "../actions";
import { connect } from "react-redux";

function ListFlight(props) {
  const { flights } = props;

  const onSelectFlight = (flight, value) => {
    flight.totalPrice =
      parseInt(flight.price.value) + parseInt(flight.price.tax);
    props.selectFlight(flight);
    console.log(value);
  };

  const onSelectReturnFlight = (flight, value) => {
    flight.totalPrice =
      parseInt(flight.price.value) + parseInt(flight.price.tax);
    props.selectReturnFlight(flight);
    console.log(value);
  };

  const renderedList = flights.map((flight) => {
    return (
      <>
        <div
          key={flight.flightId}
          className="timeBox flex flex-col justify-center w-[27%] py-[10px]"
        >
          <div>
            <span className="font-medium text-[#3C3C3C] text-[12px]">
              {flight.airliner.model}
            </span>
          </div>
          <div className=" font-bold ">
            <div className="text-3">
              {flight.startFrom.name}
              <span class="text-[12px] font-medium"> Đến </span>
              {flight.destination.name}
            </div>
          </div>
          <div className="text-[16px] font-bold leading-3 text-center">
            <span class="text-[12px] font-medium">
              {flight.airliner.manufacturer}
            </span>
            <div class="flex justify-center mt-2">
              <svg
                class=" w-[14px] mt-[-5px] h-[1em]"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="priceBox w-[73%] flex">
          <div className="itemPriceBox flex items-center justify-center">
            <div>
              <div class="flex flex-col items-center">
                <img src="assets/noflight.cee84207.svg" alt="" />
                <p class="" customcolor="grey" weight="Bold">
                  Hết chỗ
                </p>
              </div>
            </div>
          </div>
          <div className="itemPriceBox flex items-center justify-center wrap">
            <div>
              <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                <p class="px-[33px] py-[25px]" customcolor="grey" weight="Bold">
                  <FormControlLabel
                    value="SkyBOSS"
                    checked={
                      props.selectedFlight &&
                      flight.flightId === props.selectedFlight.flightId &&
                      props.selectedFlight.type === "SkyBOSS"
                    }
                    onChange={() =>
                      onSelectFlight({
                        ...flight,
                        type: "SkyBOSS",
                        price: flight.price.SkyBOSS,
                      })
                    }
                    control={<Radio />}
                    // label="SkyBOSS"
                  />
                  <br />
                  {parseInt(flight.price.SkyBOSS.value).toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="itemPriceBox flex items-center justify-center wrap">
            <div>
              <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                <p class="px-[33px] py-[25px]" customcolor="grey" weight="Bold">
                  <FormControlLabel
                    value="Deluxe"
                    checked={
                      props.selectedFlight &&
                      flight.flightId === props.selectedFlight.flightId &&
                      props.selectedFlight.type === "Deluxe"
                    }
                    onChange={() =>
                      onSelectFlight({
                        ...flight,
                        type: "Deluxe",
                        price: flight.price.Deluxe,
                      })
                    }
                    control={<Radio />}
                    // label="Deluxe"
                  />
                  <br />
                  {parseInt(flight.price.Deluxe.value).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="itemPriceBox flex items-center justify-center wrap">
            <div>
              <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                <p class="px-[33px] py-[25px]" customcolor="grey" weight="Bold">
                  <FormControlLabel
                    value="Eco"
                    checked={
                      props.selectedFlight &&
                      flight.flightId === props.selectedFlight.flightId &&
                      props.selectedFlight.type === "Eco"
                    }
                    onChange={() =>
                      onSelectFlight({
                        ...flight,
                        type: "Eco",
                        price: flight.price.Eco,
                      })
                    }
                    control={<Radio />}
                    // label="Eco"
                  />
                  <br />
                  {parseInt(flight.price.Eco.value).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <tr key={flight.flightId}>
          <td>{flight.startFrom.name}</td>
          <td>{flight.destination.name}</td>
          <td>
            <FormControlLabel
              value="Eco"
              checked={
                props.selectedFlight &&
                flight.flightId === props.selectedFlight.flightId &&
                props.selectedFlight.type === "Eco"
              }
              onChange={() =>
                onSelectFlight({
                  ...flight,
                  type: "Eco",
                  price: flight.price.Eco,
                })
              }
              control={<Radio />}
              label="Eco"
            />
            <br />
            {parseInt(flight.price.Eco.value).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>
          <td>
            <FormControlLabel
              value="Deluxe"
              checked={
                props.selectedFlight &&
                flight.flightId === props.selectedFlight.flightId &&
                props.selectedFlight.type === "Deluxe"
              }
              onChange={() =>
                onSelectFlight({
                  ...flight,
                  type: "Deluxe",
                  price: flight.price.Deluxe,
                })
              }
              control={<Radio />}
              label="Deluxe"
            />
            <br />
            {parseInt(flight.price.Deluxe.value).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>

          <td>
            <FormControlLabel
              value="SkyBOSS"
              checked={
                props.selectedFlight &&
                flight.flightId === props.selectedFlight.flightId &&
                props.selectedFlight.type === "SkyBOSS"
              }
              onChange={() =>
                onSelectFlight({
                  ...flight,
                  type: "SkyBOSS",
                  price: flight.price.SkyBOSS,
                })
              }
              control={<Radio />}
              label="SkyBOSS"
            />
            <br />
            {parseInt(flight.price.SkyBOSS.value).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>
        </tr> */}
      </>
    );
  });
  const renderedReturnList = flights.map((flight) => {
    console.log(flight);
    return (
      <>
        <div
          key={flight.flightId}
          className="timeBox flex flex-col justify-center w-[27%] py-[10px]"
        >
          <div>
            <span className="font-medium text-[#3C3C3C] text-[12px]">
              {flight.airliner.model}
            </span>
          </div>
          <div className=" font-bold ">
            <div className="text-3">
              {flight.startFrom.name}
              <span class="text-[12px] font-medium"> Đến </span>
              {flight.destination.name}
            </div>
          </div>
          <div className="text-[16px] font-bold leading-3 text-center">
            <span class="text-[12px] font-medium">
              {flight.airliner.manufacturer}
            </span>
            <div class="flex justify-center mt-2">
              <svg
                class=" w-[14px] mt-[-5px] h-[1em]"
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="presentation"
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="priceBox w-[73%] flex">
          <div className="itemPriceBox flex items-center justify-center">
            <div>
              <div class="flex flex-col items-center">
                <img src="assets/noflight.cee84207.svg" alt="" />
                <p class="" customcolor="grey" weight="Bold">
                  Hết chỗ
                </p>
              </div>
            </div>
          </div>
          <div className="itemPriceBox flex items-center justify-center wrap">
            <div>
              <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                <p class="px-[33px] py-[25px]" customcolor="grey" weight="Bold">
                  <FormControlLabel
                    value="SkyBOSS"
                    checked={
                      props.selectedReturnFlight &&
                      flight.flightId === props.selectedReturnFlight.flightId &&
                      props.selectedReturnFlight.type === "SkyBOSS"
                    }
                    onChange={() =>
                      onSelectReturnFlight({
                        ...flight,
                        type: "SkyBOSS",
                        price: flight.price.SkyBOSS,
                      })
                    }
                    control={<Radio />}
                    // label="SkyBOSS"
                  />
                  <br />
                  {parseInt(flight.price.SkyBOSS.value).toLocaleString(
                    "it-IT",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="itemPriceBox flex items-center justify-center wrap">
            <div>
              <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                <p class="px-[33px] py-[25px]" customcolor="grey" weight="Bold">
                  <FormControlLabel
                    value="Deluxe"
                    checked={
                      props.selectedReturnFlight &&
                      flight.flightId === props.selectedReturnFlight.flightId &&
                      props.selectedReturnFlight.type === "Deluxe"
                    }
                    onChange={() =>
                      onSelectReturnFlight({
                        ...flight,
                        type: "Deluxe",
                        price: flight.price.Deluxe,
                      })
                    }
                    control={<Radio />}
                    // label="Deluxe"
                  />
                  <br />
                  {parseInt(flight.price.Deluxe.value).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </div>
          <div className="itemPriceBox flex items-center justify-center wrap">
            <div>
              <div class="text-[16px] font-bold text-[#333333] font-jambonoMedium">
                <p class="px-[33px] py-[25px]" customcolor="grey" weight="Bold">
                  <FormControlLabel
                    value="Eco"
                    checked={
                      props.selectedReturnFlight &&
                      flight.flightId === props.selectedReturnFlight.flightId &&
                      props.selectedReturnFlight.type === "Eco"
                    }
                    onChange={() =>
                      onSelectReturnFlight({
                        ...flight,
                        type: "Eco",
                        price: flight.price.Eco,
                      })
                    }
                    control={<Radio />}
                    // label="Eco"
                  />
                  <br />
                  {parseInt(flight.price.Eco.value).toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <tr key={flight.flightId}>
          <td>{flight.startFrom.name}</td>
          <td>{flight.destination.name}</td>
          <td>
            <FormControlLabel
              value="Eco"
              checked={
                props.selectedReturnFlight &&
                flight.flightId === props.selectedReturnFlight.flightId &&
                props.selectedReturnFlight.type === "Eco"
              }
              onChange={() =>
                onSelectReturnFlight({
                  ...flight,
                  type: "Eco",
                  price: flight.price.Eco,
                })
              }
              control={<Radio />}
              label="Eco"
            />
            <br />
            {parseInt(flight.price.Eco.value).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>
          <td>
            <FormControlLabel
              value="Deluxe"
              checked={
                props.selectedReturnFlight &&
                flight.flightId === props.selectedReturnFlight.flightId &&
                props.selectedReturnFlight.type === "Deluxe"
              }
              onChange={() =>
                onSelectReturnFlight({
                  ...flight,
                  type: "Deluxe",
                  price: flight.price.Deluxe,
                })
              }
              control={<Radio />}
              label="Deluxe"
            />
            <br />
            {parseInt(flight.price.Deluxe.value).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>

          <td>
            <FormControlLabel
              value="SkyBOSS"
              checked={
                props.selectedReturnFlight &&
                flight.flightId === props.selectedReturnFlight.flightId &&
                props.selectedReturnFlight.type === "SkyBOSS"
              }
              onChange={() =>
                onSelectReturnFlight({
                  ...flight,
                  type: "SkyBOSS",
                  price: flight.price.SkyBOSS,
                })
              }
              control={<Radio />}
              label="SkyBOSS"
            />
            <br />
            {parseInt(flight.price.SkyBOSS.value).toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })}
          </td>
        </tr> */}
      </>
    );
  });

  return (
    <form>
      <div className="tabBottomContentLeft mt-[30px] ">
        <div className="titleTabsContent flex">
          <div class="w-[27%]"></div>
          <div className="box-title-tab flex w-[73%] items-center">
            <div className="businessTitle">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/businesswhite-1689220127310.svg"
                alt=""
              />
            </div>
            <div className="skyBossTitle">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/wskyboss-1642435135647.svg"
                alt=""
              />
            </div>
            <div className="deluxeTitle">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/wdelux-1642435135632.svg"
                alt=""
              />
            </div>
            <div className="ecoTitle">
              <img
                src="https://vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com/weco-1642435135644.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="resultTabsContent">
          <div className="rounded-md">
            <div className="min-h-[96px] flex ">
              {props.type === "oneway" && renderedList}
              {props.type === "roundtrip" && renderedReturnList}
            </div>
          </div>
        </div>
      </div>
      {/* <table className="ui celled table">
        <thead>
          <tr>
            <th>Điểm khởi hành</th>
            <th>Điểm đến</th>
            <th>Eco</th>
            <th>Deluxe</th>
            <th>SkyBoss</th>
          </tr>
        </thead>

        <tbody>
          {props.type === "oneway" && renderedList}
          {props.type === "roundtrip" && renderedReturnList}
        </tbody>
      </table> */}
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedFlight: state.selectedFlight,
    selectedReturnFlight: state.selectedReturnFlight,
  };
};

export default connect(mapStateToProps, { selectFlight, selectReturnFlight })(
  ListFlight
);
