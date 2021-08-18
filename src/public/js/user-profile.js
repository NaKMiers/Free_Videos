document.addEventListener('DOMContentLoaded', function() {
    var userList = document.querySelector('.userList')


    var info = document.querySelector('.info')
    var editProfileBtn = $('.edit-profile-btn')

    var nameValue = document.querySelector('.info-name span.name').innerText
    var usernameValue = document.querySelector('.info-username span.username').innerText
    var emailValue = document.querySelector('.info-email span.email').innerText
    
    editProfileBtn.click(function() {
        var data = `
            <h2 class="info-heading">Information</h2>
            <form name="edit-profile-form" method="POST" action="/user/profile/save?_method=PUT" enctype="multipart/form-data">
                <div style="float: right">
                    <button class="btn btn-link save-edit-profile-btn">Save</button> |
                    <a class="btn btn-link" href="">Cancel</a>
                </div>
                <br>
                <div class="info-content">
                    <div class="info-name info-sub-content">
                        <label for="name">Name: </label>
                        <input id="name" class="form-control" type="text" name="name" value="${nameValue}" placeholder="Enter name">
                    </div>
                    <div class="info-username info-sub-content">
                        <label for="username">Username: </label>
                        <input id="username" class="form-control" type="text" name="username" value="${usernameValue}" placeholder="Enter username">
                        <span class="username-error-message" style="color: #f44336"></span>
                    </div>
                    <div class="info-email info-sub-content">
                        <label for="email">Email: </label>
                        <input id="email" class="form-control" type="email" name="email" value="${emailValue}" placeholder="Enter email">
                        <span class="email-error-message" style="color: #f44336"></span>
                    </div>
                    <span class="ml-2 show-new-avatar-frame" style="cursor: pointer">
                        <i class="fas fa-chevron-down"></i>
                        New Avatar
                    </span>
                    <div class="info-avatar info-sub-content">
                        <label for="avatar"><span style="color: #f44336">Avatar</span>: </label>
                        <input id="avatar" class="form-control" type="file" name="avatar">
                        <span class="avatar-error-message" style="color: #f44336"></span>
                    </div>
                    <span class="ml-2 show-new-password-frame" style="cursor: pointer">
                        <i class="fas fa-chevron-down"></i>
                        New Password
                    </span>
                    <div class="new-password-frame">
                        <div class="info-password info-sub-content">
                            <label for="password"><span style="color: #f44336">New</span> Password: </label>
                            <input id="password" class="form-control" type="password" name="password" placeholder="Enter new password">
                            <span class="password-error-message" style="color: #f44336"></span>
                        </div>
                        <div class="info-re-type-password info-sub-content">
                            <label for="re-type-password"><span style="color: #f44336">Re-type</span> Password: </label>
                            <input id="re-type-password" class="form-control" type="password" name="reTypePassword" placeholder="Enter password again">
                            <span class="re-type-password-error-message" style="color: #f44336"></span>
                        </div>
                    </div>
                </div>
            </form>
        `
        info.innerHTML = data

        var showNewPasswordFrame = document.querySelector('.show-new-password-frame')
        var newPasswordFrame = document.querySelector('.new-password-frame')

        var showNewAvatarFrame = document.querySelector('.show-new-avatar-frame')
        var avatarFrame = document.querySelector('.info-avatar')

        var isNewPassword = false
        showNewPasswordFrame.onclick = function() {
            newPasswordFrame.classList.toggle('show')
            isNewPassword = newPasswordFrame.className.includes('show')
            console.log(isNewPassword)
        }
        
        showNewAvatarFrame.onclick = function() {
            avatarFrame.classList.toggle('show')
        }

        var editProfileForm = document.forms["edit-profile-form"]
        var saveEditProfile = document.querySelector('.save-edit-profile-btn')

        saveEditProfile.onclick = function(e) {
            var submittable = 2
            if (isNewPassword) submittable++

            var passwordInput = document.querySelector('#password')
            var reTypePasswordInput = document.querySelector('#re-type-password')

            // validate password
            if (isNewPassword) {
                var passwordErrorMessage = document.querySelector('.password-error-message')
                var reTypePasswordErrorMessage = document.querySelector('.re-type-password-error-message')
    
                passwordErrorMessage.innerText = ''
                reTypePasswordErrorMessage.innerText = ''
    
                if (passwordInput.value == '') {
                    passwordErrorMessage.innerText = '❌Password input empty❌'
                }
                if (reTypePasswordInput.value == '') {
                    reTypePasswordErrorMessage.innerText = '❌Re-type password input empty❌'
                }
                if (passwordInput.value != '' && reTypePasswordInput.value != '') {
                    if (passwordInput.value.length < 6) {
                        passwordErrorMessage.innerText = '❌Password must be greater than 5 characters❌'
                    } else {
                        if (passwordInput.value === reTypePasswordInput.value) {
                            submittable--
                        } else {
                            reTypePasswordErrorMessage.innerText = '❌Password not match. Please re-enter❌'
                        }
                    }
                }
            }

            // validate username
            var usernameInput = document.querySelector('input#username')
            var usernameErrorMessage = document.querySelector('.username-error-message')

            usernameErrorMessage.innerText = ''
            if (usernameInput.value === usernameValue) {
                submittable--
            } else {
                var isDuplicateUsername = userList.innerText.includes(`username: '${usernameInput.value}'`)
                if (isDuplicateUsername) {
                    usernameErrorMessage.innerText = '❌Username is exist, please enter the other username❌'
                } else {
                    submittable--
                }
            }

            // validate email
            var emailInput = document.querySelector('input#email')
            var emailErrorMessage = document.querySelector('.email-error-message')

            emailErrorMessage.innerText = ''
            if (emailInput.value === emailValue) {
                submittable--
            } else {
                var isDuplicateEmail = userList.innerText.includes(`email: '${emailInput.value}'`)
                if (isDuplicateEmail) {
                    emailErrorMessage.innerText = 'Email is exist, please enter the other email'
                } else {
                    submittable--
                }
            }

            console.log('submittable: ', submittable)

            if (submittable !== 0) {
                editProfileForm.onsubmit = function(e) {
                    console.log('www:', submittable)
                    e.preventDefault()
                }
            } else {
                console.log('OK')
                editProfileForm.submit()
            }
        }
    })
})

