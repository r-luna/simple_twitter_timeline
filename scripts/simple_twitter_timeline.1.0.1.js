/**
 * Given a widget ID this function will return a twitter timeline consisting of the last 20 tweets as an array of tweet objects.
 * Skirts the cross domain policy via a script tag proxy;
 *
 * @constructor
 * @param {function} cb - a reference to the callback which will receive an array of tweet objects
 * @param {string} id - a string representing a twitter widget ID
 */
;(function(ns,$){
    var _cb = null;
    ns.parseResponse = function(o){
        var t = [];
        var tempObj = {};
        $($.parseHTML(o.body)).find('.timeline-TweetList-tweet').each(function(i){
            tempObj = {};
            tempObj.published = {};
            tempObj.author = {};
            tempObj.author.avatar = {};
            tempObj.tweet = {};
            tempObj.datetime = $(this).find('.dt-updated').attr('datetime');
            tempObj.permalink  = $(this).find('.link.customisable').attr('href');
            tempObj.published.publishtime = $(this).find('time').attr('datetime');
            tempObj.published.title = $(this).find('time').attr('title');
            tempObj.published.label = $(this).find('time').attr('aria-label');
            tempObj.author.statusurl = $(this).find('.timeline-Tweet-timestamp').attr('href');
            tempObj.author.url = $(this).find('.TweetAuthor-link').attr('href');
            tempObj.author.avatar.src = $(this).find('.Avatar').data('src-1x');
            tempObj.author.avatar.src_2x = $(this).find('.Avatar').data('src-2x');
            tempObj.author.fullname = $(this).find('.TweetAuthor-link').attr('aria-label');
            tempObj.author.nickname = $(this).find('.TweetAuthor-screenName').attr('title');
            tempObj.tweet.id = $(this).find('.js-tweetIdInfo').data('tweet-id');
            tempObj.tweet.url = $(this).find('.link').attr('href');
            $(this).find('.link').remove();
            tempObj.tweet.entry = $(this).find('.timeline-Tweet-text').text();
            t.push(tempObj);
        });
        _cb(t);
        _cb = null;
        $('#twtrProxy').remove();
    };
    ns.getTimeline = function(cb,id){
        _cb = cb;
        var s = document.createElement('SCRIPT');
            s.type = 'text/javascript';
            s.id = 'twtrProxy';
            s.src = 'https://cdn.syndication.twimg.com/widgets/timelines/' + id + '?lang=en&suppress_response=true&callback=twtrUtil.parseResponse&r=' + Math.random();
            $('head').append(s);
    };
})(this.twtrUtil = {}, jQuery);
