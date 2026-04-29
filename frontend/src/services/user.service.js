const login = (email,password) => {
    return fetch("http://localhost:3333/login",{
        
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email,
            "password": password
        })
    
    })
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }else if(response.status === 400){
            throw "Bad request"
        } else{
            throw "Internal Server Error"
        }
    })
    .then((resJson) => {
        localStorage.setItem("user_id", resJson.user_id)
        localStorage.setItem("session_token", resJson.session_token)
        return resJson
    })
    .catch((err) =>{
        console.log("Err",err)
        return Promise.reject(err)
    }) 
}

const logout = () => {
    return fetch("http://localhost:3333/logout",{
        
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem(session_token)
        }
    })
    .then((response)=>{
        if(response.status === 200){
            localStorage.removeItem("user_id")
            localStorage.removeItem("session_token")
            return
        }else if(response.status === 401){
            throw "User not logged in"
        }else{
            throw "Internal Server Error"
        }
    })
.catch((err) => {
    console.log("Err", err)
    return Promise.reject(err)
})
}



const register = (email,password,firstName,lastName) => {
    return fetch("http://localhost:3333/users",
      {
             method: 'POST',
              headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify({
                "email": email,
                "password": password,
                "first_name": firstName,
                "last_name": lastName
               })
        }
    )
    .then((response) => {
        if(response.status === 201){
            return response.json()
        }else if(response.status === 400){
            throw 'Bad request'
        } else {
            throw 'Something went wrong'
        }
    })
    .then((resJson) => {
        localStorage.setItem("user_id", resJson.user_id)
        localStorage.setItem("session_token", resJson.session_token)
        return resJson
    })
    .catch((err) => {
        console.log("Err", err)
        return Promise.reject(err)
    })
}

export const userServices = {
    login,
    logout,
    register
}