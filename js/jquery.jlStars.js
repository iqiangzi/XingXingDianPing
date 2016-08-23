(function ($) {
    function Stars(ele, options) {
        
            this.options = $.extend({
            cound: 5,
            value: 0,
            height:50
        }, options);

        this.$ele = $(ele);
        this.$ele.css({
            height: this.options.height
        });

        this.width = this.$ele.height() + 6;
        for (var i = 0; i < this.options.cound; i++) {
            var div = $("<div>");
            div.css({
                boxSizing: "border-box",
                display:"inline-block",
                width: this.width,
                height: this.$ele.height(),
                left: (i % this.options.cound * this.$ele.height()),
                backgroundImage: "url(images/star.jpg)",
                backgroundPosition: this.width,
                backgroundSize: this.width * 2 + "px " + this.$ele.height() + "px"
            })
            div.attr({
                "data-index": i + 1
            })
            div.appendTo(this.$ele);
        }

        var span = $("<span>");
        span.css({
            fontSize:this.$ele.height()-10+"px",
            verticalAlign: "top",
            textAlign: "center",
        });
        span.text(this.options.value+"分");
        span.appendTo(this.$ele);

        var input = $("<input>");
        input.attr({
            type:"hidden",
            name:"fwtd"
        })
        input.val(this.options.value); 
        input.appendTo(this.$ele);

        

        this.divs = this.$ele.find("div[data-index]");
        this.divs.mouseenter(function (event) {
            this.divs.each(function (i, ele) {
                if (Number(ele.dataset.index) <= event.target.dataset.index) {
                    $(ele).css("background-position", 0)
                } else {
                    $(ele).css("background-position", this.width);
                }
            }.bind(this))
        }.bind(this)).mouseleave(function () {
            this.divs.css("background-position", this.width);
            this.click(this.options.value);
        }.bind(this));

        this.divs.click(function (event) {           
            this.options.value = event.target.dataset.index;
            this.click(this.options.value);
            this.$ele.find("span").text(this.options.value+"分");
            this.$ele.find("input").val(this.options.value);
        }.bind(this));

        this.click(this.options.value);
    }

    Stars.prototype.click = function (index) {
        this.divs.each(function (i, ele) {
            if (Number(ele.dataset.index) <= index) {
                $(ele).css("background-position", 0)
            } else {
                $(ele).css("background-position", this.width);
            }
        }.bind(this))
    }

    $.fn.jlStars = function (options) {
        this.each(function (i, ele) {
            new Stars(ele, options);
        })
    }
})(jQuery);