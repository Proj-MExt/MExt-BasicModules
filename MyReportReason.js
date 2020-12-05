let myReportReason = {
    "runcase": () => { return parseInt(MExt.ValueStorage.get('myReportReasonCols')) > 0 },
    "config": [{
        "id": "myReportReason",
        "default": "广告垃圾\n恶意灌水\n违规内容\n重复发帖",
        "name": "自定义举报理由",
        "type": "textarea",
        "desc": "在举报时提供自定义的举报理由,一行一个理由,显示时先从上到下排满一列之后再下一列"
    },{
        "id": "myReportReasonCols",
        "default": 2,
        "name": "举报理由显示列数",
        "type": "num",
        "desc": "在举报界面你的举报理由要分为多少列,填写非正值使用原版举报页面"
    }],
    "core": () => {
        // 获得举报内容列表函数
        let getReasons = () => {
                // 分隔list
                let reportReason = Stg.get('myReportReason').split("\n");
                let rrstr = '<p class="mtn mbn"><table style="min-width: 30em"><tr>';
                // 让用户选完理由之后可以继续编辑理由
                let createElement = (i) =>
`<td><label>
<input type="radio" name="report_select" class="pr" onclick="jQuery('#report_message').val('${reportReason[i]}').focus()" value="${reportReason[i]}">
${reportReason[i]}</label></td>`;
                let width = parseInt(Stg.get('myReportReasonCols'));
                let height = Math.ceil(reportReason.length / width);
                // 排序方式如此是为了在编辑自定义举报理由把短理由放在一起时它们更有可能出现在同一列
                for(let i = 0; i < height; i++){
                    for(let j = 0; j < width; j++){
                       rrstr += height * j + i >= reportReason.length ? "" : createElement(height * j + i);
                    }
                    rrstr += "</tr><tr>"
                }
                rrstr += "</tr></table></p>";
                return rrstr;
            }
            // 举报按钮钩子函数
        let hookReportWin = () => {
            if ($("#report_reasons[appended]").length > 0) { return false; };
            let reportContent = getReasons();
            // 隐藏原版的理由，说实话那几个理由很鸡肋，因此把它们变成默认的自定义理由，这样用户可以删除它们，顺便解除弹窗的宽度限制
            $("#report_reasons").attr("appended", "true").attr("hidden", "true").before(reportContent).parent().parent().css("width", "");
            $("#report_other").attr("style","");
        }
        $("#append_parent").on('DOMNodeInserted', hookReportWin);
        $("body").append("<style>#report_message { width: 97% !important}</style>");
    }
};
