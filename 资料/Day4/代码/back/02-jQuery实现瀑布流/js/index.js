$(function () {
    // 1. 实现瀑布流布局
    waterFull();
    // 2. 动态加载新的盒子
    $(window).on('scroll', function () {
        // 2.1 判断是否具备加载的条件
        if (checkWillLoadImage()) { // true
            console.log(1111);
            // 2.2 造数据
            var dataArr = [
                {'src': '0.jpg'},
                {'src': '3.jpg'},
                {'src': '4.jpg'},
                {'src': '7.jpg'},
                {'src': '8.jpg'},
                {'src': '10.jpg'},
                {'src': '12.jpg'},
                {'src': '30.jpg'}
            ];
            // 2.2 遍历假数据, 不断加载
            $.each(dataArr, function (index, value) {
                // 1. 创建标签
                 var newBox = $('<div>').addClass('box').appendTo($('#main'));
                 var newPic = $('<div>').addClass('pic').appendTo($(newBox));
                 $('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(newPic));
                console.log($(value).attr('src'));
            });
            // 2.3 重新布局
            waterFull();
        }
    })
});

/**
 * 实现瀑布流的布局
 */
function waterFull() {
    // 1. 求出父盒子的宽度
    //  1.1 获取所有的子盒子
    var allBox = $('#main>.box');
    // 1.2 求出子盒子的宽度
    var boxWidth = $(allBox).eq(0).outerWidth();
    // 1.3 获取窗口的宽度
    var clientW = $(window).width();
    // 1.4 求出总列数
    var cols = Math.floor(clientW / boxWidth);

    // 1.5 父盒子居中
    $('#main').css({
        width: cols * boxWidth + 'px',
        margin: '0 auto'
    });

    // 2. 子盒子定位
    //  2.1 定义变量
    var heightArr = [], boxHeight = 0, minBoxHeight = 0, minBoxIndex = 0;
    // 2.2 遍历所有的子盒子
    $.each(allBox, function (index, value) {
        // 2.2.1 求出每一个子盒子的高度
        boxHeight = $(value).outerHeight();
        // 2.2.2 取出第一行盒子的高度放入高度数组中
        if (index < cols) { // 第一行
            heightArr.push(boxHeight);
        } else { // 剩余行的盒子
            // 2.2.3 取出数组中最矮的高度
            minBoxHeight =  Math.min.apply(this, heightArr);
            // 2.2.4 求出最矮高度对应的索引
            minBoxIndex =  $.inArray(minBoxHeight, heightArr);
            // 2.2.5 盒子定位
            $(value).css({
                position: 'absolute',
                left: minBoxIndex * boxWidth + 'px',
                top: minBoxHeight + 'px'
            });
            // 2.2.6 更新最矮的高度
            heightArr[minBoxIndex] += boxHeight;
        }
    });
}

/**
 * 判断是否具备加载子盒子的条件
 * @returns {boolean}
 */
function checkWillLoadImage() {
    // 1. 获取最后一个盒子
    var lastBox = $('#main>.box').last();
    // 2. 求出高度
    var lastBoxDis = $(lastBox).outerHeight() * 0.5 + $(lastBox).offset().top;
    // 3. 求出窗口的高度
    var clientH =  $(window).height();
    // 4. 求出页面滚动产生的高度
    var scrollTopH = $(window).scrollTop();
    // 5. 对比
    return lastBoxDis <= clientH + scrollTopH;
}


