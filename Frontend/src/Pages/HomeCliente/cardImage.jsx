import Loader from '../SpinnerBorder'
import './Cliente.css';

const CardImage = ({ item }) => {

    return (
        <>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Detalle de producto</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center m-2">
                        <img className='img img-fluid rounded' src={!item.url_image ? <Loader /> : item.url_image} alt='Cargando...' srcset="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardImage;