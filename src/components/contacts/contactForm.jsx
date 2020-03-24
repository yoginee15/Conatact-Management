import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { getContact, saveContact } from "../../services/fakeContactService";

class ContactForm extends Form {
  state = {
    data: { firstname: "", lastname: "", email: "", phone:"", status:"" },
    status: [],
    errors: {},
    statusObj : [
      {_id:0, name:"Inactive"},
      {id_:1, name:"Active"}
    ]
  };
  
  schema = {
    _id: Joi.string(),
    firstname: Joi.string()
      .required()
      .label("First name"),
      lastname: Joi.string()
      .required()
      .label("Last name"),
    status: Joi.string()
      .required()
      .label("Status"),
    phone: Joi.string()
      .required()
      .label("Phone number"),
    email: Joi.string().email()
      .required()
      .label("Email")
  };

  async populateContacts() {
    try {
      const contactId = this.props.match.params.id;
      if (contactId === "new") return;
      const contact = await getContact(contactId);
      this.setState({ data: this.mapToViewModel(contact) });
    } catch (e) {
      const { response } = e;
      if (response && response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateContacts();
  }

  mapToViewModel(contact) {
    return {
      _id: contact._id,
      firstname: contact.firstname,
      lastname: contact.lastname,
      email: contact.email,
      phone: contact.phone,
      status: contact.status,

    };
  }

  handleSave = () => {
    this.props.history.push("/contacts");
  };

  doSubmit = async () => {
    const { data: result } = await saveContact(this.state.data);
    this.props.history.push("/contacts");
  };

  render() {
    return (
      <React.Fragment>
        <h3>Contact Form</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("First name", "firstname")}
          {this.renderInput("Last name", "lastname")}
          {this.renderSelect("Status", "status", this.state.statusObj)}
          {this.renderInput("Phone number", "phone", "string")}
          {this.renderInput("Email", "email", "email")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default ContactForm;
