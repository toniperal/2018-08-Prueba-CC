import React, { Component } from 'react';
import save_storage from './Session';

//JQUERY
import $ from 'jquery';

import { mail_Predefinido,pass_Predefinido } from './../../constants/LoginData';

export default class Login extends Component{

    constructor() {
        super();
        this.state = {
            mail: '',
            pass: '',
            backend: 'false',
        };
      }    
      
      componentDidMount(){
        this.comprobar_Login();

        //Funcion Jquery para validar que los campos del login no esten vacios
        $('#submit').click(function(){
            if($('#email').val() == '' || $('#pass').val() == ''){
               alert('Los campos no pueden estar vacios --  Alerta JQUERY');
            }
         });
      }

      //Función que valida si estamos logueados
      comprobar_Login = () => {
        var backend_local = localStorage.getItem('backend_local');

        if(backend_local === null){
            //alert('No logueado');
            this.props.history.push("/");
    
        }else if(backend_local === 'true'){
                //alert('logueado');
                this.props.history.push("/backend");
          
              }
        }
    
    //Función que cambia el estado del objeto, pasando el correo y el pass
    handleChange = (event) => {
        
        this.setState( {
            [event.target.name]: event.target.value
        });
    }

    //Función que valida el correo y la contraseña
    handleSubmit = (event) => {
        
        event.preventDefault();

        if(this.state.mail === mail_Predefinido && this.state.pass === pass_Predefinido){
            save_storage(this.state.mail);
            this.comprobar_Login();
        }else{
            alert('Datos incorrectos')
        }
        
        
    }


    

    render (){
        return (
        <div className="row">
            <div className="col-sm">
    
            </div> 
            <div className="col-sm">
                <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                <label>Email:prueba@cecotec.com</label>
                <input type="email"
                    id="email"
                    className="form-control" 
                    placeholder="Enter email"
                    name="mail" 
                    value={this.state.value} 
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                <label >Contraseña:Cecotec</label>
                <input type="password" 
                    id="pass"
                    className="form-control"
                    placeholder="Contraseña"
                    name="pass" 
                    value={this.state.value} 
                    onChange={this.handleChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" id="submit">Entrar</button>
                </form>
            </div>
            <div className="col-sm">
    
            </div> 
        </div>
        );
    }
}