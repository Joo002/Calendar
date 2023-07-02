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
        ele_date.addEventListener("click", (e) => {selectedDate = dates[e.target.id]; calendar_update();})
        ele_date_.innerText = today.getDate();
        ele_date__.innerText = "　";
        if (thisMonth.getMonth() != today.getMonth()) { ele_date.classList.add("otherMonth") }
        if (selectedDate.getMonth() == today.getMonth() && selectedDate.getDate() == today.getDate()) { ele_date.classList.add("selected") }
        if (today.getDate() == 1) { ele_date.style.scrollSnapAlign = "start"; firstdatesLine.push(parseInt(i/7))}
        document.querySelector(".dates").append(ele_date);                
    }
    firstdatesLine = firstdatesLine.slice(0,3)
    document.querySelector(".dates").scrollTo(0,100*firstdatesLine[1])
}
function calendar_update_Month(){
    document.querySelector(".month").value = thisMonth.getFullYear() + "-" + String((thisMonth.getMonth() + 1)).padStart(2,'0');
    ele_dates = document.querySelectorAll(".date")
    for(i = 0; i < ele_dates.length; i++){
        ele_dates[i].classList.remove("otherMonth")
        if (thisMonth.getMonth() != dates[i].getMonth()) { ele_dates[i].classList.add("otherMonth") }
    }
    
    
}

calendar_update();

changed = false;

document.querySelector(".dates").addEventListener("scroll", e => {
    console.log(document.querySelector(".dates").scrollTop);
    if (document.querySelector(".dates").scrollTop < 300 && changed == false){
        thisMonth.setMonth(thisMonth.getMonth() - 1)
        calendar_update_Month();
        changed = true;
    }
    if (document.querySelector(".dates").scrollTop > 700 && changed == false){
        thisMonth.setMonth(thisMonth.getMonth() + 1)
        calendar_update_Month();
        changed = true;
    }
    if (document.querySelector(".dates").scrollTop <= (firstdatesLine[0] * 100 + 1)){
        calendar_update();
        changed = false;
    }
    if (document.querySelector(".dates").scrollTop >= (firstdatesLine[2] * 100 - 1)){
        calendar_update();
        changed = false;
    }
})