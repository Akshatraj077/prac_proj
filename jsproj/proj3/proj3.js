const clock = document.getElementById('clock')

setInterval(function(){
    let date = new Date();
    clock.innerHTML = date.toLocaleTimeString();
}, 1000);
 //1000 is written as it takes parameter in millisec therefore it'll get updated in every 1sec