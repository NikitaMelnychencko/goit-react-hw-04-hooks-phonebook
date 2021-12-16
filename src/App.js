import { useState, useEffect } from 'react';
import Section from 'components/Section/Section';
import Search from 'components/Search/Search';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts],
  );
  const formSubmitHandler = data => {
    let isUniqueName = contacts.find(elem => elem.name.includes(data.name));

    if (!isUniqueName) {
      const userId = { id: nanoid() };
      setContacts(contacts => [...contacts, { ...userId, ...data }]);
    } else {
      const myAlert = alert({
        title: 'Alert',
        text: `${isUniqueName.name} is already in contacts`,
      });
    }
  };
  const handleChange = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };
  const deleteContact = contactId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== contactId),
    );
  };
  const filterContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  const filterContact = filterContacts();
  return (
    <>
      <Section title={'Phonebook'}>
        <Search onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={handleChange} />
        <Contacts contacts={filterContact} deleteContact={deleteContact} />
      </Section>
    </>
  );
};
export default App;
