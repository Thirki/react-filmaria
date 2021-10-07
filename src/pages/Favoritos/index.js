import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.css';
import { toast } from 'react-toastify';

export default function Favoritos(){
  const [filmes, setfilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem('filmes');
    setfilmes(JSON.parse(minhaLista) || []);
  }, []);

  function handleDelete(id){
    let filtroFilmes = filmes.filter((item) =>{
      return (item.id !== id)
    })

    setfilmes(filtroFilmes);
    localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
    toast.success('🙅Filme exluido com sucesso')
  }

  return(
    <div id="meus-filmes">
      <h1>Meus filmes</h1>

      {filmes.length === 0 && 
      <span>Você não possui nenhum filme salvo :(</span>
      }

      <ul>
        {filmes.map((item) => {
          return(
            <li key={item.id}>
              <span>{item.nome}</span>
              <div>
                <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                <button onClick={ () => handleDelete(item.id) }>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}