import { useEffect, useState } from "react";
import AvatarDropdown from "../components/avatar-dropdown";
import ContactTable from "../components/contact-table";
import { Contact } from "../types/contact";
import ContactForm from "../components/contact-form";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("isLogin") && !localStorage.getItem("user")) {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setContacts(savedContacts);
  }, []);

  const saveContact = (contact: Contact) => {
    if (editContact) {
      setContacts((prevContacts) => {
        const updatedContacts = prevContacts.map((c) =>
          c.id === contact.id ? contact : c
        );
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        toast.success("Kontak berhasil diupdate");
        return updatedContacts;
      });
      setEditContact(null);
    } else {
      const newContact = { ...contact, id: Date.now() };
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      toast.success("Kontak berhasil ditambahkan");
    }
  };

  const deleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    toast.success("Kontak berhasil dihapus");
  };

  const editContactHandler = (contact: Contact) => {
    console.log("Edit Contact", contact);
    setEditContact(contact);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-600 h-screen">
      <div className="bg-white dark:bg-slate-700 py-2 px-4 md:px-12 flex justify-between items-center">
        <h1 className="font-extrabold dark:text-white">ContactKu.</h1>
        <AvatarDropdown />
      </div>
      <div className="m-4 flex flex-col md:flex-row justify-center items-start space-y-3 md:space-x-3">
        <div className="w-full md:w-[400px] bg-white p-4 rounded-lg">
          <h1 className="font-bold">Form Kontak</h1>
          <hr className="my-2" />
          <ContactForm onSave={saveContact} editContact={editContact} />
        </div>
        <ContactTable
          contacts={contacts}
          onEdit={editContactHandler}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}
