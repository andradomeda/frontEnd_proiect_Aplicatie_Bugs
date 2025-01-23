import React, { useEffect, useState } from 'react';
import NavigationBar from "../../Components/NavBar/NavBar.jsx";

import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Pentru redirecționare
import { useGlobalContext } from '../../GlobalContext';

const ProiecteMP = () => {
    const [proiecte, setProiecte] = useState([]);
    const [numarProiecte, setNumarProiecte] = useState(0);
    const { userId } = useGlobalContext();
    const navigate = useNavigate(); // Hook pentru navigare

    const mpId = userId;

    useEffect(() => {
        const fetchProiecte = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/membru/${mpId}/proiecte`);
                if (response.status === 200) {
                    const proiecteData = response.data.data;
                    if (Array.isArray(proiecteData)) {
                        setProiecte(proiecteData);
                        setNumarProiecte(proiecteData.length);
                    } else {
                        setProiecte([proiecteData]);
                        setNumarProiecte(1);
                    }
                }
            } catch (error) {
                console.error("Eroare la obținerea proiectelor: ", error);
            }
        };

        fetchProiecte();
    }, [mpId]);

    const handleVeziDetaliiBugs = () => {
        navigate(`/ProiecteSiBugs`);
    };

    return (
        <div>
            <NavigationBar />
           
            <div className="container mx-auto mt-5">
                <h2 className="text-xl font-bold mb-4">
                    Număr de proiecte din care face parte MP-ul: {numarProiecte}
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nume Proiect</th>
                                <th>Repository</th>
                                <th>Id Echipa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {proiecte.map((proiect, index) => (
                                <tr key={proiect.id}>
                                    <td>{index + 1}</td>
                                    <td>{proiect.Nume}</td>
                                    <td>
                                        <a href={proiect.Repository} target="_blank" rel="noopener noreferrer">
                                            {proiect.Repository}
                                        </a>
                                    </td>
                                    <td>{proiect.EchipaId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-4">
                    <button
                        className="btn btn-primary"
                        onClick={handleVeziDetaliiBugs}
                    >
                        Vezi Detalii Bugs
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProiecteMP;
