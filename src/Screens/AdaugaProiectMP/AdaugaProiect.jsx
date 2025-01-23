import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../GlobalContext";
import NavigationBar from "../../Components/NavBar/NavBar.jsx";


const AdaugaProiect = () => {
  const { userId } = useGlobalContext();
  const [teamIds, setTeamIds] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([{ name: "", id: "" }]);
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [repository, setRepository] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");

  useEffect(() => {
    if (userId !== null) {
      fetch(`/api/membru/${userId}/membru-echipe`)
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setTeamIds(data.map((team) => team.EchipaId));
          }
        })
        .catch((error) => console.error("Eroare la preluarea echipelor:", error));
    }
  }, [userId]);

  const createNewTeam = async () => {
    if (!teamName || teamName.length < 3) {
      alert("Introduceți un nume valid pentru echipă.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/echipa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nume: teamName }),
      });
      const data = await response.json();
      if (data.success) {
        const newTeamId = data.data.EchipaId;

        for (const member of members) {
          if (member.id && member.name) {
            await fetch("/api/echipaMembru", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ EchipaId: newTeamId, MembruId: member.id }),
            });
          }
        }

        setSelectedTeamId(newTeamId);
        alert("Echipa a fost creată cu succes!");
      }
    } catch (error) {
      console.error("Eroare la crearea echipei:", error);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async () => {
    if (!projectName || projectName.length < 3) {
      alert("Introduceți un nume valid pentru proiect.");
      return;
    }
    if (!repository) {
      alert("Introduceți un repository valid.");
      return;
    }
    if (!selectedTeamId) {
      alert("Selectați sau creați o echipă.");
      return;
    }

    try {
      const response = await fetch("/api/proiect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nume: projectName,
          Repository: repository,
          EchipaId: selectedTeamId,
        }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Proiectul a fost adăugat cu succes!");
        setProjectName("");
        setRepository("");
      } else {
        alert("Eroare la adăugarea proiectului.");
      }
    } catch (error) {
      console.error("Eroare la adăugarea proiectului:", error);
    }
  };

  const addMemberRow = () => {
    setMembers([...members, { name: "", id: "" }]);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Adaugă un proiect nou</h1>

        {/* Selectare echipă */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Echipe disponibile</h2>
        <select
          value={selectedTeamId}
          onChange={(e) => setSelectedTeamId(e.target.value)}
          className="block w-full px-4 py-2 mb-6 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <option value="">Selectează o echipă</option>
          {teamIds.map((id) => (
            <option key={id} value={id}>{`Echipa ID: ${id}`}</option>
          ))}
        </select>

        {/* Creare echipă nouă */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Crează o echipă nouă</h2>
        <input
          type="text"
          placeholder="Nume echipă"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        {members.map((member, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Nume membru"
              value={member.name}
              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="number"
              placeholder="ID membru"
              value={member.id}
              onChange={(e) => handleMemberChange(index, "id", e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
        ))}
        <button
          onClick={addMemberRow}
          className="bg-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-700 focus:outline-none mb-4"
        >
          + Adaugă membru
        </button>
        <button
          onClick={createNewTeam}
          className={`w-full px-6 py-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 focus:outline-none mb-6 ${loading && "opacity-50 cursor-not-allowed"}`}
          disabled={loading}
        >
          Creează echipă
        </button>

        {/* Adăugare proiect */}
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Detalii proiect</h2>
        <input
          type="text"
          placeholder="Nume proiect"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          type="text"
          placeholder="Repository proiect"
          value={repository}
          onChange={(e) => setRepository(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          onClick={addProject}
          className="w-full bg-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-700 focus:outline-none"
        >
          Adaugă proiect
        </button>
      </div>
    </div>
  );
};

export default AdaugaProiect;
