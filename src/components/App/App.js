import { nanoid } from "nanoid"
import { ContactSection } from "components/ContactSection/ContactSection";
import { SubmitForm } from "components/Form/Form";
import useLocalStorage from "hooks/useLocalStorage";
import { useState } from "react";
import { Container, Title } from "./App.styled";

export const AppForm = () => {
    const [contacts, setContacts] = useLocalStorage("contacts", [])
    const [filter, setFilter] = useState("")
    

    const addFormInfo = (name, number) => {
        const allNames = contacts.map(contact => contact.name.toLowerCase())
        if (allNames.includes(name.toLowerCase())) {
            alert(`${name} is already in contacts`)
        }
        else {
            setContacts(prevState => {
                const newContact = { id: nanoid(), name, number }
                return [...prevState, newContact]
            })
        }
    }
    
    const filterChange = evt => {
                setFilter(evt.currentTarget.value)
    }
    const filterSearch = () => {
        const normalizedFilter = filter.toLowerCase();
        if (filter.length) {
            return contacts.filter(contact =>
                contact.name.toLowerCase().includes(normalizedFilter),
            )
        } else {
            return contacts;
        }
    }
    const onDeleteContact = id => {
        setContacts(contacts.filter(contact => contact.id !== id))
    }


        return (
            <Container>
                <Title>Phonebook</Title>
                <SubmitForm handleForm={addFormInfo} />

                {contacts.length !==0 ?
                    (<ContactSection value={filter} onChange={filterChange} filter={filterSearch} onDelete={onDeleteContact} />) : null}
            </Container>
        )
    }
