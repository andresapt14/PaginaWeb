
 


function getCredentiasl(users,pass){
    return document.getElementById(users,pass).value;
  } 

 function insertTask(){

   
    var users = getCredentiasl("users");
    var pass = getCredentiasl("pass");

   
    
   if( users.length==0 || pass.length==0 ){ 
     
    alert("Campos vacios"); 
  
  } else if(  users == 'dany' && pass == 1234 ){ 
     
    window.location="BaseDatos/index.html";
  
  } else{
    alert("Usuario o contraseña invalida !!!"); 
  }
  }
