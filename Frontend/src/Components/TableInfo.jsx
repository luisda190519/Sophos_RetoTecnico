import React from "react";

function TableInfo({ headValues, data }) {
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
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, rowIndex) => (
                        <tr key={rowIndex}>
                            {Object.keys(d).map((key, colIndex) => (
                                <td key={colIndex}>{d[key] ? d[key] : "NA"}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableInfo;
