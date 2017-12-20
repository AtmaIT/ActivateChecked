(function($) {

    function getInput(el, inputSelector) {
        if (!inputSelector) throw new Error('Missing required first parameter: input selector');

        var inputElement = el.find(inputSelector);
        if (inputElement.prop("tagName") != "INPUT") throw new Error('Find selector element must be input');

        return inputElement;
    }

    function prepareOptions(options) {
        options = options || {};

        if (typeof options.onload != "function") options.onload = function(){};
        else if(options.onload) console.warn('option.onload event must be function');
        if (typeof options.onstart != "function") options.onstart = function(){};
        else if(options.onload) console.warn('option.onstart event must be function');
        if (typeof options.onfinish != "function") options.onfinish = function(){};
        else if(options.onload) console.warn('option.onfinish event must be function');
        if (typeof options.elClass != "string") options.elClass = "active";
        else if(options.onload) console.warn('option.elClass event must be string');

        return options;
    }

    $.fn.activateChecked = function (inputSelector, options) {
        // Save element
        var self = this;
        
        //Verify findSelector
        var inputElements = getInput(self, inputSelector);

        // Prepare options and call onLoad event.
        options = prepareOptions(options);
        options.onload();

        // Add cursor pointer of activatechecked element.
        self.css('cursor','pointer');        

        // Set event of activatechecked element.
        self.click(function (e) {
            // Get clicked element and inner input.
            var currentTarget = $(this);
            var input = currentTarget.find(inputSelector);
            var isRadio = input.attr('type') === "radio";
            var isChecked = input.prop('checked');

            options.onstart(currentTarget);
            currentTarget.trigger('ac:start');
            try {
                // Fix possible change error.
                if(isRadio) {
                    input.prop('checked', true);
                }
                else {
                    isChecked = !isChecked;
                    input.prop('checked', isChecked);                    
                }
                input.trigger('change');
            } catch (e) {
                console.warn('The change event returns error');
            }
            options.onfinish(currentTarget);
            currentTarget.trigger('ac:finish');
    
            // Trigg class.
            if(isRadio) {
                currentTarget.addClass(options.elClass).siblings().removeClass(options.elClass);
            }
            else {
                if(isChecked) currentTarget.addClass(options.elClass);
                else currentTarget.removeClass(options.elClass);
            }
            
        });

        // If user click in input, stop propagation to activatechecked element.
        inputElements.on('click', function(e) {
            e.stopPropagation();
        });
    }

})($ || JQuery);