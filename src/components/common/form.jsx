import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: { },
    errors: {}
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error != null ? error.details[0].message : null;
  };

  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  renderButton(label) {
    console.log("isValid",this.validate())
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderInput(label, name, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        type={type}
        name={name}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(label, name, options) {
    const { data, errors } = this.state;
    return (
      <Select
        label={label}
        name={name}
        value={data[name]}
        options={options}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
