import React, {Component} from 'react';
import Cabecalho from '../../components/Cabecalho/Cabecalho';
import Rodape from '../../components/Rodape/Rodape';
import api from '../../services/api';
import { MDBBtn, MDBAlert } from "mdbreact";

export default class Eventos extends Component{

    constructor(){
        super()
        this.state = {
            
            listaEventos        : [],
            listaCategorias     : [],
            listaLocalizacao    : [],
            
            postEvento : {
                titulo: "",
                categoriaId: "",
                acessoLivre: "",
                dataEvento: "",
                localizacaoId: "",
            },

            putEvento : {
                eventoId: "",
                titulo: "",
                categoriaId: "",
                acessoLivre: "",
                dataEvento: "",
                localizacaoId: "",
            },

            erroMsg : "",
        }

    }

    componentDidMount(){
        this.getEventos();
        this.getCategorias();
        this.getLocalizacao();
    }

    //#region GETs
    getEventos = () =>{
        api.get('/eventos')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaEventos : response.data })
            }
        })
    }

    getCategorias = () => {
        api.get('/categoria')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaCategorias : response.data })
            }
        })
    }

    getLocalizacao = () => {
        api.get('/localizacao')
        .then(response => {
            if(response.status === 200){
                this.setState({ listaLocalizacao : response.data })
            }
        })
    }
    //#endregion


    //#region POSTs
    postSetState = (input) =>{
        this.setState({
            postEvento : {
                ...this.state.postEvento, [input.target.name] : input.target.value
            }
        })
    }

    postEvento = (e) =>{

        e.preventDefault();

        // Converter para booleano
        if(this.state.postEvento.acessoLivre === "0"){ 
            this.state.postEvento.acessoLivre = false 
        }else{
            this.state.postEvento.acessoLivre = true
        }

        api.post('/eventos', this.state.postEvento)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({ erroMsg : "Não foi possível cadastrar evento" });
        })

        setTimeout(() => {
            this.getEventos();
        }, 1500);
    }
    //#endregion

    render(){
       return(
           <>
            <Cabecalho />

            <main className="conteudoPrincipal">
                <section className="conteudoPrincipal-cadastro">
                    <h1 className="conteudoPrincipal-cadastro-titulo">Eventos</h1>
                    <div className="container" id="conteudoPrincipal-lista">
                    <table id="tabela-lista">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Evento</th>
                            <th>Data</th>
                            <th>Acesso Livre</th>
                            <th>Categoria</th>
                            <th>Localização</th>
                            <th>Ações</th>
                        </tr>
                        </thead>

                        <tbody id="tabela-lista-corpo">
                            {
                                this.state.listaEventos.map( 
                                    function (e) {
                                        return(
                                            <tr key={e.eventoId}>
                                                <td>{e.eventoId}</td>
                                                <td>{e.titulo}</td> 
                                                <td>{e.dataEvento}</td>
                                                <td>
                                                    {e.acessoLivre && "Sim"}
                                                    {!e.acessoLivre && "Não"}
                                                </td>
                                                <td>{e.categoria.titulo}</td>
                                                {/* <td>{e.localizacao.endereco}</td> */}
                                                <td>
                                                    <MDBBtn color="primary" size="sm">
                                                        <i className="fas fa-edit"></i>
                                                    </MDBBtn>
                                                    <br />
                                                    <MDBBtn color="danger" size="sm">
                                                        <i className="fas fa-trash"></i>
                                                    </MDBBtn>
                                                </td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                    </div>

                    <div className="container" id="conteudoPrincipal-cadastro">
                    <h2 className="conteudoPrincipal-cadastro-titulo">Cadastrar Evento</h2>
                    <form onSubmit={this.postEvento}>    
                    <div className="container">
                        <input
                            type="text"
                            id="evento__titulo"
                            placeholder="título do evento"
                            name="titulo"
                            value={this.state.listaEventos.titulo}
                            onChange={this.postSetState}
                        />
                        <input 
                            type="datetime-local" 
                            id="evento__data" 
                            placeholder="dd/MM/yyyy"
                            name="dataEvento"
                            value={this.state.listaEventos.dataEvento}
                            onChange={this.postSetState}
                        />
                        <select id="option__acessolivre"
                            name="acessoLivre"
                            value={this.state.postEvento.acessoLivre}
                            onChange={this.postSetState}
                        >
                            <option value="1">Livre</option>
                            <option value="0">Restrito</option>
                        </select>
                        <select id="option__tipoevento"
                            name="categoriaId"
                            value={this.state.listaEventos.categoriaId}
                            onChange={this.postSetState}
                        >
                            <option value="">Escolha uma categoria...</option>
                            {
                                this.state.listaCategorias.map( function(c){
                                    return(
                                        <option 
                                            key={c.categoriaId}
                                            value={c.categoriaId}
                                        >
                                            {c.titulo}
                                        </option>
                                    )
                                })
                            }
                        </select>

                        <select id="option__enderecoevento"
                            name="localizacaoId"
                            value={this.state.listaEventos.localizacaoId}
                            onChange={this.postSetState}
                        >
                        <option value="">Escolha um endereço...</option>
                        {
                                this.state.listaLocalizacao.map( function(l){
                                    return(
                                        <option 
                                            key={l.localizacaoId}
                                            value={l.localizacaoId}
                                        >
                                            {l.endereco}
                                        </option>
                                    )
                                })
                            }                        
                        </select>

                    <button
                        className="conteudoPrincipal-btn conteudoPrincipal-btn-cadastro"
                        type="submit"
                    >
                        Cadastrar
                    </button>
                    {
                        this.state.erroMsg && 
                        <MDBAlert color="danger" >
                            {this.state.erroMsg}
                        </MDBAlert>
                    }
                    </div>

                    </form>


                    </div>
                </section>


            </main>

            <Rodape />
           </>
       ) 
    }

}