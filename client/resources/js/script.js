
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

const login = (event) => {
    event.preventDefault()
    const email = $('#email-login').val()
    const password = $('#password-login').val()

    $.ajax({
        method: "post",
        url: baseUrl + '/login',
        data: {
            email, password
        }
        
    })
        .done(data => {
            localStorage.setItem('access_token', data.access_token)
            auth()
        })
        .fail(err => {
            $('.alert-login').empty()
            $('.alert-login').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR!</strong> ${err.responseJSON.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })

}

const logout = () => {
    localStorage.clear()
    auth()
    $('#table-body').empty()
    const auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut().then(() => {
      console.log('User signed out.')
    })
}


const register = (event) => {
    event.preventDefault()
    const email = $('#email-register').val()
    const password = $('#password-register').val()
    const confirm_password = $('#confirm-password-register').val()

    
    if (password != confirm_password) {
        $('.alert-login').empty()
        $('.alert-login').append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            Password doesn't match
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `)
        $('#email-register').val('')
        $('#password-register').val('')
        $('#confirm-password-register').val('')
    } else {

        $.ajax({
            method: 'post',
            url: `${baseUrl}/register`,
            data: { email, password }
        })
            .done(() => {
                $('.alert-login').empty()
                $('.alert-login').append(`
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        Successfully register new account
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `)
                $('#email-register').val('')
                $('#password-register').val('')
                $('#confirm-password-register').val('')
            })
            .fail(err => {
                $('.alert-login').empty()
                $('.alert-login').append(`
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>ERR!</strong> ${err.responseJSON.err_msg}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                `)
                $('#email-register').val('')
                $('#password-register').val('')
                $('#confirm-password-register').val('')
            })
    }

}

const search = (event) => {
    event.preventDefault()
    const title = $('#search-title').val()

    $.ajax({
        method: "post",
        url: baseUrl + '/movie',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title
        }
    })
        .done(data => {
            $('#table-body').empty()
            
            data.forEach((el,i) => {
                
                $('#table-body').append(`   
                    <tr>
                      <th class="border-right text-center" scope="row">${i+1}</th>
                      <td class="border-right">${el.title}</td>
                      <td class="border-right text-center">${el.vote_average}</td>
                      <td class="border-right text-center">${el.release_date}</td>
                      <td class="text-center">
                      <a onclick="trailer('${el.title}')" class="btn btn-info" href="#">Watch trailer >>></a>
                      </td>
                    </tr>
                `)
               
            })
            auth()
        })
        .fail(err => {
            $('.alert-movies').empty()
            $('.alert-movies').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR!</strong> ${err.responseJSON.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
}


const trailer = (title) => {
    
    $.ajax({
        method: "post",
        url: baseUrl + '/trailer',
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
                <strong>ERR!</strong> ${err.responseJSON.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
}




function onSignIn(googleUser) {
    const { id_token } = googleUser.getAuthResponse()

    $.ajax({
        method: "post",
        url: baseUrl + '/oauth',
        data: {
            id_token
        }
    })
        .done(({data}) => {
            const { access_token } = data
            localStorage.setItem('access_token', access_token)
            auth()
        })
        .fail(err => {
            $('.alert-login').empty()
            $('.alert-login').append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>ERR!</strong> ${err.responseJSON.err_msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `)
        })
  }