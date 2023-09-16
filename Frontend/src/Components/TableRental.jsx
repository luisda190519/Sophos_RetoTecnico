import React, { useState, useEffect } from "react";
import { putRequest } from "../Utils/Request";

function TableRental({ data }) {
    const [editedData, setEditedData] = useState(data);


    const handleSaveClick = async (e, rentalID) => {
        e.preventDefault();
        try {
            const response = await putRequest(
                `/Rental/${rentalID}/finish`
            );
            
                if(response === "Rental marked as finished."){
                    alert("Recarge la pagina para ver los cambios") 
                }

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setEditedData(data);
    }, [data]);

    if (!editedData || editedData.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-3">
            <table className="table table-dark table-striped fs-5">
                <thead>
                    <tr>
                        <th>Cliente ID</th>
                        <th>Titulo</th>
                        <th>Balance</th>
                        <th>Finalizar</th>
                    </tr>
                </thead>
                <tbody>
                    {editedData.map((d, rowIndex) => (
                        <tr key={rowIndex}>
                            <td>{d.customerID}</td>
                            <td>{d.gameTitle}</td>
                            <td>{d.totalBalance}</td>
                            <td>
                                <button
                                    className="btn btn-secondary"
                                    onClick={(e) => handleSaveClick(e, d.rentalID)}
                                >
                                    Finalizar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableRental;
