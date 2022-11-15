import Navbar from "./Componets/Navbar";

const CrearCategoria = () => {
    return (<>
    <Navbar/>
        <div className='container p-4 vh-100 border rounded shadow'>
            <h2 className='text-success text-center text-uppercase fs-1'>Crear Categoría</h2>
            <hr />
            <form>
                <div className="row text-success d-flex mb-3">
                    <label for="nombre_categoria" className="form-label">Nombre de la categoría</label>
                    <input type="text" className="form-control" id="nombre_categoria" aria-describedby="emailHelp" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="tipo_categria" className="form-label">Tipo de la categoría</label>
                    <input type="text" className="form-control" id="tipo_categoria" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <span>Prioridad de la categoría</span>
                    <select for="prioridad_categoria" className="form-select">
                        <option className="form-control" id="prioridad_categoria">1</option>
                        <option className="form-control" id="prioridad_categoria">2</option>
                        <option className="form-control" id="prioridad_categoria">3</option>
                    </select>
                </div>
                <br />
                <div className='d-flex justify-content-center'>
                    <buttom type="submit" className="btn btn-success col-4" value="Crear">Crear Categoría</buttom>
                </div>
            </form>
        </div>
    </>
    )

}

export default CrearCategoria;