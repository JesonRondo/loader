loader
======

Javascript loader script

##Demo
    var load_scripts = ['http://libs.baidu.com/jquery/1.9.1/jquery.min.js',
                        'http://libs.baidu.com/swfobject/2.2/swfobject.js'];

    Loader.load(load_scripts, function() {
        Loader.css('css/reset.css', function() {
            $('body').append('<p>css loaded</p>');
        });

        Loader.js('js/test.js');
    });

##Reference
[javascript异步动态加载js和css文件的实现方法](http://www.ginano.net/javascript-asynchronous-load-js-css-files)