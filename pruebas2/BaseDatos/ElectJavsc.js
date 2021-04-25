firebase.initializeApp({
    apiKey: "AIzaSyD0wmrntOiG93l3aeaK2l7dOLsUlFmn7JQ",
    authDomain: "electivabased.firebaseapp.com",
    projectId: "electivabased",
});
var db = firebase.firestore();





//Agregar datos
function guardar(resultado,Nombres,Apellidos,Cedula,Telefono,Salario,Diastrabajado,mes,ValorDia){
    Nombres = document.getElementById('nombres').value;
     Apellidos = document.getElementById('apellidos').value;
     Cedula = document.getElementById('cedula').value;
     Telefono = document.getElementById('telefono').value;
     Email = document.getElementById('email').value;
     Salario = document.getElementById('salario').value;
     Diastrabajado = document.getElementById('diastrabajado').value;
     mes =30;
     ValorDia = parseInt(Math.trunc(Salario)/mes);
     resultado = parseInt(Diastrabajado)*parseInt(ValorDia);
   
   
    
   

    db.collection("usuarios").add({
        Nombres: Nombres,
        Apellidos: Apellidos,
        Cedula:Cedula,
        Telefono:Telefono,
        Email: Email,
        Salario:Salario,
        Diastrabajado:Diastrabajado,
        resultado:resultado,
        
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombres').value = '';
        document.getElementById('apellidos').value = '';
        document.getElementById('cedula').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('email').value = '';
        document.getElementById('salario').value = '';
        document.getElementById('diastrabajado').value = '';
        document.getElementById('resultado').value = '';
        
        
       
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}
//Leer documentos

var tabla = document.getElementById('tabla');
db.collection("usuarios").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
        var mes =30;
        var ValorDia = parseInt(Math.trunc(doc.data().Salario)/mes);
        var resultado = parseInt(doc.data().Diastrabajado)*parseInt(ValorDia);
        console.log(resultado);

    
        
        //console.log(parseInt(Math.trunc(doc.data().Salario)/mes));
       
        tabla.innerHTML += `
        <tr>
        <td scope="row">${doc.id}</td>
        <td>${doc.data().Nombres}</td>
        <td>${doc.data().Apellidos}</td>
        <td>${doc.data().Cedula}</td>
        <td>${doc.data().Telefono}</td>
        <td>${doc.data().Email}</td>
        <td>${doc.data().Salario}</td>
        <td>${doc.data().Diastrabajado}</td>
       

        <td>${doc.data().resultado}</td>

      
        <td><button type="button" class="btn btn-warning" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <i class="fas fa-trash-alt"></i>
        
        <td><button type="button" class="btn btn-primary" onclick="editar('${doc.id}','${doc.data().Nombres}','${doc.data().Apellidos}','${doc.data().Cedula}','${doc.data().Telefono}','${doc.data().Email}','${doc.data().Salario}','${doc.data().Diastrabajado}','${doc.data().resultado}')">Editar</button></td>
        </tr>
        `
    });
});
//Eliminar documentos
function eliminar(id){
    db.collection("usuarios").doc(id).delete().then(function(){
        console.log("Document successfully deleted!");
    }).catch(function(error){
        console.error("Error removing document: ", error);
    });
}
//Editar documentos
function editar(id,Nombres,Apellidos,Cedula,Telefono,Email,Salario,Diastrabajado,Total,Transporte,resultado){
     mes =30;
     ValorDia = parseInt(Math.trunc(Salario)/mes);
     resultado = parseInt(Diastrabajado)*parseInt(ValorDia);
    document.getElementById('nombres').value = Nombres;
    document.getElementById('apellidos').value = Apellidos;
    document.getElementById('cedula').value = Cedula;
    document.getElementById('telefono').value = Telefono;
    document.getElementById('email').value = Email;
    document.getElementById('salario').value = Salario;
    document.getElementById('diastrabajado').value = Diastrabajado;
    document.getElementById('resultado').value = resultado;


    
    

   
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';
    boton.onclick = function(){
  
       
        
     mes =30;
     ValorDia = parseInt(Math.trunc(Salario)/mes);
     resultado = parseInt(Diastrabajado)*parseInt(ValorDia);
        var actualizar = db.collection("usuarios").doc(id);
        var Nombres = document.getElementById('nombres').value;
        var Apellidos = document.getElementById('apellidos').value;
        var Cedula = document.getElementById('cedula').value;
        var Telefono = document.getElementById('telefono').value;
        var Email = document.getElementById('email').value;
        var Salario = document.getElementById('salario').value;
        var Diastrabajado = document.getElementById('diastrabajado').value;
        var resultado = document.getElementById('resultado').value;
    
      
        
        return actualizar.update({
             Nombres: Nombres,
             Apellidos: Apellidos,
             Cedula:Cedula,
             Telefono:Telefono,
             Email: Email,
             Salario:Salario,
             Diastrabajado:Diastrabajado,
             resultado:resultado,
          
            
        })
        .then(function(){
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            mes =30;
            ValorDia = parseInt(Math.trunc(Salario)/mes);
            resultado = parseInt(Diastrabajado)*parseInt(ValorDia);
            document.getElementById('nombres').value = '';
            document.getElementById('apellidos').value = '';
            document.getElementById('cedula').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('email').value = '';
            document.getElementById('salario').value = '';
            document.getElementById('diastrabajado').value = '';
            document.getElementById('resultado').value = '';
        })
        .catch(function(error){
            console.error("Error updating document: ",error);
        });
    }
}