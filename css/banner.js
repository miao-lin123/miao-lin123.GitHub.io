window.onload =function(){
function extend(CLASS){
    function F(){}
    F.prototype = CLASS.prototype;
    return new F();
}

(function(){
    //Tab 抽象成面向对象
    function Tab(tabDOM,contentDOM){
        this.tabDOM = tabDOM;
        this.contentDOM = contentDOM;
        this.len = tabDOM.length;

        this.index = 0; //当前显示的是哪一张

        this.tabClick();
    }
    Tab.prototype.tabClick = function(){
        var This = this;
        this.tabDOM.forEach(function(ele,index){
            ele.onclick = function(){
                This.change(index);
            };
        });
    };
    Tab.prototype.change = function(index){
        this.tabDOM[this.index].classList.remove("active");
        this.contentDOM[this.index].classList.remove("active");
        this.index = index;
        this.tabDOM[this.index].classList.add("active");
        this.contentDOM[this.index].classList.add("active");
    };

    //TabArrow 继承Tab新增左右按钮的类
    function TabArrow(tabDOM,contentDOM,arrowDOM){
        Tab.call(this,tabDOM,contentDOM);
        this.arrowDOM = arrowDOM;
        this.arrowClick();
    }
    TabArrow.prototype = extend(Tab);
    TabArrow.prototype.arrowClick = function(){
        var This = this;
        this.arrowDOM.forEach(function(ele,i){
            ele.onclick = function(){
                var index;
                if ( i ){
                    index = This.index + 1;
                    if(index>=This.len)index = 0;
                } else{
                    index = This.index - 1;
                    if(index<0)index = This.len-1;
                }
                This.change(index);
            };
        });
    };

    //TabArrowAuto 继承TabArrow新增自动轮播
    function TabArrowAuto (tabDOM,contentDOM,arrowDOM,tab) {
        TabArrow.call(this,tabDOM,contentDOM,arrowDOM);
        this.tab = tab;
        this.auto();
    }
    TabArrowAuto.prototype = extend(TabArrow);
    TabArrowAuto.prototype.auto = function(){
        var This = this;
        var timer;
        function auto(){
            timer = setInterval( function(){
                var index = This.index + 1;
                if(index>=This.len)index = 0;
                This.change(index);
            },2000)
        }
        auto();
        this.tab.onmouseenter = function(){
            clearInterval(timer);
        };
        this.tab.onmouseleave = function(){
            auto();
        };
    };

    new TabArrowAuto(
        document.querySelectorAll("#tab .img li")
        ,document.querySelectorAll("#tab .tab-d ul li")
        ,document.querySelectorAll("#tab .arrow li")
        ,document.querySelector("#tab")
    );
})();
}