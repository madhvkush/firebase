import React, { useState, useEffect, useCallback } from "react";
import { getDatabase, ref, onValue, remove } from "firebase/database";

export function PeopleList() {
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Using useCallback to memoize the function and avoid unnecessary re-creation
  // This helps prevent redundant re-renders or re-executions, especially since it is used in useEffect
  const fetchPeople = useCallback(() => {
    const db = getDatabase();
    const peopleRef = ref(db, "people");

    return new Promise((resolve, reject) => {
      onValue(
        peopleRef,
        (snapshot) => {
          const data = snapshot.val();

          const peopleList = data
            ? Object.entries(data).map(([id, details]) => ({ id, ...details }))
            : [];

          resolve(peopleList);
        },
        (errorObject) => {
          reject(errorObject);
        }
      );
    });
  }, []);

  // Encapsulated in useCallback to optimize performance by preventing unnecessary re-creations,
  // as this function is passed as a prop to the PersonItem child component.
  const deletePerson = useCallback((id) => {
    const db = getDatabase();
    const personRef = ref(db, `people/${id}`);
    remove(personRef)
      .then(() => {
        setPeople((prevPeople) =>
          prevPeople.filter((person) => person.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
        setError("Failed to delete person.");
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchPeople()
      .then((peopleList) => {
        setPeople(peopleList);
      })
      .catch((error) => {
        console.error("Error fetching people:", error);
        setError("Failed to load people data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchPeople]);

  if (isLoading) return <div>Loading people...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
  if (people.length === 0) return <div>No people added yet.</div>;

  return (
    <div>
      <h2>People List</h2>
      <ul>
        {people.map((person) => (
          <PersonItem key={person.id} person={person} onDelete={deletePerson} />
        ))}
      </ul>
    </div>
  );
}

// List item component for better modularity
const PersonItem = ({ person, onDelete }) => (
  <li>
    <strong>Name:</strong> {person.name}, <strong>Email:</strong> {person.email}
    <button
      style={{
        marginLeft: "10px",
        color: "red",
        cursor: "pointer",
        border: "none",
        background: "none",
      }}
      onClick={() => onDelete(person.id)}
    >
      🗑️
    </button>
  </li>
);
