thisMonth = new Date();
thisMonth.setDate(1);
selectedDate = new Date();

function calendar_update(){
    dates = []
    firstdatesLine = []
    document.querySelector(".month").value = thisMonth.getFullYear() + "-" + String((thisMonth.getMonth() + 1)).padStart(2,'0');

    document.querySelector(".dates").innerHTML = ""
    for(i = 0; i < (7 * 16); i++){
        today = new Date(thisMonth - (86400000 * thisMonth.getDay()) + (86400000 * (i - 35)));
        dates.push(today);
        ele_date = document.createElement("span");
        ele_date_ = document.createElement("div");
        ele_date__ = document.createElement("div");
        ele_date.append(ele_date_)
        ele_date.append(ele_date__)
        ele_date.className = "date";
        ele_date.id = i
        ele_date.style.cursor = "pointer";
        ele_date_.innerText = today.getDate();
        ele_date__.innerText = "900,000,000\\";
        if (thisMonth.getMonth() != today.getMonth()) { ele_date.classList.add("otherMonth") }
        if (selectedDate.getMonth() == today.getMonth() && selectedDate.getDate() == today.getDate()) { ele_date.classList.add("selected") }
        if (today.getDate() == 1) { firstdatesLine.push(parseInt(i/7))}
        document.querySelector(".dates").append(ele_date);                
    }
    firstdatesLine = firstdatesLine.slice(0,3)
    //document.querySelector(".dates").scrollTo(0,100*firstdatesLine[1])
}
function calendar_update_Month(){
    document.querySelector(".month").value = thisMonth.getFullYear() + "-" + String((thisMonth.getMonth() + 1)).padStart(2,'0');
    ele_dates = document.querySelectorAll(".date")
    for(i = 0; i < ele_dates.length; i++){
        ele_dates[i].classList.remove("otherMonth")
        if (thisMonth.getMonth() != dates[i].getMonth()) { ele_dates[i].classList.add("otherMonth") }
    }
    
    
}

drag_mode = 0;


calendar_update();
document.querySelector(".dates").scrollTo(0,500)
document.querySelector(".dates").addEventListener("mousedown", e => {
    clicked_scrollY = document.querySelector(".dates").scrollTop;
    clicked_mouseY = e.clientY;


    temp = mouseY;
    window.setTimeout(function(){
        if(temp == mouseY){
            selectedDate = dates[e.target.id]; calendar_update();
            drag_mode = 2;
        } else {
            drag_mode = 1;
        }
    }, 50)
})

window.addEventListener("mousemove", e => {
    mouseY = e.pageY;
    if(drag_mode == 1 && e.buttons == 1){
        if (document.querySelector(".dates").scrollTop < ((firstdatesLine[0] + firstdatesLine[1])/2 * 100)){
            clicked_scrollY += ((firstdatesLine[1] - firstdatesLine[0]) * 100);
            thisMonth.setMonth(thisMonth.getMonth() - 1)
            calendar_update();
        }
        if (document.querySelector(".dates").scrollTop > ((firstdatesLine[1] + firstdatesLine[2])/2 * 100)){
            clicked_scrollY += ((firstdatesLine[1] - firstdatesLine[2]) * 100);
            thisMonth.setMonth(thisMonth.getMonth() + 1)
            calendar_update();
        }
        document.querySelector(".dates").scrollTo(0, clicked_scrollY + clicked_mouseY - e.clientY)
    }
    if(drag_mode == 2 && e.buttons == 1){
        if(e.target.classList.contains("date") && !(e.target.classList.contains("otherMonth"))){
            selectedDate = dates[e.target.id]; calendar_update();
        }
    }
})
window.addEventListener("mouseup", e => {
    document.querySelector(".dates").scrollTo({top:(firstdatesLine[1] * 100), left:0, behavior:'smooth'})
    drag_mode = false;
})
