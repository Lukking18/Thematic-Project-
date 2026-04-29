const viewReview = (movie_id) =>{
    return fetch(`http://localhost:3333/review/${movie_id}`)

        
        .then((response) => {
            if(response.status === 200){
                return response.json();
            } else{
                throw 'Internal Server Error'
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((err) => {
            console.log("Err", err)
            return Promise.reject(err)
        })
    
}

const postReview = (movie_id, review) => {
    return fetch(`http://localhost:3333/review/${movie_id}`,
        {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("session_token")
        },
        body: JSON.stringify({
            "review_body": review,
        })
    })
    .then((response)=> {
        if(response.status === 200){
            return response.json()
        } else if(response.status === 400){
            throw 'Bad request'
        } else {
            throw 'Internal Servevr error'
        }
    }) 
    .then((resJson)=> {
        return resJson
    })
    .catch((err)=> {
        console.log("Err", err)
        return Promise.reject(err)
    })
}

export const reviewService = {
    viewReview,
    postReview
}