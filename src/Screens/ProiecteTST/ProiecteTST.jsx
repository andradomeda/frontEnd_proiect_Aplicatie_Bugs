import React, { useEffect, useState } from 'react';
import NavigationBar from "../../Components/NavBar/NavBar.jsx";
import { useGlobalContext } from '../../GlobalContext';

import axios from 'axios';

const ProiecteTST = () => {
  // State pentru a stoca proiectele
  const [proiecte, setProiecte] = useState([]);
  const { userId } = useGlobalContext(); // Preluăm TesterId din context

  // Fetching proiectele de la backend
  useEffect(() => {
    const fetchProiecte = async () => {
      try {
        // Cererea GET pentru a obține proiectele
        const response = await axios.get('/api/proiecte');
        setProiecte(response.data.data);
      } catch (error) {
        console.error("Eroare la obținerea proiectelor: ", error);
      }
    };

    fetchProiecte();
  }, []);

  // Funcția pentru a asocia testerul cu un proiect
  const handleJoin = async (proiectId) => {
    try {
      const response = await axios.post('/api/proiecteTester', {
        ProiectId: proiectId,
        TesterId: userId,
      });
      if (response.data.success) {
        alert("Te-ai alăturat proiectului cu succes!");
      } else {
        alert("Eroare la asocierea testerului cu proiectul.");
      }
    } catch (error) {
      console.error("Eroare la asocierea testerului cu proiectul: ", error);
      alert("A apărut o eroare. Încearcă din nou.");
    }
  };

  return (
    <div>
      <NavigationBar />
      
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nume Proiect</th>
              <th>Link Repo</th>
              <th>Acțiune</th>
            </tr>
          </thead>
          <tbody>
            {/* Rânduri dinamic generate pe baza proiectelor */}
            {proiecte.map((proiect, index) => (
              <tr key={proiect.ProiectId}>
                <th>{index + 1}</th>
                <td>{proiect.Nume}</td>
                <td>
                  <a href={proiect.Repository} target="_blank" rel="noopener noreferrer">
                    {proiect.Repository}
                  </a>
                </td>
                <td>
                  <button
                    onClick={() => handleJoin(proiect.ProiectId)}
                    className="btn btn-xs bg-purple-600 text-white hover:bg-purple-700 focus:outline-none"
                  >
                    Join
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProiecteTST;
