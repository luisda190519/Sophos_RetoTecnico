function GameSets({ title, type }) {
    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col d-flex justify-content-start">
                        <h2 className="text-white">{title}</h2>;
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button className="btn btn-secondary">Ver todo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameSets;
