import React, {useState} from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({saveSearch}) => {

    const [term, saveTerm] = useState('');
    const [error, saveError]= useState(false);

    const searchImages = e => {
        e.preventDefault();

        //validar
        if(term.trim()===''){
            saveError(true);
            return;
        }
        saveError(false);

        //enviar el termino de busqueda hacia el componente principal
        saveSearch(term);
    }

    return (
        <form
            onSubmit={searchImages}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: Futbol o Café"
                        onChange= {e=> saveTerm(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div>
            </div>
            {error ? <Error message="Agrega un término de busqueda"/> :null}
        </form>
     );
}

Form.propTypes = {
    saveSearch: PropTypes.func.isRequired
}

export default Form;