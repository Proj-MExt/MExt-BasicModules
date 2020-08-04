let fixAnchor = {
    "runcase": () => { return MExt.ValueStorage.get("fixAnchor") },
    "config": [{
        "id": "fixAnchor",
        "default": false,
        "name": "帖内锚点修复",
        "type": "check",
        "desc": "防止帖内锚点被意外的赋予样式."
    }],
    "style": `table.plhin td.t_f span[id]:not([id^=anchor_]), .fastpreview span[id]:not([id^=anchor_]) {
display: none;
}`,
    "core": () => {
        let fix = () => {
            $("table.plhin td.t_f span[id]:not([id^=anchor_]),.fastpreview span[id]:not([id^=anchor_])").each((i, v) => {
                $("a[href$=#" + v.id + "]").each((i, v) => {
                    v.href.replace("#" + v.id, "#anchor_" + v.id);
                });
                v.id = "anchor_" + v.id;
            });
            dlg('Anchor fixed.');
        }
        $(fix);
        $(this).on("DiscuzAjaxGetFinished DiscuzAjaxPostFinished", fix);
    }
};