const axios = require('axios');

class MovieApiController{
    static get(req, res, next) {
        const { title } = req.body

        axios({
            "method": "GET",
            "url": `https://api.themoviedb.org/3/search/movie?api_key=123194211dacccaee4ea6b5db5d78094&query=${ title }&page=1`,
        })
            .then((response) => {
                
                res.status(200).json({movies: response.data.results})

            })
            .catch((error) => {
                next({ str_code: error})
            })
    }

    static cast(req, res, next) {

        const { title } = req.body
        let search_params = title.trim().replace(/ /gi, '%2520')
        
        axios({
            method:"GET",
            url:`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${search_params}`,
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
            "x-rapidapi-key":"14c81a20a4mshc1ceafdea64a109p1e678fjsn1a48bb28b089",
            "useQueryString":true
            }
        })
            .then(response => {
                res.status(200).json({cast: response.data.cast})
            })
            .catch((error) => {
                next({ str_code: error})
            })
    }

    
    static getUrl(req,res,next) {
        const { title } = req.body
        let search_params = title.trim().replace(/ /gi, '%2520')

        axios({
            method:"GET",
            url:`https://youtube-search1.p.rapidapi.com/${search_params}%2520trailer`,
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"youtube-search1.p.rapidapi.com",
            "x-rapidapi-key":"b39b000ec3msh0442199e3c3003ap110ef7jsn03bf919f5171",
            "useQueryString":true
            }
        })
            .then((response)=>{
                const { url } = response.data.items[0]
                res.status(200).json({ url})
            })
            .catch((error)=>{
                next({ str_code: error })
            })

    }

}

module.exports = MovieApiController;