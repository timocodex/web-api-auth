
function register(){
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/auth',
    data: {email:$("#email").val(),password:$("#password").val()},
    success: function(resp) {
      alert(resp)
    },
    error: function(error) {
      console.log(error);
    }
  });
}

function login(){
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/auth/login',
    data: {email:$("#emaillogin").val(),password:$("#passlogin").val()},
    success: function(resp) {
      if(resp.success==true){
        localStorage.setItem("token",resp.token)
        localStorage.setItem("user",resp.user)
        window.location.href='http://127.0.0.1:8080/home.html'
      }
      else{
        alert(resp.message)
      }
    },
    error: function(error) {
      console.log(error);
    }
  });
}


function show(){
  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/api/auth',
    success: function(resp) {
      $('#tabelEvent').empty()
     resp.forEach(function(datas){
       $('#tabelEvent').append(`
         <tr>
           <td>${datas.email}</td>
           <td>${datas.name}</td>
           <td>${datas.desc}</td>
         </tr>
         `)
     })
    },
    error: function(error) {
      console.log(error);
    }
  });
}
var id = localStorage.getItem("user")
function update(){
  $.ajax({
    type: 'PUT',
    url: `http://localhost:3000/api/auth/${id}`,
    data: {name:$("#name").val(),desc:$("#desc").val()},
    success: function(resp) {
      show()
    },
    error: function(error) {
      console.log(error);
    }
  });
}
function logout(){
  localStorage.clear()
  window.location.href='http://127.0.0.1:8080/index.html'
}
