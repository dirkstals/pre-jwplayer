(function(document){

    var preJWPlayer = function(){

        var clickElement = arguments[0],
            videoElement = arguments[1] ? arguments[1] : clickElement,
            jwplayerInstance,
            jwplayerOptions,
            jwplayerTimeout,
            videoTagElement,
            preJWPlayerInstance = this;


        /**
         * @function customCreateElement
         * @public
         */
        var customCreateElement = function(tagName){

            var element;

            // Check if jwPlayer is calling the video
            if(tagName === 'video' && arguments.callee.caller &&
                arguments.callee.caller.prototype &&
                arguments.callee.caller.prototype.__proto__ &&
                typeof arguments.callee.caller.prototype.__proto__.play === 'function'){

                // serve our own video element
                element = videoTagElement;
            }else{

                // create the element with the native function
                element = oldCreateElement.apply(document, arguments);
            }
            
            return element;
        };


        /**
         * @function _startJWPlayer
         * @private
         */
        var _startJWPlayer = function(){

            if(typeof jwplayer == 'undefined'){
                
                jwplayerTimeout = setTimeout(_startJWPlayer, 10);
            }else{

                document.createElement = customCreateElement;

                jwplayerInstance = jwplayer(videoElement);
                jwplayerInstance.setup(jwplayerOptions);
                jwplayerInstance.on('ready', _JWPlayerReadyHandler);
            }
        };


        /**
         * @function _JWPlayerReadyHandler
         * @private
         */
        var _JWPlayerReadyHandler = function(){
        
            document.createElement = oldCreateElement;

            this.play();  

            preJWPlayerInstance = jwplayerInstance;
        };


        /**
         * @function activateDummyElement
         * @private
         */
        var _activatePreJWPlayerElement = function(){
            
            videoTagElement.play();
            videoTagElement.pause();
        };


        /**
         * @function _init
         * @public
         */
        var _init = function(){
                
            oldCreateElement = document.createElement;
            videoTagElement = document.createElement('video');
        };


        /**
         * @function setup
         * @public
         */
        var setup = function(options){

            jwplayerOptions = options;
        };


        /**
         * @function play
         * @public
         */
        var play = function(){

            _activatePreJWPlayerElement();

            _startJWPlayer();
        };


        /**
         * @function stop
         * @public
         */
        var stop = function(){

            clearTimeout(jwplayerTimeout);
        };


        _init();

        return {
            setup: setup,
            play: play,
            stop: stop
        };
    }

    window.prejwplayer = window.prejwplayer ? window.prejwplayer : preJWPlayer;
    
})(document);