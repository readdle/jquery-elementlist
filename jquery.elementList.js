/**
 * ElementList - jQuery Plugin
 * Version: 1.1
 * Requires jQuery v1.6 or later
 *
 * Documentation: https://github.com/readdle/jquery-elementlist
 *
 * Copyright (c) 2013 Readdle inc.
 */
(function($) {
    $.fn.elementList = function(options) {

        options = $.extend({
            template_id: "liveuser_template", // element's template
            input_id: "user-input",           // input id for add and delete elements
            container_id: "users_container",  // id of the data elements container
            enter_key_push: true,             // if true - the elements is pushed to list by pressing the enter key in the input field
            backspace_key_pop: true           // if true - removing elements from list by pressing the backspace key in the empty input field
        }, options);

        // link to the object context
        var _this = this;

        // mini build-in template engine
        var tpl = {
            // get pure template without data and save it into $templateElement
            init: function() {
                var selector = '#'+options.template_id;
                this.$templateElement = $(_this).children(selector).clone();
                this.$templateElement.removeAttr('id');

                $(_this).children(selector).remove();

                return this.$templateElement;
            },

            // Return clone of the $templateElement with data
            generate: function(data) {
                var userData = data || {};
                var tpl = this.$templateElement.clone();

                $.each(userData, function(k,v) {
                    tpl.html(tpl.html().replace('{%'+k+'%}', v));
                });
                return tpl;
            }
        };

        // The count of added elements
        this.count = 0;

        // insert element into list
        this.insert = function(title, id, data) {
            var userData = data || {};
            var tmp = tpl.generate($.extend(userData, {val: title}));
            tmp.attr('data-userid', id);
            tmp.addClass('ulist-item');
            $(tmp).appendTo('#'+options.container_id);
            this.count += 1;
            this.valHidden = '';
            $(this).trigger('elementList.add', {
                'id': id,
                'title': title,
                'data': userData
            });
        };

        // Delete the element from list
        this.del = function(domObj) {
            var id = $(domObj).parent('.ulist-item').attr('data-userid');
            $(domObj).parent('.ulist-item').remove();
            if(this.count) this.count -= 1;
            $(this).trigger('elementList.del', {
                'id': id
            });
        };

        // Delete the last added element
        this.delLast = function() {
            this.del($(this).find('.ulist-item:last').children('.ulist-del'));
        };

        // Delete all elements from list
        this.delAll = function() {
            $("#"+options.container_id).empty();
            this.count = 0;

            $(this).trigger('elementList.delAll');
        };

        // Initialize the plugin
        var init = function() {
            // Hidden value of the input element (value + flag symbol)
            _this.valHidden = '';
            // Template init
            tpl.init();
            // Counter init
            _this.count = $(this).find('#'+options.container_id).find('.ulist-item').size();
            // Keyboard init
            var input = $('#'+options.input_id);
            input.keyup(function(e) {
                var val = input.val();
                // Backspace
                if (e.keyCode == 8) {
                    if(val == '' && val == _this.valHidden && _this.count && options.backspace_key_pop) {
                        _this.delLast();
                    }
                }
                _this.valHidden = val;
            })
            .keydown(function(e) {
                var val = input.val();
                // Enter
                if (e.keyCode == 13) {
                    e.preventDefault();
                    if(val && options.enter_key_push) {
                        _this.insert($.trim(val), 0);
                        input.val('');
                    }
                }
                _this.valHidden = val;
            });

        };

        return this.each(init);
    };

})(jQuery);