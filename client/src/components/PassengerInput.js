import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Form, Dropdown, Input } from "semantic-ui-react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./PassengerInput.css";

const countryOptions = [
  { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
  { key: "al", value: "al", flag: "al", text: "Albania" },
  { key: "dz", value: "dz", flag: "dz", text: "Algeria" },
  { key: "as", value: "as", flag: "as", text: "American Samoa" },
  { key: "ad", value: "ad", flag: "ad", text: "Andorra" },
  { key: "ao", value: "ao", flag: "ao", text: "Angola" },
  { key: "ai", value: "ai", flag: "ai", text: "Anguilla" },
  { key: "ag", value: "ag", flag: "ag", text: "Antigua" },
  { key: "ar", value: "ar", flag: "ar", text: "Argentina" },
  { key: "am", value: "am", flag: "am", text: "Armenia" },
  { key: "aw", value: "aw", flag: "aw", text: "Aruba" },
  { key: "au", value: "au", flag: "au", text: "Australia" },
  { key: "at", value: "at", flag: "at", text: "Austria" },
  { key: "az", value: "az", flag: "az", text: "Azerbaijan" },
  { key: "bs", value: "bs", flag: "bs", text: "Bahamas" },
  { key: "bh", value: "bh", flag: "bh", text: "Bahrain" },
  { key: "bd", value: "bd", flag: "bd", text: "Bangladesh" },
  { key: "bb", value: "bb", flag: "bb", text: "Barbados" },
  { key: "by", value: "by", flag: "by", text: "Belarus" },
  { key: "be", value: "be", flag: "be", text: "Belgium" },
  { key: "bz", value: "bz", flag: "bz", text: "Belize" },
  { key: "bj", value: "bj", flag: "bj", text: "Benin" },
  { key: "vn", value: "vn", flag: "vn", text: "Viet Nam" },
];

const renderTextField = ({ input, placeholder, label, meta }) => {
  console.log(meta.error);
  return (
    <Form.Field className={`${meta.touched && meta.invalid ? "error" : ""}`}>
      <label>{label}</label>
      <Input type="text" {...input} placeholder={placeholder} />
      {meta.touched && meta.error && (
        <div className="ui pointing basic label">{meta.error}</div>
      )}
    </Form.Field>
  );
};

const renderSelectField = ({ input, label, placeholder, meta, options }) => {
  return (
    <Form.Field className={`${meta.touched && meta.invalid ? "error" : ""}`}>
      <label>{label}</label>
      <Dropdown
        selection
        value={input.value}
        onChange={(param, data) => input.onChange(data.value)}
        placeholder={placeholder}
        fluid
        search
        options={countryOptions}
      />
      {meta.touched && meta.error && (
        <div className="ui pointing basic label">{meta.error}</div>
      )}
    </Form.Field>
  );
};

const renderDatePicker = ({ input, label, meta }) => {
  console.log(meta.touched);
  return (
    <Form.Field
      className={`customDatePickerWidth ${
        meta.touched && meta.invalid ? " error" : ""
      }`}
    >
      <label>{label}</label>
      <DatePicker
        selected={input.value}
        onChange={input.onChange}
        showYearDropdown
        dateFormat="dd/MM/yyyy"
        placeholderText="Ngày sinh"
      />
      {meta.touched ||
        (meta.error && (
          <div className="ui pointing basic label">{meta.error}</div>
        ))}
    </Form.Field>
  );
};

function PassengerInput() {
  return (
    <Form>
      <h4 class="ui text-[20px] font-jambonoMedium mb-3">
        Thông tin hành khách
      </h4>
      <label>Họ và tên</label>
      <Form.Group widths="equal">
        <Field name="firstName" placeholder="Họ" component={renderTextField} />
        <Field
          name="lastName"
          placeholder="Tên đệm & tên"
          component={renderTextField}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Field
          name="birthDay"
          label="Ngày sinh"
          placeholder="Ngày sinh"
          component={renderDatePicker}
        />
        <Field
          name="country"
          label="Quốc gia"
          placeholder="Chọn quốc gia"
          component={renderSelectField}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Field
          name="address"
          label="Địa chỉ"
          placeholder="Địa chỉ"
          component={renderTextField}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Field
          name="email"
          label="Email"
          placeholder="Địa chỉ emal"
          component={renderTextField}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Field
          name="passengerId"
          label="CMND"
          placeholder="CMND"
          component={renderTextField}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Field
          name="phone"
          label="Số điện thoại"
          placeholder="Số điện thoại"
          component={renderTextField}
        />
      </Form.Group>
    </Form>
  );
}

const validate = (formValues) => {
  const errors = {};
  const requiredField = [
    "firstName",
    "lastName",
    "birthDay",
    "country",
    "address",
    "email",
    "phone",
    "passengerId",
  ];
  requiredField.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "Không bỏ trống.";
    }
  });
  // Validate email format
  if (formValues.email && !/^[^\s@]+@gmail\.com$/.test(formValues.email)) {
    errors.email = "Email phải kết thúc bằng '@gmail.com'.";
  }
  console.log(formValues["birthDay"]);
  // Check if birthDay is provided
  if (formValues["birthDay"]) {
    // Calculate age based on the birthDay
    const birthDate = new Date(formValues["birthDay"]);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    console.log(currentDate.getFullYear());
    console.log(birthDate.getFullYear());
    // Check if the age is less than 18
    if (age < 18) {
      errors["birthDay"] = "Phải lớn hơn 18 tuổi.";
    }
  }
  return errors;
};

const wrapper = reduxForm({
  form: "passenger",
  validate: validate,
  destroyOnUnmount: false,
})(PassengerInput);

export default connect(null)(wrapper);
