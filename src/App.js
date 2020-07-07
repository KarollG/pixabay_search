import React, {useState, useEffect} from 'react';
import Form from './components/Form';
import ListImages from './components/ListImages';

function App() {

  //state de la app
  const [search, saveSearch] = useState('');
  const [images, saveImages] = useState([]);
  const [pageactual, savePageActual] = useState(1);
  const [totalpages, saveTotalPages] = useState(5);

  useEffect(()=>{
    const consultAPI = async () =>{
      if(search==='') return;

      const imagesPerPage = 30;
      const key = '17201654-e016ef34d613d06d71bc22f1e';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${pageactual}`;

      const answer = await fetch(url);
      const result = await answer.json();

      //console.log(result.hits);
      saveImages(result.hits);

      //calcular el total de paginas
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(calculateTotalPages);

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'});

    }
    consultAPI();
  }, [search, pageactual])

  //definir la pagina anterior
  const previousPage = () =>{
    const newPageactual = pageactual - 1;

    if(newPageactual === 0 ) return;

    savePageActual(newPageactual);
  }

  // definir la pagina siguiente
  const nextPage = () =>{
    const newPageactual = pageactual + 1;

    if(newPageactual > totalpages) return;

    savePageActual(newPageactual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>

          <Form
            saveSearch={saveSearch}
          />
      </div>
      <div className="row justify-content-center">
        <ListImages
          images= {images}
        />

        { (pageactual === 1 )? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={previousPage}
          >&laquo; Anterior </button>
        )}
       { (pageactual === totalpages || images.length === 0) ? null : (
        <button
          type="button"
          className="btn btn-info"
          onClick={nextPage}
        >Siguiente &raquo;</button>
       )}
      </div>
    </div>
  );
}

export default App;
