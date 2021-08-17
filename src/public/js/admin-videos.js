document.addEventListener('DOMContentLoaded', function() {
    var videoId
    var deleteForm = document.forms['delete-video-form']
    var btnDeleteVideo = document.getElementById('btn-delete-video')
    var containerForm = $('form[name="container-form"]')
    var checkboxAll = $('#checkbox-all')
    var videoItemCheckbox = $('input[name="videoIds[]"]')
    var checkAllSubmitBtn = $('.check-all-submit-btn')

    // dialog confirm clicked
    $('#delete-video-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        videoId = button.data('id')
    })

    // delete video button clicked
    btnDeleteVideo.onclick = function() {
        deleteForm.action = '/admin/delete/' + videoId + '?_method=DELETE' 
        deleteForm.submit()
    }

    // checkboxAll changed
    checkboxAll.change(function() {
        var isCheckBoxAll = $(this).prop('checked')
        videoItemCheckbox.prop('checked', isCheckBoxAll)
        renderCheckAllSubmitBtn()
    })

    // videos item checkbox changed
    videoItemCheckbox.change(function() {
        var isCheckBoxAll = videoItemCheckbox.length === $('input[name="videoIds[]"]:checked').length
        renderCheckAllSubmitBtn()
    })

    // re-render checkAllSubmitBtn
    function renderCheckAllSubmitBtn() {
        var checkedCount = $('input[name="videoIds[]"]:checked').length
        if (checkedCount > 0) {
            checkAllSubmitBtn.attr('disabled', false)
        } else {
            checkAllSubmitBtn.attr('disabled', true)
        }
    }

})

