
document.querySelector("form.register").addEventListener("submit", (e)=>{
    let data = new FormData(e.target)
    let login = data.get("login")
    let password = data.get("password")
    let passwordR = data.get("passwordR")
    e.preventDefault();
    console.log(login, password, passwordR)
    if(password != passwordR){
        alert("Паролі не збігаються")
        return
    }
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({login, password})
    }).then(res=>res.json()).then(res=>console.log(res))
})