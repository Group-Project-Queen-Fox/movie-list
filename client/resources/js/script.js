
const baseUrl = `http://localhost:3000`

$(document).ready(() => {
    auth()
})

const auth = () => {
    if(localStorage.access_token) {
        $('header').show()
        $('.section-login').hide()
        $('.section-movies').show()
    } else {
        $('header').hide()
        $('.section-login').show()
        $('.section-movies').hide()

    }
}

const login = () => {
    const email = $('.email-login').val()
    const password = $('.email-password').val()

    $.ajax({
        method: "post",
        url: baseUrl + '/',
        data: {
            email, password
        }
        
    })
        .done(() => {
            localStorage.setItem('access_token', 'test')
            auth()
        })
        .fail(err => {
            $('.alert-login').empty()
            $('.alert-login').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR!</strong> ${err.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })

}

const search = (event) => {
    event.preventDefault()
    const title = $('.search-title').val()

    $.ajax({
        method: "post",
        url: baseUrl + '/',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title
        }
    })
        .done(data => {
            $('.table-body').empty()
            data.forEach((el,i) => {
                $('.table-body').append(`
                    <tr>
                      <th scope="row">${i+1}</th>
                      <td>${el.title}</td>
                      <td>${el.details}</td>
                      <td>
                      <a onclick="getUrl('${el.title}')" href="#">Watch trailer >>></a>
                      </td>
                    </tr>
                `)
                
            })
        })
        .fail(err => {
            $('.alert-movies').empty()
            $('.alert-movies').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR!</strong> ${err.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
}


const getUrl = (title) => {
    $.ajax({
        method: "get",
        url: baseUrl + '/',
        headers: {
            access_token: localStorage.access_token
        },
        data: { title }
    })
        .done(data => {
            window.open(data.url, '_blank')
        })
        .fail(err => {
            $('.alert-movies').empty()
            $('.alert-movies').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR!</strong> ${err.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
}