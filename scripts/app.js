(function(document){

    var playerLoaded = false,
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
     * @function _preJWPlayerClickHandler
     * @private
     */
    var _preJWPlayerClickHandler = function(name){

        if(playerLoaded){

            _createPlayerAndStartPlaying(name);
        }
    };

    /**
     * @function _JWPlayerReadyHandler
     * @private
     */
    var _JWPlayerReadyHandler = function(){
    
        this.play();  

        preJWPlayer.removePreJWPlayerElement(this.id);
    };


    /**
     * @function _createPlayerAndStartPlaying
     * @private
     */
    var _createPlayerAndStartPlaying = function(name){

        var playerInstance = jwplayer(name);
            playerInstance.setup(JWPlayerConfig[name]);
            playerInstance.on('ready', _JWPlayerReadyHandler);
    }


    /**
     * @function _onJWPlayerLoaded
     * @private
     */
    var _onJWPlayerLoaded = function(){

        playerLoaded = true;

        if(preJWPlayer.getPlayingName()){

            _createPlayerAndStartPlaying(preJWPlayer.getPlayingName());
        }
    };

    /** 
     * Ask a promise to execute the `_onJWPlayerLoaded` function when the 
     * JWPlayer script is done loading.
     */
    scriptLoader.onScriptLoaded('QKO2jbyL.js', _onJWPlayerLoaded);


    /**
     * Create PreJWPlayerElements that store a user click.
     */
    preJWPlayer.createPreJWPlayerElement('video', _preJWPlayerClickHandler);
    preJWPlayer.createPreJWPlayerElement('video2', _preJWPlayerClickHandler);

})(document);