const axios = require('axios');

class MovieApiController{
    static get(req, res, next) {
        axios({
            "method": "GET",
            "url": `https://api.themoviedb.org/3/search/movie?api_key=123194211dacccaee4ea6b5db5d78094&query=${ req.body.title }&page=1`,
        })
            .then((response) => {
                
                res.status(200).json(response.data.results);
            })
            .catch((error) => {
                next({ str_code: error})
            })
    }

    
    static getUrl(req,res,next) {
        const { title } = req.body
        let search_params = title.trim().replace(/ /gi, '%2520') + 'trailer'
        
        axios({
            method:"GET",
            url:`https://youtube-search1.p.rapidapi.com/${search_params}`,
            headers:{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"youtube-search1.p.rapidapi.com",
            "x-rapidapi-key":"14c81a20a4mshc1ceafdea64a109p1e678fjsn1a48bb28b089",
            "useQueryString":true
            }
        })
            .then((response)=>{
                const {url} = response.data.items[0]
                res.status(200).json({ url })
            })
            .catch((error)=>{
                next({ str_code: 'INTERNAL_SERVER_ERROR' })
            })
    }

}

module.exports = MovieApiController;