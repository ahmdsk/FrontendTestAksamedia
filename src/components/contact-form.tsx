import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Contact } from "../types/contact";

interface ContactFormProps {
  onSave: (contact: Contact) => void;
  editContact: Contact | null;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, editContact }) => {
  const [contact, setContact] = useState<Contact>(
    editContact || { id: 0, name: "", phone: "" }
  );

  useEffect(() => {
    if (editContact) {
      setContact(editContact);
    } else {
      setContact({ id: 0, name: "", phone: "" });
    }
  }, [editContact]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contact.name && contact.phone) {
      onSave(contact);
      setContact({ id: 0, name: "", phone: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          type="text"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          required
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {editContact ? "Update Contact" : "Save Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
