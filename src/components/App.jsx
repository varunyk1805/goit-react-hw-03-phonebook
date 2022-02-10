import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactsList from './ContactsList/ContactsList';
import s from './App.module.css';

export default class App extends Component {
    state = {
        contacts: [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        filter: '',
    };

    filterContactsList = () => {
        const {contacts} = this.state;
        const value = this.state.filter.toLowerCase();
        return contacts.filter(contact => contact.name.toLowerCase().includes(value));
    };

    addContact = (id, name, number) => {
        const {contacts} = this.state;
        const value = name.toLowerCase();
        contacts.filter(contact => contact.name.toLowerCase() === value).length === 0
            ?
            this.setState(prevState =>
                ({ contacts: [...prevState.contacts, { id: id, name: name, number: number }] })
            )
            :
            alert(`${name} is already in contacts.`);
    };

    deleteContact = event => {
        const { name } = event.target;
        const { contacts } = this.state;
        this.setState({ contacts: contacts.filter(contact => contact.id !== name) });
    };

    handlleFilterContactsByName = event => {
        const {value } = event.target;
        this.setState({ filter: value })
    };

    render() {
        const filteredContacts = this.filterContactsList();
        const { filter } = this.state;
        const { addContact, deleteContact, handlleFilterContactsByName } = this;
        return (
            <>
                <h2 className={s.phonebook}>
                    Phonebook
                </h2>
                <ContactForm
                    onSubmit={addContact}
                />
                <h2 className={s.contacts}>
                    Contacts
                </h2>
                <Filter
                    filter={filter}
                    onChange={handlleFilterContactsByName}
                />
                <ContactsList
                    contacts={filteredContacts}
                    onClick={deleteContact}
                />
            </>
        );
    };
};