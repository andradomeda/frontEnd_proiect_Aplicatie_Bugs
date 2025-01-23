import React, { useEffect, useState } from "react";
import NavigationBar from "../../Components/NavBar/NavBar.jsx";
import { useGlobalContext } from "../../GlobalContext";


const TesterProjects = () => {
  const { userId, role } = useGlobalContext();
  const [proiecte, setProiecte] = useState([]); // Stochează proiectele
  const [selectedProiectId, setSelectedProiectId] = useState(null); // Proiectul selectat pentru bug

  useEffect(() => {
    if (role === "tester") {
      fetch(`/api/tester/${userId}/proiecte`)
        .then((response) => response.json())
        .then((data) => {
          setProiecte(data.data.Proiecte || []); // Setează doar proiectele
        })
        .catch((error) => console.error("Eroare la preluarea proiectelor:", error));
    }
  }, [userId, role]);

  const handleAddBugClick = (proiectId) => {
    setSelectedProiectId(proiectId); // Setează proiectul selectat
  };

  return (
    <div>
      <NavigationBar />
     
      <div className="flex">
        {/* Tabelul cu proiecte */}
        <div className="w-2/3 p-4">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nume Proiect</th>
                  <th>Link Repo</th>
                  <th>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {proiecte.map((proiect, index) => (
                  <tr key={proiect.ProiectId}>
                    <td>{index + 1}</td>
                    <td>{proiect.Nume}</td>
                    <td>
                      <a href={proiect.Repository} target="_blank" rel="noopener noreferrer">
                        {proiect.Repository}
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() => handleAddBugClick(proiect.ProiectId)}
                      >
                        Add Bug
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formular pentru bug */}
        {selectedProiectId && (
          <BugForm
            proiectId={selectedProiectId}
            onBugAdded={() => setSelectedProiectId(null)} // Resetează după adăugare
          />
        )}
      </div>
    </div>
  );
};

// Componenta pentru formular
const BugForm = ({ proiectId, onBugAdded }) => {
  const { userId } = useGlobalContext(); // TesterId din contextul global
  const [formColor, setFormColor] = useState("bg-gray-300");
  const [bugData, setBugData] = useState({
    Descriere: "",
    Severitate: "Low",
    Prioritate: "Low",
    Status: "Open",
    CommitLink: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBugData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bugPayload = {
      ...bugData,
      ProiectId: proiectId,
      TesterId: userId,
      MembruId: null,
    };

    fetch("/api/bug", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bugPayload),
    })
      .then((response) => {
        if (response.ok) {
          alert("Bug added successfully!");
          setFormColor("bg-gray-300"); // Revine la culoarea inițială
          onBugAdded(); // Notifică părintele
        } else {
          alert("Failed to add bug!");
        }
      })
      .catch((error) => console.error("Error adding bug:", error));
  };

  return (
    <div className={`card w-full max-w-sm shadow-2xl ${formColor}`}>
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Descriere</span>
          </label>
          <textarea
            name="Descriere"
            value={bugData.Descriere}
            onChange={handleInputChange}
            placeholder="Descriere bug"
            className="textarea textarea-bordered"
            required
            minLength={5}
            maxLength={1000}
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Severitate</span>
          </label>
          <select
            name="Severitate"
            value={bugData.Severitate}
            onChange={handleInputChange}
            className="select select-bordered"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Prioritate</span>
          </label>
          <select
            name="Prioritate"
            value={bugData.Prioritate}
            onChange={handleInputChange}
            className="select select-bordered"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Commit Link</span>
          </label>
          <input
            type="url"
            name="CommitLink"
            value={bugData.CommitLink}
            onChange={handleInputChange}
            placeholder="https://example.com/commit"
            className="input input-bordered w-full max-w-xs" 
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default TesterProjects;
