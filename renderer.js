// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const $ = require("jquery");
$(() => {
  $("webview[data-id='1']").css("display", "flex");

  $("li[data-id]").click(function (e){
    $(`webview[data-id="${$(this).attr("data-id")}"]`).css("display", "flex");
    $(`webview:not([data-id="${$(this).attr("data-id")}"])`).css("display", "none");
    console.log($("webview"));
  });
})
