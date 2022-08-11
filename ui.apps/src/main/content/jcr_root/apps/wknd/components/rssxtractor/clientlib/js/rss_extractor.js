(function($){
    var feedstatus;

    $(document).ready(function() {

       startFeed();
       setIntervalForFeedUpdate();

        $(document).on("click","#rss-stop-refresh",function (){
            stopReferesh();
        })
        $(document).on("click","#rss-start-refresh",function (){
            setIntervalForFeedUpdate();
        })


    });


    function startFeed() {
        let urlVal = $("#output").data('url');
        let feedsToDisplay = $("#output").data('feeds-to-display');
        $.ajax({
            url: urlVal,
            dataType: "xml",
            success: function (data) {
                let feedList = []
                $(data).find("item").each(function () {
                    feedList.push(serializeFeed(this))
                });
                feedList.sort(dateSort);
                $("#output").empty();
                for (let i = 0; i < feedsToDisplay; i++) {
                    if (feedList[i]) {
                        $("#output").append(`<div class="card" >
                                <p>Title: ${feedList[i].title}</p>
                                <p>Description: ${feedList[i].description}</p>
                                <p>Updated: ${feedList[i].updated}</p>
                                 </div>`);
                    }
                }
            },
            error: function () {
                fetchAuthorContentFeed();
            }
        });

    }

    function fetchAuthorContentFeed() {
        let feedsToDisplay = $("#output").data('feeds-to-display');
        $.ajax({
            url: "/graphql/execute.json/wknd/news-feed",
            dataType: "json",
            success: function(data) {
                let feedList = []
                feedList = data.data.newsFeedList.items;
                feedList.sort(dateSort);
                $("#output").empty();
                for(let i=0; i< feedsToDisplay ; i ++) {
                    if(feedList[i]) {
                        $("#output").append(`<div class="card">
                                <p>Title: ${feedList[i].title}</p>
                                <p>Description: ${feedList[i].description.html}</p>
                                <p>Updated: ${feedList[i].createddate}</p>
                                 </div>`);
                    }

                }
            }
        });
    }
    function setIntervalForFeedUpdate(){
        let refreshRate = $("#output").data('refresh-rate')
        feedstatus = setInterval(startFeed, parseInt(refreshRate, 10));
    }
    function stopReferesh(){
        clearInterval(feedstatus);
    }

    function serializeFeed(item){
        let feed = {}
        feed.title = $(item).find("title")[0].innerHTML;
        feed.description = $(item).find("description")[0].innerHTML;
        feed.updated = $(item).find("a10\\:updated")[0].innerHTML;

        return feed;
    }
    function dateSort(a, b)
    {
        var x = new Date(a.updated || a.createddate);
        var y = new Date(b.updated || b.createddate);
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }

}
)(jQuery)