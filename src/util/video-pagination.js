function videoPagination(req, res, next, videos, eachPage, amountPagination) {
    let page = parseInt(req.query.page) || 1
    // let eachPage = 8
    // let amountPagination = 5
    let start = page * eachPage - eachPage
    let end = page * eachPage

    function totalPageCount(videos, eachPage) {
        let div = Math.floor(videos.length / eachPage)
        let mod = videos.length - Math.floor(videos.length / eachPage)*eachPage
        return mod > 0 ? div + 1 : div
    }
    let totalPage = totalPageCount(videos, eachPage) // get total page from video with eachPage

    let pageList = []
    for (let i=0; i<totalPage; i++) { // add page into pageList
        pageList.push(i+1)
    }

    let pathOfPageList = Math.ceil(page/amountPagination) // find path of pageList from page
    
    let pagination = pageList.slice( // get element of pageList with path
        (pathOfPageList * amountPagination - amountPagination),
        (pathOfPageList * amountPagination)
    )

    let videoAfterSlice = videos.slice(start, end)

    return [ videoAfterSlice, pagination, totalPage, page ]
}

module.exports = videoPagination