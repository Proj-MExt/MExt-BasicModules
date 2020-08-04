let disableAutoplay = {
    "runcase": () => { return MExt.ValueStorage.get("disableAutoplay") },
    "config": [{
        "id": "disableAutoplay",
        "default": false,
        "name": "禁止BGM自动播放",
        "type": "check",
        "desc": "阻止页内BGM自动播放."
    }],
    "core": () => {
        let clearAutoPlay = () => {
            $("iframe[id*=iframe_mp3]:not([id*=no_autoplay])").each((i, v) => {
                // 重构播放器,去除自动播放属性
                let player = document.createElement("iframe");
                let hidden = document.createElement("div");
                hidden.id = v.id;
                hidden.style.display = "none";
                player.id = v.id + "_no_autoplay";
                player.width = v.width;
                player.height = v.height;
                player.frameBorder = v.frameBorder;
                player.allow = v.allow;
                player.src = v.src.replace("&auto=1", "");
                v.after(hidden);
                v.after(player);
                v.remove();
                dlg("Canceled all autoplay");
            });
        };
        $(this).on("DiscuzAjaxGetFinished DiscuzAjaxPostFinished", () => { setTimeout(clearAutoPlay, 100); });
        $(clearAutoPlay);
    }
};