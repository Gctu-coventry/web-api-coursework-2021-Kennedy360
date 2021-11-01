document.addEventListener("DOMContentLoaded", function(){
    const logout = document.getElementById("logout");
logout.addEventListener('click',()=>{
    document.cookie = "User=";
    document.location="http://localhost:5000/fras/login"
})
})