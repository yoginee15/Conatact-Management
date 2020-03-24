import React, { Component } from "react";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../common/listGroup";
import { getContacts, deleteContact } from "../../services/fakeContactService.js";
import ContactTable from "./contactTable";
import SearchBox from "../common/searchBox";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

class Contacts extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  state = {
    contacts: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    selectedStatus: null,
    sortColumn: { path: "firstname", order: "asc" },
    statusObj : ["Inactive","Active"]
  };

  handleStatus = contact => {
    const contacts = [...this.state.contacts];
    const index = this.state.contacts.indexOf(contact);
    contacts[index] = { ...this.state.contacts[index] };
    contacts[index].liked = !contacts[index].liked;
    this.setState({ contacts });
  };

  handlePageChanges = page => {
    this.setState({ currentPage: page });
  };

  handleSelectStatus = status => {
    this.setState({
      selectedStatus: status.toLowerCase(),
      searchQuery: "",
      currentPage: 1
    });
  };

  async handleDelete(id) {
    const originalcontacts = this.state.contacts;
    const contacts = originalcontacts.filter(m => m._id !== id);
    this.setState({ contacts });
    try {
      const { data: result } = await deleteContact(id);
    } catch (e) {
      const { response } = e;
      if (response && response.status === 404) {
        toast.error("This contact has already been deleted!");
        this.setState({ contacts: originalcontacts });
      }
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedStatus: null, currentPage: 1 });
  };

  async componentDidMount() {
    const contactData  = await getContacts();
    const contacts = [...contactData];
    this.setState({ contacts: contacts });
  }

  getPagedData = () => {
    const {
      contacts: allContacts,
      currentPage,
      pageSize,
      selectedStatus,
      sortColumn,
      searchQuery
    } = this.state;

    let filteredContacts = allContacts;

    if (searchQuery) {
      filteredContacts = allContacts.filter(c =>
        c.firstname.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedStatus) {
      filteredContacts = allContacts.filter(
        contact => contact.status === selectedStatus
      );
    }
    const sorted = _.orderBy(
      filteredContacts,
      [sortColumn.path],
      [sortColumn.order]
    );
    const contacts = paginate(sorted, currentPage, pageSize);
    const totalCount = filteredContacts.length;
    return { totalCount, contacts };
  };
  
  renderingContacts() {
    const { currentPage, pageSize, statusObj } = this.state;
    if (this.state.contacts.length > 0) {
      const { totalCount, contacts } = this.getPagedData();
      return (
        <div className="row">
          <div className="col-2 m-3">
            <ListGroup
              items={statusObj}
              onItemSelect={this.handleSelectStatus}
              selectedItem={this.state.selectedStatus}
            />
          </div>
          <div className="col m-3">
            <Link
              to="/contacts/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Contact
            </Link>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <p>Showing {totalCount} contacts in the database</p>
            <ContactTable
              contacts={contacts}
              onDelete={this.handleDelete}
              onStatus={this.handleStatus}
              onSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChanges}
              currentPage={currentPage}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="m-3">
          <p>There is no contact in database</p>
        </div>
      );
    }
  }
  render() {
    return this.renderingContacts();
  }
}

export default Contacts;
