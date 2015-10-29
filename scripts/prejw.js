var preJWPlayer = (function(document){

    var preJWPlayerElementList = {},
        nameSortList = [],
        currentlyUsedVideoElement = null,
        oldCreateElement,
        startJWPlayerPlaying = false,
        startJWPlayerPlayingName,
        className = 'buffering';

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
            element = preJWPlayerElementList[currentlyUsedVideoElement || nameSortList.shift()].videoElement;

            currentlyUsedVideoElement = null;
        }else{

            // create the element with the native function
            element = oldCreateElement.apply(document, arguments);
        }
        
        return element;
    };


    /**
     * @function _preJWPlayerClickHandler
     * @private
     */
    var _preJWPlayerClickHandler = function(name){

        if(preJWPlayerElementList[startJWPlayerPlayingName] && startJWPlayerPlayingName !== name){

            preJWPlayerElementList[startJWPlayerPlayingName].element.classList.remove(className);
        }
        
        startJWPlayerPlaying = (preJWPlayerElementList[startJWPlayerPlayingName] && startJWPlayerPlayingName === name) ? !startJWPlayerPlaying : true;
        
        preJWPlayerElementList[name].element.classList.toggle(className, startJWPlayerPlaying);

        startJWPlayerPlayingName = name;

        _activatePreJWPlayerElement(name);
    };


    /**
     * @function activateDummyElement
     * @private
     */
    var _activatePreJWPlayerElement = function(name){
        
        preJWPlayerElementList[name].videoElement.play();
        preJWPlayerElementList[name].videoElement.pause();
    };


    /**
     * @function createPreJWPlayerElement
     * @public
     */
    var createPreJWPlayerElement = function(name, clickHandler){

        document.addEventListener('DOMContentLoaded', function(){
            
            nameSortList.push(name);

            preJWPlayerElementList[name] = {
                element: document.getElementById(name).parentNode,
                videoElement: document.createElement('video'),
                clickHandler: function(e){ 
                    
                    _preJWPlayerClickHandler(name); 

                    if(typeof clickHandler === 'function'){
                        
                        currentlyUsedVideoElement = name;

                        clickHandler(name, e); 
                    }
                }
            };

            preJWPlayerElementList[name].element.classList.add('preJWPlayer');
            preJWPlayerElementList[name].element.addEventListener('click', preJWPlayerElementList[name].clickHandler);
        });
    };


    /**
     * @function removePreJWPlayerElement
     * @public
     */
    var removePreJWPlayerElement = function(name){
        
        preJWPlayerElementList[name].element.classList.remove(className, 'preJWPlayer');
        preJWPlayerElementList[name].element.removeEventListener('click', preJWPlayerElementList[name].clickHandler);
    };


    /**
     * @function startPlaying
     * @public
     */
    var startPlaying = function(name){

        return !!(startJWPlayerPlaying && startJWPlayerPlayingName === name);
    };


    /**
     * @function getPreJWPlayerElement
     * @public
     */
    var getPreJWPlayerElement = function(name){

        return preJWPlayerElementList[name] ? preJWPlayerElementList[name].element : null;
    };


    /**
     * swap document.createElement with custom function
     */
    oldCreateElement = document.createElement;
    document.createElement = customCreateElement;


    return {
        createPreJWPlayerElement: createPreJWPlayerElement,
        removePreJWPlayerElement: removePreJWPlayerElement,
        getPreJWPlayerElement: getPreJWPlayerElement,
        startPlaying: startPlaying
    };
    
})(document);