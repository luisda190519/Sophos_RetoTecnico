import React, { useState, useEffect } from "react";
import { putRequest } from "../Utils/Request";

function TableEdit({ headValues, data }) {
  const [editedData, setEditedData] = useState(data);

  const handleInputChange = (gameID, newValue) => {
    const updatedData = editedData.map((game) =>
      game.gameID === gameID ? { ...game, price: newValue } : game
    );
    setEditedData(updatedData);
  };

  const handleSaveClick = async (gameID, newPrice) => {
    try {
      const response = await putRequest(`/Games/${gameID}/changegameprice/${newPrice}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  if (!editedData || editedData.length === 0) {
    // Render a message or loading indicator when data is empty or null
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-3">
      <table className="table table-dark table-striped fs-5">
        <thead>
          <tr>
            {headValues.map((value, key) => (
              <th key={key} scope="col">
                {value}
              </th>
            ))}
            <th>Opción</th>
          </tr>
        </thead>
        <tbody>
          {editedData.map((d, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(d).map((key, colIndex) => (
                <td key={colIndex}>
                  {key === "price" ? (
                    <input
                      type="text"
                      className="input-group-text text-start"
                      value={d[key]}
                      onChange={(e) =>
                        handleInputChange(d.gameID, e.target.value)
                      }
                    />
                  ) : (
                    d[key]
                  )}
                </td>
              ))}
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleSaveClick(d.gameID, d.price)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableEdit;
