(function(document){

    var videoDOMElement,
        video2DOMElement,
        playDOMElement,
        playerInstance1,
        playerInstance2,
        playerInstance3,
        JWPlayerConfig = {
            'video' : {
                file: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                image: "http://media.xiph.org/BBB/BBB-360-png/big_buck_bunny_00219.png",
                width: 640,
                height: 360
            },
            'video2' : {
                file: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                image: "http://media.xiph.org/BBB/BBB-360-png/big_buck_bunny_00219.png",
                width: 640,
                height: 360
            }
        };


    /**
     * @function _init
     * @private
     */
    var _init = function(){

         videoDOMElement = document.querySelector('#video');
        video2DOMElement = document.querySelector('#video2');
          playDOMElement = document.querySelector('#play');        

        playerInstance1 = prejwplayer(videoDOMElement);
        playerInstance1.setup(JWPlayerConfig['video']);

        playerInstance2 = prejwplayer(video2DOMElement);
        playerInstance2.setup(JWPlayerConfig['video2']);

        playerInstance3 = prejwplayer();
        playerInstance3.setup(JWPlayerConfig['video']);
    };


    /**
     * @function _addEventHandlers
     * @private
     */
    var _addEventHandlers = function(){

        videoDOMElement.addEventListener('click', _videoDOMElementClickHandler);
        video2DOMElement.addEventListener('click', _video2DOMElementClickHandler);
        playDOMElement.addEventListener('click', _playDOMElementClickHandler);
    }


    /**
     * @function _videoDOMElementClickHandler
     * @private
     */
    var _videoDOMElementClickHandler = function(e){

        videoDOMElement.querySelector('.playbutton').classList.add('buffering');
        playerInstance1.play();
    }


    /**
     * @function _video2DOMElementClickHandler
     * @private
     */
    var _video2DOMElementClickHandler = function(e){

        video2DOMElement.querySelector('.playbutton').classList.add('buffering');
        playerInstance2.play();
    }


    /**
     * @function _playDOMElementClickHandler
     * @private
     */
    var _playDOMElementClickHandler = function(e){

        videoDOMElement.querySelector('.playbutton').classList.add('buffering');

        playerInstance1.activate();

        setTimeout(function()
            {
                playerInstance1.play(videoDOMElement);
            }, 
            1000
        );
    }


    _init();
    _addEventHandlers();

})(document);