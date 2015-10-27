var scriptLoader = (function(document){

    var scriptPromises = {};

    /**
     * @function _init
     * @private
     */
    var _init = function(scripts){

        for(var i = 0; script = scripts[i]; i++){
            
            if(script.src && script.async){

                scriptPromises[script.src.split('/').pop()] = new Promise(function(resolve, reject) {
                    
                    script.addEventListener('load', resolve);
                    script.addEventListener('error', reject);
                });
            }
        };
    }


    /**
     * @function onScriptLoaded
     * @public
     */
    var onScriptLoaded = function(id, success, error){

        error = error || function(err){

            console.warn("Script error", err);
        };

        if(scriptPromises[id]){

            scriptPromises[id].then(success, error);
        }else{

            console.warn("Script not on Page.");
        }
    };


    // initialize the load script
    _init(document.querySelectorAll('script'));


    return {
        onScriptLoaded : onScriptLoaded
    };

})(document);