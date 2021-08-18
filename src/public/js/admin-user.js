document.addEventListener('DOMContentLoaded', function() {
    var userId
    var deleteForm = document.forms['delete-user-form']
    var btnDeleteUser = document.getElementById('btn-delete-user')
    var containerForm = $('form[name="container-form"]')
    var checkboxAll = $('#checkbox-all')
    var userItemCheckbox = $('input[name="userIds[]"]')
    var checkAllSubmitBtn = $('.check-all-submit-btn')

    // dialog confirm clicked
    $('#delete-user-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        userId = button.data('id')
    })

    // delete user button clicked
    btnDeleteUser.onclick = function() {
        deleteForm.action = '/admin/users/delete/' + userId + '/force?_method=DELETE' 
        deleteForm.submit()
    }

    // checkboxAll changed
    checkboxAll.change(function() {
        var isCheckBoxAll = $(this).prop('checked')
        userItemCheckbox.prop('checked', isCheckBoxAll)
        renderCheckAllSubmitBtn()
    })

    // users item checkbox changed
    userItemCheckbox.change(function() {
        var isCheckBoxAll = userItemCheckbox.length === $('input[name="userIds[]"]:checked').length
        renderCheckAllSubmitBtn()
    })

    // re-render checkAllSubmitBtn
    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="userIds[]"]:checked').length
        if (checkedCount > 0) {
            checkAllSubmitBtn.attr('disabled', false)
        } else {
            checkAllSubmitBtn.attr('disabled', true)
        }
    }

})

