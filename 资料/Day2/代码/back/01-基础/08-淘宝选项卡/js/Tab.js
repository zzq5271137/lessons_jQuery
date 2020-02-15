function TabsFn() {}

TabsFn.prototype = {
    constructor: TabsFn,
    init: function(){
        this.bindEvent();
    },
    // 绑定事件
    bindEvent: function () {
        $('#tab_header ul li').mouseover(function () {
             $(this).addClass('selected').siblings().removeClass('selected');
             var index = $(this).index();
             var indexCon = $('#tab_content .dom').eq(index);
             indexCon.css('display', 'block').siblings().css('display', 'none');
        });
    }
};