
  const firebaseConfig = {
    apiKey: "AIzaSyCcSwxd4reb8Xj4qX7NRA4ts9FZb9SkpzQ",
    authDomain: "loginregister-d7a0a.firebaseapp.com",
    projectId: "loginregister-d7a0a",
    storageBucket: "loginregister-d7a0a.appspot.com",
    messagingSenderId: "569803298341",
    appId: "1:569803298341:web:3a78f44136969e958e91cc",
    measurementId: "G-ZCZF0VFKS7"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()
  const database = firebase.database()
  
  function register () {
    console.log("Hui"); 
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
  
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
    }
    if (validate_field(full_name) == false) {
      alert('One or More Extra Fields is Outta Line!!')
      return
    }
   
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        email : email,
        full_name : full_name,
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).set(user_data)
  
      alert('User Created!!')
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  function login () {
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      var user = auth.currentUser
  
      var database_ref = database.ref()
  
      var user_data = {
        last_login : Date.now()
      }
  
      database_ref.child('users/' + user.uid).update(user_data)
  
      alert('User Logged In!!')
      
        window.location.href = "index.html";
    })
    .catch(function(error) {
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      return true
    } else {
      return false
    }
  }
  
  function validate_password(password) {
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
  