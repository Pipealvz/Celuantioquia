
import Navbar from '../Pages/Componets/Navbar';

const CrearEmpleado = () => {


    return (<>
        <Navbar />
        <div className='container p-4 vh-auto border rounded shadow'>
            <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
            <hr />
            <form>
                <div className="row text-success d-flex  mb-3">
                    <label for="documento_empleado" className="form-label">Documento de identidad</label>
                    <div className="input-group">
                        <select className="input-group-text bg-success text-light">
                            <option className="form-control" id="rol_empleado">Cédula ciudadana</option>
                            <option className="form-control" id="rol_empleado">Cédula extranjera</option>
                        </select>
                        <input type="number" min="1" className="form-control" id="documento_empleado" />
                    </div>
                </div>
                <div className="row text-success d-flex mb-3">
                    <label for="nombre_empleado" className="form-label">Nombre del empleado</label>
                    <input type="text" className="form-control" id="nombre_empleado"/>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="correo_empleado" className="form-label">Correo del empleado</label>
                    <input type="email" className="form-control" id="correo_empleado" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="contraseña_empleado" className="form-label">Contraseña del empleado</label>
                    <div className="input-group">
                        <input type="password" className="form-control" id="contraseña_empleado" />
                        <button className="btn btn-success text-light">👁</button>
                    </div>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="telefono_empleado" className="form-label">Teléfono del empleado</label>
                    <div className="input-group">
                        <span className="input-group-text bg-success text-light">📱 604 / +57</span>
                        <input type="number" min="1" className="form-control" id="telefono_empleado" placeholder="Número de teléfono o celular" />
                    </div>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <span>Rol del empleado</span>
                    <select for="rol_empleado" className="form-select">
                        <option className="form-control" id="rol_empleado">Administrador</option>
                        <option className="form-control" id="rol_empleado">Empleado</option>
                    </select>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="direccion_empleado" className="form-label">Dirección del empleado</label>
                    <input type="text" className="form-control" id="direccion_empleado" />
                </div>

                <br />
                <div className='d-flex justify-content-center'>
                    <buttom type="submit" className="btn btn-success col-4" value="Crear">Registrar Empleado</buttom>
                </div>
            </form>
            <br />
        </div>
    </>
    )

}

export default CrearEmpleado;