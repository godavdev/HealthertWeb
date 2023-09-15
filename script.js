const carousele = document.querySelector(".carousele");
firstImg = document.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


const showHideIcons = () => {
    let scrollWidth = carousele.scrollWidth - carousele.clientWidth;
    arrowIcons[0].style.display = carousele.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousele.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () =>{
        let firstImgWidth = firstImg.clientWidth + 0;
        carousele.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    })
});

const autoSlide = () => {
    if(carousele.scrollLeft == (carousele.scrollWidth - carousele.clientWidth)) return;


    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 0;
    let valDifference = firstImgWidth - positionDiff;

    if(carousele.scrollLeft > prevScrollLeft){
       return carousele.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff; 
    }

    carousele.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference: -positionDiff;
     
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft= carousele.scrollLeft;
}

const dragging = (e) => {
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousele.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousele.scrollLeft = prevScrollLeft -  positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart=false;
    carousele.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousele.addEventListener("mousedown", dragStart);
carousele.addEventListener("touchstart", dragStart);

carousele.addEventListener("mousemove", dragging);
carousele.addEventListener("touchmove", dragging);

carousele.addEventListener("mouseup", dragStop);
carousele.addEventListener("mouseleave", dragStop);
carousele.addEventListener("touchend", dragStop);