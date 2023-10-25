
const SpinnerGrow = () => {

    return (
        <>
            <div className="d-flex justify-content-center vh-100 align-items-center">
                <div className="d-flex justify-content-center me-3">
                    <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center me-3">
                    <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpinnerGrow;