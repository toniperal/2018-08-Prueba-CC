import React, { Component } from 'react';

export default class Backend extends Component {
    constructor (props){
        super(props);
        this.state = {
            title: 'Backend Productos',
            act:0,
            index:'',
            productos:[
            {nombre:'producto1',
            referencia:'referencia1',
            precio:'23'},
            {nombre:'producto2',
            referencia:'referencia2',
            precio:'45'},

        ]
        };
    }

    componentDidMount(){
        this.comprobar_Login();
        this.refs.nombre.focus();
    }

    //Función que valida si estamos logueados
    comprobar_Login = () => {
        var backend_local = localStorage.getItem('backend_local');

        if(backend_local === null){
            this.props.history.push("/");
    
        }else if(backend_local === 'true'){
                this.props.history.push("/backend");
              }
        }
    
    //Función para insertar nuevo producto
    newProduct = (event) =>{
        
        event.preventDefault();

        if(this.handleValidation() ===0 ){
            return;
        }
        let productos = this.state.productos;
        let nombre = this.refs.nombre.value;
        let referencia = this.refs.referencia.value;
        let precio = this.refs.precio.value;

       

        if(this.state.act === 0){
            
            let producto = {       //nuevo
                nombre, referencia, precio
            }
            productos.push(producto);
        }else{ 
            //actualiza      
            let index = this.state.index;
            productos[index].nombre = nombre;
            productos[index].referencia = referencia;
            productos[index].precio = precio;

        }
       

        this.setState({
            productos:productos,
            act:0
        });

        this.resetForm();

    }

    //Función para resetear los campos del formulario
    resetForm(){
        this.refs.myForm.reset();
        this.refs.nombre.focus();
    }

    //Función que elimina el producto
    deleteProduct = (i) =>{

        let productos = this.state.productos;
        productos.splice(i,1);
        this.setState({
            productos: productos
        })
        this.resetForm();
    }

    //Función que manda al formulario los campos para editar
    editProduct = (i) =>{

        let producto = this.state.productos[i];
        this.refs.nombre.value = producto.nombre;
        this.refs.referencia.value = producto.referencia;
        this.refs.precio.value = producto.precio;

        this.setState({
            act:1,
            index:i
        });

        this.refs.nombre.focus();

    }

    //Funcion que cambia el texto del boton segun este en modo crear producto o editar
    stateAct(){
        let st_act = this.state.act;
        if(st_act === 0){
            var text_Button = 'Añadir Nuevo';
          
        }else{
            var text_Button = 'Guardar Cambios';
           
        }

        return text_Button ;
        

    }

    //Funcion para cerrar la sesión del usuario
    closedSession(){
        localStorage.clear();
        this.comprobar_Login();
    }

    //Validación para que los inputs no esten vacios
    handleValidation(){
        let nombre = this.refs.nombre.value;
        let referencia = this.refs.referencia.value;
        let precio = this.refs.precio.value;
    
        //Name
        if(nombre.length == 0 || referencia.length == 0 || precio.length == 0){
         alert('Todos los campos tienen que estar llenos');
         return 0;
        }
        return 1;
    }
    

    render(){
        let productos = this.state.productos;

        return (
            <div>
                <h2>{this.state.title}</h2>
                <div className="float-right">
                <button type="text" className="btn btn-secondary btn-sm pull-right" onClick={()=>this.closedSession()}>Cerrar sesión</button>
                </div>
                    <br />
                    <br />
            <div>
                <form ref="myForm" className="form-inline justify-content-md-center myForm">
                    <div class="form-row">
                        <div class="col-auto">
                            <input type="text" ref="nombre" className="form-control" placeholder="Nombre producto" />
                        </div>
                        <div class="col-auto">
                            <input type="text" ref="referencia" className="form-control" placeholder="Referencia" />
                        </div>
                        <div class="col-auto">
                            <input type="number" ref="precio" className="form-control" placeholder="Precio"/>
                        </div>
                        <div class="col-auto">
                            <button className="btn btn-primary" ref="buttonsubmit" onClick={(e)=>this.newProduct(e)} >
                            {this.stateAct()}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <br /><br />
            <div>
          
                <table class="table" >
                    <thead class="thead-dark">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Referencia</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                {productos.map((producto, i)=>
                
                    <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{producto.nombre}</td>
                    <td>{producto.referencia}</td>
                    <td>{producto.precio}</td>
                    <td><button onClick={()=>this.editProduct(i)} className="btn btn-warning btn-sm">Editar</button></td>
                    <td><button onClick={()=>this.deleteProduct(i)} className="btn btn-danger btn-sm">Eliminar</button></td>
                    </tr>
                )}
                  </tbody>
                </table>
          
            </div>
            </div>
          );
    }
}