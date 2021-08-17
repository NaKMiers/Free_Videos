document.addEventListener('DOMContentLoaded', function() {
    var videoId
    var deleteForm = document.forms['delete-video-form']
    var restoreForm = document.forms['restore-video-form']
    var btnDeleteVideo = document.getElementById('btn-delete-video')
    var restoreBtn = $('.btn-restore')
    var containerForm = $('form[name="container-form"]')
    var checkboxAll = $('#checkbox-all')
    var videoItemCheckbox = $('input[name="videoIds[]"]')
    var checkAllSubmitBtn = $('.check-all-submit-btn')

    // when dialog confirm clicked
    $('#delete-video-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        videoId = button.data('id')
    })

    // when delete video button clicked
    btnDeleteVideo.onclick = function() {
        deleteForm.action = '/admin/trash-videos/delete/' + videoId + '/force?_method=DELETE' 
        deleteForm.submit()
    }

    // restore btn clicked
    restoreBtn.click(function(e) {
        e.preventDefault()
        var videoId = $(this).data('id')
        restoreForm.action = '/admin/trash-videos/restore/' + videoId + '?_method=PATCH'
        restoreForm.submit()
    })
    
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