import { Component } from 'react';
import Section from 'components/Section/Section';
import Search from 'components/Search/Search';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    let isUniqueName = this.state.contacts.find(elem =>
      elem.name.includes(data.name),
    );

    if (!isUniqueName) {
      const userId = { id: nanoid() };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, { ...userId, ...data }],
      }));
    } else {
      const myAlert = alert({
        title: 'Alert',
        text: `${isUniqueName.name} is already in contacts`,
      });
    }
  };
  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  filterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };
  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parseContact = JSON.parse(contact);
    if (parseContact) {
      this.setState({ contacts: parseContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevProps.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const filterContact = this.filterContacts();
    return (
      <>
        <Section title={'Phonebook'}>
          <Search onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title={'Contacts'}>
          <Filter value={this.state.filter} onChange={this.handleChange} />
          <Contacts
            contacts={filterContact}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
export default App;
