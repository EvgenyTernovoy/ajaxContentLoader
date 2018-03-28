(function ($) {

    $.fn.ajaxContentLoader = function (options) {

        var settings = $.extend({
            btnSelector         : '.js--ajaxBtn',
            pagerSelector       : '.js--ajaxPager',
            containerSelector   : '.js--ajaxContainer',
            controlSelector     : '.js--ajaxControlWrapper',
            filterSelector      : '.js--ajaxFilter',
            filterSubmitSelector: 'js--ajaxFilterSubmit'
        }, options);

        var methods = {
            filterRequest      : function ($form) {
                $.ajax({
                    url     : $form.attr('action'),
                    data    : $form.serialize(),
                    dataType: 'JSON',
                    method  : 'GET',
                    context : $form[0],
                    success : methods._onSuccess,
                    complete: function () {
                        var $context = $(this);
                        if($context.is('form')) {
                            window.history.replaceState(null, null, $context.attr('action') + '?' + $context.serialize());
                        }
                    }
                });
            },
            btnRequest : function ($btn) {
                $.ajax({
                    url       : $btn.attr('href'),
                    dataType  : 'JSON',
                    method    : 'POST',
                    cache     : false,
                    context   : this,
                    beforeSend: function () {
                        $btn.addClass('loading');
                    },
                    success   : methods._onSuccess,
                    complete  : function () {
                        $btn.removeClass('loading');
                    }
                });
            },
            _onSuccess         : function (data) {
                var $context = $(this),
                    $wrapper = $('#' + $context.data('for')),
                    $container = $wrapper.find(settings.containerSelector),
                    isFilter = $context.is('form');

                if (methods._isExist(data)) {
                    var isPagerBtn = methods._isPagerButton($context),
                        url = $context.attr('href');

                    if (methods._isExist(data.loop)) {
                        if (isPagerBtn || isFilter) {
                            methods._replaceLoop($container, data.loop)
                        } else {
                            methods._appendLoop($container, data.loop)
                        }
                    }

                    if (methods._isExist(data.moreButtons)) {
                        if (methods._isExist(url)) {
                            window.history.replaceState(null, null, url);
                        }

                        methods._replaceMoreButtons($wrapper, $context, data.moreButtons);
                    }

                    if (methods._isExist(data.pager)) {
                        methods._replacePager($wrapper, data.pager)
                    }
                }
            },
            _replaceLoop       : function ($container, loop) {
                $container.html(loop)
            },
            _appendLoop        : function ($container, loop) {
                $container.append(loop);
            },
            _isPagerButton     : function ($button) {
                return $button.closest(settings.pagerSelector).length > 0;
            },
            _isExist           : function (element) {
                return element !== undefined && element !== null
            },
            _replaceMoreButtons: function ($wrapper, $context, dataBtn) {
                var $control = $wrapper.find(settings.controlSelector),
                    dataIsEmpty = dataBtn.indexOf('<') === -1;

                if ($control.length > 0) {
                    if (dataBtn.indexOf('<') > -1) {
                        $control.html(dataBtn);
                    } else {
                        $control.html('');
                    }
                } else {
                    var btnsForModification = $(settings.btnSelector + '[data-for="' + $context.data('for') + '"]').filter(function () {
                        return $(this).closest(settings.pagerSelector).length === 0;
                    });

                    btnsForModification.each(function () {
                        if (dataIsEmpty) {
                            $(this).addClass('is--hide');
                        } else {
                            $(this).replaceWith(dataBtn);
                        }
                    });
                }
            },
            _replacePager      : function ($wrapper, dataPager) {
                var $pager = $wrapper.find(settings.pagerSelector);

                if (dataPager.indexOf('<') === -1) {
                    $pager.html('');
                } else {
                    $pager.html(dataPager);
                }
            }
        };

        var $body = $('body');

        $body.on('click', settings.btnSelector, function (e) {
            e.preventDefault();
            e.stopPropagation();

            methods.btnRequest($(this))
        });

        $body.on('change', settings.filterSelector, function (e) {
            methods.filterRequest($(e.target).closest('form'));
        });
    }

})(jQuery);

$(document).ready(function () {
    $.fn.ajaxContentLoader();
});