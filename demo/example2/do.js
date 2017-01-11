/**
 * Created by zero on 2017/1/11.
 */
function showDetail(id) {
    var iframe = document.createElement('iframe');
    iframe.src = 'detail/detail.html';
    iframe.width = window.innerWidth;
    iframe.height = window.innerHeight;
    document.body.appendChild(iframe);
    iframe.style.position = 'absolute';
    iframe.style.top = 0;
    iframe.style.left = 0;
    iframe.style.zIndex = 1000000;
    iframe.style.border = 0;
    iframe.id = 'detailPage';
    // window.location.href = 'detail/detail.html';
    // window.showModalDialog("index",null,"dialogWidth=400px;dialogHeight=736px");
}