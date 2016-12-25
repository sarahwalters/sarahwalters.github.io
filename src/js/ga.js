// boilerplate GA script
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-53516621-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');

var GA = (function() {
    // initialize handlers for contact buttons
    function onload() {
        var buttons = ['linkedin', 'github', 'resume'];
        buttons.map(function(name) {
            $('#' + name).on('click', function() {
                ga('send', 'event', 'contact', 'click', name);
            });

            $('#' + name).on('mouseenter', function() {
                ga('send', 'event', 'contact', 'mouseenter', name);
            });
        });
    }

    return {
        onload: onload
    };
})();
