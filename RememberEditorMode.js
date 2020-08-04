let rememberEditorMode = {
    "runcase": () => { return MExt.ValueStorage.get("remenberEditMode") },
    "config": [{
        "id": "remenberEditMode",
        "default": true,
        "name": "记忆编辑器模式",
        "type": "check",
        "desc": "记忆高级编辑器是纯文本模式还是即时模式."
    }],
    "core": () => {
        if (localStorage.getItem("MExt_EditMode") === null) {
            localStorage.setItem("MExt_EditMode", "false");
        }
        $(() => {
            dlg("Remenber Editor Mode actived.");
            $("#e_switchercheck").on("click", (e) => {
                dlg("Editor mode switch.");
                localStorage.setItem("MExt_EditMode", e.currentTarget.checked.toString());
            });
            if (localStorage.getItem("MExt_EditMode") == "true") {
                dlg("Switch editor mode");
                $("#e_switchercheck").click();
            }
        });
    }
};