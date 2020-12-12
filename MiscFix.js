let miscFix = {
    "runcase": () => { return /^[01]*$/.exec(Stg.get('miscFix')) },
    "config": [{
        "id": "miscFix",
        "default": "",
        "name": "杂项修复",
        "type": "text",
        "desc": "此值用于规定杂项修复的行为,默认值为空,修改为00000000000以关闭全部.错误的值会使该项失效.详情请查阅源码."
    }],
    "style": '',
    "core": () => {
        let fixconf = Stg.get('miscFix').split("");
        let fixlist = [
            // 暗牧悬浮预览
            { "style": ".t_f font[style*=\"background-color:black\"], .t_f font[style*=\"background-color:#000\"] {transition-duration: .3s;transition-delay: .5s;cursor: default;}.t_f font[style*=\"background-color:black\"]:hover, .t_f font[style*=\"background-color:#000\"]:hover {transition-delay: 0s;background-color: transparent!important;}" },
            //增加空方法,用于修复论坛的一个报错.
            { "script": "announcement = () => {};relatekw = ()=>{};" },
            //修复页脚问题
            { "style": ".mc_map_wp{min-height:calc(100vh - 202px)!important;}" },
            //修复用户组页面不对齐的问题
            { "style": ".tdats .tb{margin-top:0px}" },
            // 修复编辑器@超级加倍的问题
            { "script": "$(()=>{if(typeof setEditorEvents != \"undefined\"){let __setEditorEvents = setEditorEvents;setEditorEvents= ()=>{ __setEditorEvents();setEditorEvents=()=>{};}}})" },
            // 允许改变个人签名编辑框大小
            { "style": "#sightmlmessage{resize:vertical;}" },
            // 按住shift点击带有超链接的图片则不打开链接
            { "script": `$(()=>{$("img.zoom").parent().each((i,v)=>{if(v.nodeName=="A"){$(v).on("click",(e)=>{console.log(e);if(e.shiftKey){e.preventDefault();}})}})})` },
            // 修复某些页面书框被撕裂的问题
            { "script": "$(()=>{if(!$('.mc_map_wp .mc_map_border_foot').length){$('.mc_map_border_foot').remove();$('.mc_map_wp').append('<div class=\"mc_map_border_foot\"></div>')}})" },
            // 默认使用高清头像
            { "script": "let main = ()=>{$('.avt img, .avtm img, .special_photo img').each((i,v)=>{v.src=v.src.replace('middle','big').replace('small','big')});}; main(); $(this).on(\"DiscuzAjaxGetFinished DiscuzAjaxPostFinished\", main);" },
            // 主动聚焦编辑器iframe,修复报错问题.
            { "script": "$(()=>{if(typeof wysiwyg !='undefined' && wysiwyg){editwin.document.body.focus()};})" },
            // 小提示样式修复
            { "style": ".pc_inner{padding-left:12px}" }
        ];
        let styleContent = "";

        $(fixlist).each((i, v) => {
            if (typeof fixconf[i] == "undefined") { fixconf[i] = "1" }
            if (fixconf[i] === "1") {
                // 拼接样式字符串
                styleContent += fixlist[i].style ? fixlist[i].style : "";
                // 执行脚本
                eval(fixlist[i].script ? fixlist[i].script : "");
            }
        });
        MExt.Units.appendStyle(styleContent);
    }
};
