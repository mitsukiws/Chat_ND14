document.querySelector("form.register").addEventListener("submit", (e)=>{
    e.preventDefault() 
    let data = new FormData(e.target)
    let login = data.get("password")
    let password = data.get("password")
    let passwordR = data.get("passwordR")
    console.log(login, password, passwordR)
    e.preventDefault()
    console.log(login, password, passwordR)
    if(password != passwordR){ 
        alert("пароль не зберігся")
        return

    }
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({login, password})
    }).then(res=>res.json()).then(res=>console.log)

})

