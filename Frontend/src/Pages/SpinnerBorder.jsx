const SpinnerBorder = () => {

    return (
        <>
            <div className="d-flex justify-content-center vh-100 align-items-center">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SpinnerBorder;