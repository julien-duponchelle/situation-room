function getQueryArg(arg)
{
    var query = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < query.length; i++)
    {
        var hash = query[i].split('=');
        if (hash[0] == arg) {
            return unescape(hash[1]);
        }
    }
    return undefined;
}
