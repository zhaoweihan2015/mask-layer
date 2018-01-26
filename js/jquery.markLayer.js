/**
 * 显示提示信息
 * 
 * @param {any} o 
 * @param {string} o.word     提示的文字 
 * @param {function} o.time   弹窗持续时间 
 * @param {function} o.cb     在显示之前的回调函数 
 * @param {string} o.url      结束前所跳转的url 
 * @param {function} o.lastCb 结束之前的回调函数 
 * @returns 
 */

$.extend({
    gzMaskLayer: function gzMaskLayer(o) {
        var $tip = $('<div class="gz-mark-layer">' +
            '<div class="gz-alert">' +
            '</div>' +
            '</div>'),
            _word = '<p>' + o.word + '</p>',
            _button = '<button type="button">确定</button>',
            fadeTime = o.time ? o.time : 2000


        if (o.hasOwnProperty("cb")) {
            o.cb()
        }

        if (o.hasOwnProperty("button") && o.button) {
            _word += _button
        }

        function addPreview(type, cb) {
            var $info = $('<i class="fa ' + type + '"></i>')
            if (type == 'right') {
                $info.addClass("fa-check-circle")
            } else if (type == 'false') {
                $info.addClass("fa-exclamation-circle")
            }
            $('body').append($tip.find('.gz-alert').append($info, $(_word)).parent().fadeIn('normal', function () {
                var timer
                if (!o.button) {
                    timer = setTimeout((function () {
                        cb.call(this, o)
                    }).bind(this), fadeTime)
                }

                $tip.on('click', function (e) {
                    var e = e || event
                    if (o.button && !Boolean($(e.target).hasClass("gz-mark-layer") || e.target.tagName == 'BUTTON')) {
                        return false
                    }
                    clearTimeout(timer)
                    cb.call(this, o)
                })
            }))
        }

        return {
            enter: function () {
                addPreview('right', function (o) {
                    if (o.hasOwnProperty('url')) {
                        location.href = o.url
                    } else {
                        $(this).fadeOut('normal', function () {
                            if (o.hasOwnProperty("lastCb")) {
                                o.lastCb()
                            }
                            $(this).remove()
                        })
                    }
                })
            },
            error: function () {
                addPreview('false', function (o) {
                    $(this).fadeOut('normal', function () {
                        if (o.hasOwnProperty("lastCb")) {
                            o.lastCb()
                        }
                        $(this).remove()
                    })
                })
            }
        }
    }

})