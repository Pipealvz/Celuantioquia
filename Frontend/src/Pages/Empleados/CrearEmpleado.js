
import Navbar from '../Componets/Navbar';

const CrearEmpleado = () => {

    return (<>
        <Navbar />
        <div className='container p-5 vh-50 border rounded shadow' style={{marginBottom: '5rem'}}>
            <h2 className='text-success text-center text-uppercase fs-1'>Registrar Empleado</h2>
            <hr />
            <form>
                <div className="row text-success d-flex mb-3">
                    <label for="documento_empleado" className="form-label"style={{padding: '0rem 1.5rem'}}>Documento de identidad</label>
                    <div className="input-group">
                        <select className="input-group-text bg-success form-select text-light">
                            <option value="CC">Cédula ciudadana</option>
                            <option value="CE" >Cédula extranjera</option>
                        </select>
                        <input type="number" min="1" style={{width: '40rem'}} className="form-control" id="documento_empleado" />
                    </div>
                </div>
                <div className="row text-success d-flex mb-4" style={{padding: '0rem 0.7rem 0rem 0.7rem'}}>
                    <label for="nombre_empleado" className="form-label" style={{padding: '0rem 0.7rem'}}>Nombre del empleado</label>
                    <input type="text" className="form-control" id="nombre_empleado"/>
                </div>
                <div className="row text-success d-flex  mb-3"style={{padding: '0rem 0.7rem 0rem 0.7rem'}}>
                    <label for="correo_empleado" className="form-label">Correo del empleado</label>
                    <input type="email" className="form-control" id="correo_empleado" />
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="contraseña_empleado" className="form-label" style={{padding: '0rem 1.5rem'}}>Contraseña del empleado</label>
                    <div className="input-group">
                        <input type="password" className="form-control" id="contraseña_empleado" />
                    </div>
                </div>
                <div className="row text-success d-flex  mb-3">
                    <label for="telefono_empleado" className="form-label"style={{padding: '0rem 1.5rem'}}>Teléfono del empleado</label>
                    <div className="input-group">
                        <span className="input-group-text bg-success text-light">📱 604 / +57</span>
                        <input type="number" min="1" className="form-control" id="telefono_empleado" placeholder="Número de teléfono o celular" />
                    </div>
                </div>
                <div className="row text-success d-flex  mb-3" style={{padding: '0rem 0.7rem 0rem 0.7rem'}}>
                    <label for="rol_empleado" className="form-label">Rol del empleado</label>
                    <select for="rol_empleado" className="form-select">
                        <option className="form-control" id="rol_empleado">Administrador</option>
                        <option className="form-control" id="rol_empleado">Empleado</option>
                    </select>
                </div>
                
                <div className="row text-success d-flex  mb-3"style={{padding: '0rem 0.7rem 0rem 0.7rem'}}>
                    <label for="direccion_empleado" className="form-label">Dirección del empleado</label>
                    <input type="text" className="form-control" id="direccion_empleado" />
                </div>

                <br />
                <div className='d-flex justify-content-center'>
                    <buttom type="submit" className="btn btn-success col-4" value="Crear">Registrar Empleado</buttom>
                </div>
                <br />
            </form>            
        </div>
    </>
    )

}

export default CrearEmpleado;