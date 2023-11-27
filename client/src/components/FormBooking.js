import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { BiSolidDownArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { ReactComponent as IconRSFlight } from "../icons/icon-rsflight.svg";
import { fetchAirports } from "../actions";
import { ReactComponent as IconFlight } from "../icons/icon-flight.svg";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { searchFlights } from "../actions";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./pages/Home.css";
import { format } from "date-fns-tz";
import moment from "moment-timezone";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { formatISO } from "date-fns";

const startFrom = [
  { title: "TP Hồ Chí Minh", value: "HCM" },
  { title: "Hà Nội", value: "HaNoi" },
  { title: "Kiên Giang", value: "KienGiang" },
];

const destinations = [
  { title: "TP Hồ Chí Minh", value: "HCM" },
  { title: "Hà Nội", value: "HaNoi" },
  { title: "Kiên Giang", value: "KienGiang" },
];
dayjs.extend(utc);
dayjs.extend(timezone);
function FormBooking(props) {
  const [openDate, setOpenDate] = useState(false);
  const [openReturnDate, setOpenReturnDate] = useState(false);
  const [startAddress, setStartAdd] = useState("");
  const [endAdd, setEndAdd] = useState("");
  const handleCompare = () => {
    console.log(startAddress);
    console.log(endAdd);
    const temp = startAddress;
    setStartAdd(endAdd);
    setEndAdd(temp);
  };
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 0,
  });

  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const handleRadioChange = (event) => {
    // Khi người dùng thay đổi lựa chọn của ô radio
    setIsRoundTrip(event.target.value === "roundTrip");
    setOpenReturnDate(!openReturnDate);
  };
  // useEffect(() => {
  //   props.fetchAirports();
  // }, [])

  const navigate = useNavigate();
  const onSubmit = (formValues) => {
    // history.push("/select-flight");
    navigate("/select-flight");
  };
  if (!props.airports) return <div>Loading...</div>;
  return (
    <div className="h-[100%]">
      <form
        onSubmit={props.handleSubmit(onSubmit)}
        className="bg-transparent h-[100%] form-search-home"
      >
        <div className="field flex items-center justify-between mb-[15px]">
          <Field name="type" component={renderRadio} label="adasdf" />
          <div className="flex items-center gap-1">
            <span className="font-bold text-[17px] text-white">VND</span>
            <BiSolidDownArrow color="white" size={13} />
          </div>
        </div>
        <div className="">
          {/* <img
            src="/assets/icon-compare.svg"
            alt=""
            className="absolute top-[37px] left-0 p-[5px] cursor-pointer"
            onClick={handleCompare}
          /> */}
          <div className="flex items-center relative bg-white h-[48px] rounded-xl mb-[11px]">
            <div className="start-flight flex-[4] rounded-xl border-r-[1px] border-[#D1D3D4] overflow-hidden">
              <div className="absolute top-[50%] translate-y-[-50%] left-[10px]">
                <IconFlight />
              </div>
              <Field
                className=" "
                name="startFrom"
                component={renderSelect}
                label="Điểm khởi hành"
                options={props.airports}
              />
            </div>
          </div>
          <div className="bg-white h-[48px] rounded-xl mb-[11px] relative">
            <div className="dateBookingFlight absolute w-full bottom-0">
              <Field
                className="w-full h-[70%] dateBookingFlight"
                name="departureDay"
                component={DateField}
                label="Ngày đi"
              />
            </div>
          </div>
          {/* <div className="flex-[2] flex justify-around">
            <Field className="" name="departureDay" component={DateField} />
          </div> */}
          <div className="flex items-center relative bg-white h-[48px] rounded-xl mb-[11px]">
            <div className="start-flight flex-[4] rounded-xl border-r-[1px] border-[#D1D3D4] overflow-hidden">
              <div className="absolute top-[50%] translate-y-[-50%] left-[10px]">
                <IconRSFlight />
              </div>
              <Field
                name="destination"
                component={renderSelect}
                options={props.airports}
                label="Điểm đến"
              />
            </div>
          </div>

          {props.type === "roundtrip" && (
            <div className="bg-white h-[48px] rounded-xl relative">
              <div className="dateBookingFlight absolute w-full bottom-0">
                <Field
                  className="w-full"
                  name="returnDay"
                  component={DateField}
                  label="Ngày về"
                />
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Button
            type="submit"
            size="large"
            style={{ marginTop: 25 }}
            variant="contained"
            className="btnSearchForm font-bold font-[jambonoMedium] text-[#333] select-none text-[16px] w-full h-[39px] max-w-[200px] rounded-[10px] bg-gradient-to-r from-[#F9A51A] to-[#FFDD00]"
          >
            Tìm chuyến bay
          </Button>
        </div>
      </form>
    </div>
  );
}

const renderRadio = ({ input }) => {
  return (
    <FormControl component="fieldset" className="cssRadio">
      <RadioGroup row {...input}>
        <FormControlLabel
          value="roundtrip"
          control={<Radio />}
          label="Khứ hồi"
        />
        <FormControlLabel
          value="oneway"
          control={<Radio />}
          label="Một chiều"
        />
      </RadioGroup>
    </FormControl>
  );
};

const renderSelect = ({ input, options, label, meta }) => {
  let error = false;
  if (meta.error && meta.touched) {
    error = true;
  }
  return (
    <FormControl
      className="absolute left-[34px] h-[48px] w-full bg-white"
      variant="standard"
      error={error}
    >
      <InputLabel
        id="demo-simple-select-outlined-label"
        className="text-[#333333]"
      >
        {label}
      </InputLabel>
      <Select {...input} label="Điểm khởi hành" className=" w-[80%]">
        {options.map((item) => {
          return (
            <MenuItem key={item._id} value={item}>
              {item.name}
            </MenuItem>
          );
        })}
      </Select>
      {error && (
        <FormHelperText className="z-50 absolute bottom-0">
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

// const DateField = (props) => {
//   const {
//     meta: { submitting, error, touched },
//     input: { onBlur, value, ...inputProps },
//     ...others
//   } = props;

//   const onChange = (date) => {
//     console.log(date);
//     Date.parse(date)
//       ? inputProps.onChange(date.toISOString())
//       : inputProps.onChange(null);
//   };

//   return (
//     <LocalizationProvider dateAdapter={DateFnsUtils}>
//       <DatePicker
//         disablePast
//         style={{ width: "100%", marginTop: 10 }}
//         {...inputProps}
//         {...others}
//         format="dd/MM/yyyy"
//         value={value ? new Date(value) : null}
//         disabled={submitting}
//         onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
//         error={error && touched}
//         onChange={onChange}
//       />
//     </LocalizationProvider>
//   );
// };

// const DateField = (props) => {
//   const {
//     meta: { submitting, error, touched },
//     input: { onBlur, value, ...inputProps },
//     ...others
//   } = props;

//   const onChange = (date) => {
//     // const formattedDate = format(date, "yyyy-MM-dd HH:mm:ssXXX", {
//     //   timeZone: "Asia/Ho_Chi_Minh",
//     // });
//     console.log(date);
//     console.log(date.toISOString());
//     // console.log(new Date().getTimezoneOffset());//xem múi giơ
//     Date.parse(date)
//       ? inputProps.onChange(date.toISOString())
//       : inputProps.onChange(null);
//   };
//   const handleBlur = () => {
//     console.log(value);
//     onBlur(value ? new Date(value).toISOString() : null);
//   };
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DatePicker
//         disablePast
//         style={{ width: "100%", marginTop: 10, height: "40%" }}
//         {...inputProps}
//         {...others}
//         format="dd/MM/yyyy"
//         value={value ? new Date(value) : null}
//         onBlur={handleBlur}
//         error={error && touched}
//         disabled={submitting}
//         onChange={onChange}
//       />
//     </LocalizationProvider>
//   );
// };

const DateField = (props) => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = (date) => {
    console.log(dayjs.tz.guess());

    const formattedDate = moment.tz(date, "Asia/Ho_Chi_Minh").toISOString();
    console.log(formattedDate);
    inputProps.onChange(Date.parse(date) ? formattedDate : null);
  };

  const handleBlur = () => {
    onBlur(value ? moment().tz(value, "Asia/Ho_Chi_Minh").toISOString() : null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        disablePast
        style={{ width: "100%", marginTop: 10, height: "40%" }}
        {...inputProps}
        {...others}
        slotProps={{ textField: { size: "small" } }}
        format="dd/MM/yyyy"
        value={value ? new Date(value) : null}
        onBlur={handleBlur}
        error={error && touched}
        disabled={submitting}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

// const DateField = ({ input, label, meta }) => {
//   return (
//     <div className="date-field flex justify-around relative">
//       <label>{label}</label>
//       <input {...input} type="date" className="w-[81%]" />
//       {meta.error && meta.touched && (
//         <span className="error absolute top-[40px] z-10 left-0 bg-red-500 text-white">
//           {meta.error}
//         </span>
//       )}
//     </div>
//   );
// };
const validate = (formValues) => {
  const errors = {};
  const requiredFields = [
    "type",
    "startFrom",
    "destination",
    "departureDay",
    "returnDay",
  ];

  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "Không bỏ trống";
    }
  });

  if (formValues["startFrom"] === formValues["destination"]) {
    errors["destination"] = "Điểm đến không được trùng điểm khởi hành";
  }
  if (formValues["departureDay"] && formValues["returnDay"]) {
    const departureDay = new Date(formValues["departureDay"]);
    const returnDay = new Date(formValues["returnDay"]);
    if (departureDay.getTime() > returnDay.getTime()) {
      errors["returnDay"] = "Ngày về phải sau ngày đi";
    }
  }
  return errors;
};

const selector = formValueSelector("FormBooking");

const mapStateToProps = (state) => {
  return {
    airports: Object.values(state.airports),
    startFrom: selector(state, "destination"),
    type: selector(state, "type"),
    initialValues: {
      takeOffTime: new Date().toISOString(),
      startFrom: selector(state, "startFrom"),
      type: "roundtrip",
    },
  };
};

const formWrapped = reduxForm({
  form: "FormBooking",
  validate: validate,
  destroyOnUnmount: false,
})(FormBooking);

export default connect(mapStateToProps, { searchFlights, fetchAirports })(
  formWrapped
);
