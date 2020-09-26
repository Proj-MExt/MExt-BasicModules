const animationGoToTop = {
    "meta": {
        "id": "MExt_animationGoToTop",
        "name": "Animation Go To Top",
        "version": "1.0.0",
        "updateInfo": []
    },
    "runcase": () => { return MExt.Storage.get("animationGoToTop") },
    "config": [{
        "id": "animateGoToTopButton",
        "default": true,
        "name": "回到顶部按钮美化",
        "type": "check",
        "desc": "为右侧回到顶部按钮增加动画以及位置修正."
    }],
    "style": `#scrolltop {
bottom: 270px!important;
visibility: visible;
overflow-x: hidden;
width: 75px;
}

.scrolltopa {
transition-duration: .15s;
margin-left: -40px;
opacity: 0;
}

.scrolltopashow {
margin-left: 0px;
opacity: 1;
}`,
    "core": () => {
        unsafeWindow.showTopLink = () => {
            let ft = $('#ft')[0];
            if (ft) {
                let scrolltop = $('#scrolltop')[0];
                if (!scrolltop) {
                    return false;
                }
                let scrolltopbtn = $(".scrolltopa");
                let scrollHeight = parseInt(document.body.getBoundingClientRect().top);
                let basew = parseInt(ft.clientWidth);
                let sw = scrolltop.clientWidth;
                if (basew < 1000) {
                    let left = parseInt(fetchOffset(ft)['left']);
                    left = left < sw ? left * 2 - sw : left;
                    scrolltop.style.left = (basew + left + 44) + 'px';
                } else {
                    scrolltop.style.left = 'auto';
                    scrolltop.style.right = 0;
                }
                if (scrollHeight < -100) {
                    scrolltopbtn.addClass("scrolltopashow");
                } else {
                    scrolltopbtn.removeClass("scrolltopashow");
                }
            }
        }
        showTopLink();
    }
};
