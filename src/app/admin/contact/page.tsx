"use client";
import React, { useEffect, useState } from "react";

// Contact interface
interface Contact {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

const AdminContactPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const messagesPerPage = 5; // number of messages per page

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch("/api/contact", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: { success: boolean; data?: Contact[]; message?: string } = await res.json();
        if (data.success && data.data) setContacts(data.data);
        else setError(data.message || "Failed to fetch contacts");
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong while fetching contacts");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Search filter
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredContacts.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredContacts.length / messagesPerPage);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  if (loading) return <p className="p-8 mt-32 text-gray-600">Loading...</p>;
  if (error) return <p className="p-8 mt-32 text-red-600">{error}</p>;

  return (
    <div className="p-8 mt-32 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Messages</h2>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // reset page when search changes
          }}
          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
        />
      </div>

      {/* Messages */}
      {currentMessages.length === 0 ? (
        <p className="text-gray-500">No messages found.</p>
      ) : (
        <ul className="space-y-6">
          {currentMessages.map((contact) => (
            <li
              key={contact._id}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{contact.name}</h3>
                <span className="text-gray-500 text-sm">
                  {new Date(contact.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Email:</span> {contact.email}
              </p>
              {contact.subject && (
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Subject:</span> {contact.subject}
                </p>
              )}
              <p className="text-gray-700">
                <span className="font-semibold">Message:</span> {contact.message}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-amber-500 text-white rounded-md disabled:bg-gray-300"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-amber-500 text-white rounded-md disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminContactPage;
