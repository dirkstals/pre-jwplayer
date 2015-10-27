(function(document){

    var playerInstance,
        videoID = 'video',
        JWPlayerConfig = {
            file: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
            image: "http://media.xiph.org/BBB/BBB-360-png/big_buck_bunny_00219.png",
            width: 640,
            height: 360
        };

    /**
     * @function _onJWPlayerReady
     * @private
     */
    var _onJWPlayerReady = function(e){

        if(preJWPlayer.startPlaying(videoID)){

            playerInstance.play();
        }

        // default 1 instance

        preJWPlayer.removePreJWPlayerElement(videoID);
    };


    /**
     * @function _onJWPlayerLoaded
     * @private
     */
    var _onJWPlayerLoaded = function(e){

        playerInstance = jwplayer(videoID);
        playerInstance.setup(JWPlayerConfig);
        playerInstance.on('ready', _onJWPlayerReady);
    };


    scriptLoader.onScriptLoaded('QKO2jbyL.js', _onJWPlayerLoaded);
    preJWPlayer.createPreJWPlayerElement(videoID);

})(document);