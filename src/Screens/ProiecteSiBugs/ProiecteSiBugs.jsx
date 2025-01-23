import React, { useEffect, useState } from 'react';
import NavigationBar from "../../Components/NavBar/NavBar.jsx";
import axios from 'axios';
import { useGlobalContext } from '../../GlobalContext';

const ProiecteSiBugs = () => {
    const [proiecte, setProiecte] = useState([]);
    const [selectedProiectId, setSelectedProiectId] = useState(null);
    const [bugs, setBugs] = useState([]);
    const [newCommitLink, setNewCommitLink] = useState("");
    const { userId } = useGlobalContext();

    useEffect(() => {
        const fetchProiecte = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/membru/${userId}/proiecte`);
                if (response.status === 200) {
                    setProiecte(response.data.data);
                }
            } catch (error) {
                console.error("Eroare la obținerea proiectelor: ", error);
            }
        };

        fetchProiecte();
    }, [userId]);

    useEffect(() => {
        if (selectedProiectId) {
            const fetchBugs = async () => {
                try {
                    const response = await axios.get(`http://localhost:9000/api/proiect/${selectedProiectId}/bugs`);
                    if (response.status === 200) {
                        setBugs(response.data.data);
                    }
                } catch (error) {
                    console.error("Eroare la obținerea bug-urilor: ", error);
                }
            };

            fetchBugs();
        }
    }, [selectedProiectId]);

    const handleSelectProiect = (event) => {
        setSelectedProiectId(parseInt(event.target.value, 10));
    };

    const handleJoinBug = async (bugId) => {
        try {
            const response = await axios.patch(`http://localhost:9000/api/bug/${bugId}`, {
                MembruId: userId,
                Status: "In Progress",
            });
            if (response.status === 200) {
                setBugs((prevBugs) =>
                    prevBugs.map((bug) =>
                        bug.BugId === bugId ? { ...bug, MembruId: userId, Status: "In Progress" } : bug
                    )
                );
            }
        } catch (error) {
            console.error("Eroare la alocarea bug-ului:", error);
        }
    };

    const handleMarkAsFinished = async (bugId) => {
        try {
            const response = await axios.patch(`http://localhost:9000/api/bug/${bugId}`, {
                CommitLink: newCommitLink,
                Status: "Closed",
            });
            if (response.status === 200) {
                setBugs((prevBugs) =>
                    prevBugs.map((bug) =>
                        bug.BugId === bugId ? { ...bug, CommitLink: newCommitLink, Status: "Closed" } : bug
                    )
                );
                setNewCommitLink("");
            }
        } catch (error) {
            console.error("Eroare la finalizarea bug-ului:", error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="container mx-auto mt-5 px-10">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Bine ai venit la pagina Proiecte și Bugs
                </h1>
                <div className="text-center mb-4">
                    <label htmlFor="proiectDropdown" className="mr-2 font-bold">
                        Selectează un proiect:
                    </label>
                    <select
                        id="proiectDropdown"
                        className="border rounded p-2"
                        onChange={handleSelectProiect}
                        value={selectedProiectId || ""}
                    >
                        <option value="" disabled>
                            Alege un proiect
                        </option>
                        {proiecte.map((proiect) => (
                            <option key={proiect.ProiectId} value={proiect.ProiectId}>
                                {proiect.Nume}
                            </option>
                        ))}
                    </select>
                </div>
                {selectedProiectId && (
                    <div>
                        <h2 className="text-xl font-bold text-center mb-4">Lista Bug-uri</h2>
                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse border border-gray-400 w-full">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-400 p-2">Id</th>
                                        <th className="border border-gray-400 p-2">Descriere</th>
                                        <th className="border border-gray-400 p-2">Prioritate</th>
                                        <th className="border border-gray-400 p-2">Severitate</th>
                                        <th className="border border-gray-400 p-2">Status</th>
                                        <th className="border border-gray-400 p-2">Assigned</th>
                                        <th className="border border-gray-400 p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bugs.map((bug) => (
                                        <tr key={bug.BugId}>
                                            <td className="border border-gray-400 p-2">{bug.BugId}</td>
                                            <td className="border border-gray-400 p-2">{bug.Descriere}</td>
                                            <td className="border border-gray-400 p-2">{bug.Prioritate}</td>
                                            <td className="border border-gray-400 p-2">{bug.Severitate}</td>
                                            <td className="border border-gray-400 p-2">{bug.Status}</td>
                                            <td className="border border-gray-400 p-2">
                                                {bug.MembruId ? `Assigned to ${bug.MembruId}` : "Not assigned"}
                                            </td>
                                            <td className="border border-gray-400 p-2">
                                                {bug.Status === "Open" && (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleJoinBug(bug.BugId)}
                                                    >
                                                        Join
                                                    </button>
                                                )}
                                                {bug.Status === "In Progress" && bug.MembruId === userId && (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            placeholder="Commit Link"
                                                            value={newCommitLink}
                                                            onChange={(e) => setNewCommitLink(e.target.value)}
                                                            className="border rounded p-2 mr-2"
                                                        />
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => handleMarkAsFinished(bug.BugId)}
                                                        >
                                                            Mark as Finished
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProiecteSiBugs;
