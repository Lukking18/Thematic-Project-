const searchMovies = (queryParams = {}) => {

    const url = new URL("http://localhost:3333/search");

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
            url.searchParams.append(key, value);
        }
    });

    return fetch(url)
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }
        else{
            throw 'something went wrong'
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

export const coreService = {
    searchMovies
}