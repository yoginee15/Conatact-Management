import React, { Component } from "react";
import Table from "../common/table";
import { Link } from "react-router-dom";

class ContactTable extends Component {
  columns = [
    { path: "firstname", label: "First name" },
    { path: "lastname", label: "Last name" },
    { path: "email", label: "Email" },
    { path: "phone", label: "Phone" },
    { path: "status", label: "Status" },
    {
      key: "edit",
      content: contact => (
        <Link to={`/contacts/${contact._id}`} className="btn btn-primary">
          Edit
        </Link>
      )
    },
    {
      key: "delete",
      content: contact => (
        <button
          className="btn btn-danger"
          onClick={() => {
            this.props.onDelete(contact._id);
          }}
        >
          Delete
        </button>
      )
    }
  ];
  render() {
    const { contacts, sortColumn, onSort } = this.props;
    return (
      <Table
        data={contacts}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ContactTable;
