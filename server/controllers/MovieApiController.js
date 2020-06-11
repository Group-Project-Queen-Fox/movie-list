const axios = require('axios');

class MovieApiController{
    static get(req, res, next) {
        axios({
            "method": "GET",
            "url": `https://api.themoviedb.org/3/search/movie?api_key=123194211dacccaee4ea6b5db5d78094&query=${ req.body.search }&page=1`,
        })
            .then((response) => {
                res.status(200).json(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

module.exports = MovieApiController;