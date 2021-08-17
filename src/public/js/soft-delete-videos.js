document.addEventListener('DOMContentLoaded', function() {
    var videoId
    var deleteForm = document.forms['delete-video-form']
    var btnDeleteVideo = document.getElementById('btn-delete-video')

    // when dialog confirm clicked
    $('#delete-video-modal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget)
        videoId = button.data('id')
    })

    // when delete video button clicked
    btnDeleteVideo.onclick = function() {
        deleteForm.action = '/admin/delete/' + videoId + '?_method=DELETE' 
        deleteForm.submit()
    }
})