
selectedDate = new Date();

function calendar_update(Year, Month){
    //Update Month Text
    document.querySelector(".month").value = Year + "-" + String((Month + 1)).padStart(2,'0');

    for (j = -1; j < 2; j++){
        switch (j){
            case -1 : arg = "[class='container-date prev']"; break;
            case 0 : arg = "[class='container-date']"; break;
            case 1 : arg = "[class='container-date next']"; break;
        }
        thisMonth = new Date(Year, Month + j, 1);
        today = new Date(thisMonth)
        temp = document.createElement("div")
        //Draw Empty Date
        for (k = 0; k < thisMonth.getDay(); k++){
            ele_date = document.createElement("span");
            temp.append(ele_date);
        }
        //Draw Date Container
        for(i = 0; i < 31; i++){
            ele_date = document.createElement("span");
            ele_date_ = document.createElement("div");
            ele_date__ = document.createElement("div");
            ele_date.append(ele_date_)
            ele_date.append(ele_date__)
            ele_date.className = "date";
            ele_date.id = i
            ele_date.style.cursor = "pointer";
            ele_date_.innerText = today.getDate();
            //ele_date__.innerText = "900,000,000\\";
            if (thisMonth.getMonth() != today.getMonth()) { break; }
            if (selectedDate.getMonth() == today.getMonth() && selectedDate.getDate() == today.getDate()) { ele_date.classList.add("selected") }
            temp.append(ele_date);
            today.setDate(today.getDate() + 1);
        }
        document.querySelector(arg).innerHTML = temp.innerHTML
    }
    containerTop = Math.ceil(document.querySelector("[class='container-date prev']").childElementCount/7) * -101
    wrapperHeight = Math.ceil(document.querySelector("[class='container-date']").childElementCount/7) * 100
    document.querySelector(".container-dates").style.top = containerTop;
    document.querySelector(".wrapper-container-date").style.height = wrapperHeight;
}

calendar_update(2023, 6);







document.querySelector(".wrapper-container-date").addEventListener("touchstart", e => {
    touch_startY = e.changedTouches[0].clientY;
    document.querySelector(".container-dates").classList.remove('snap')
    console.log(e.target)
});
document.querySelector(".wrapper-container-date").addEventListener("touchmove", e => {
    touch_draggedY = touch_startY - e.changedTouches[0].clientY;
    if (touch_draggedY > wrapperHeight / 2){ console.log("a")}
    if (touch_draggedY < wrapperHeight / 2 * -1){
        calendar_update(2023, 5);
        //touch_startY += containerTop
        console.log("b")
    }
    document.querySelector(".container-dates").style.top = containerTop - touch_draggedY;
});
document.querySelector(".wrapper-container-date").addEventListener("touchend", e => {
    document.querySelector(".container-dates").classList.add('snap')
    document.querySelector(".container-dates").style.top = containerTop;
});