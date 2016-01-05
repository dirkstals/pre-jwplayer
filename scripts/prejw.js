(function(document){

    var preJWPlayer = function(){

        var videoElement = arguments[0],
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
         * @function _JWPlayerReadyHandler
         * @private
         */
        var _JWPlayerReadyHandler = function(){
        
            document.createElement = oldCreateElement;

            this.play();  

            preJWPlayerInstance = jwplayerInstance;
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
         * @function activate
         * @public
         */
        var activate = function(){
            
            videoTagElement.play();
            videoTagElement.pause();
        };


        /**
         * @function play
         * @public
         */
        var play = function(videoDOMElement){

            if(typeof jwplayer == 'undefined'){
                
                jwplayerTimeout = setTimeout(_startJWPlayer, 10);
            }else{

                document.createElement = customCreateElement;

                jwplayerInstance = jwplayer(videoDOMElement ? videoDOMElement : videoElement);
                jwplayerInstance.setup(jwplayerOptions);
                jwplayerInstance.on('ready', _JWPlayerReadyHandler);
            }
        };


        /**
         * @function stop
         * @public
         */
        var stop = function(){

            clearTimeout(jwplayerTimeout);
            jwplayerInstance.remove();
        };


        _init();

        return {
            setup: setup,
            activate: activate,
            play: play,
            stop: stop
        };
    }

    window.prejwplayer = window.prejwplayer ? window.prejwplayer : preJWPlayer;
    
})(document);