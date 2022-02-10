function setDiashow(value){
    slides = createSlides(value);
    
    console.log("===\nslides: \n")
    console.log(slides);
    
    document.getElementById("slideshow").innerHTML = slides;
    
    $(.slideshow).slick();
}

function createSlides(value){
        count = 0
    switch(value){
        case "aladdin":
            count = 2;
            break;
        case "casablanca":
            count = 3;
            break;
        case "catharine":
            count = 5;
            break;
        case "fledermaus":
            count = 2;
            break;
        case "fma":
            count = 6;
            break;
        case "gruenfried":
            count = 3;
            break;
        case "roessl":
            count = 1;
            break;
        case "lord":
            count = 7;
            break;
        case "ludwig":
            count = 3;
            break;
        case "mamma":
            count = 6;
            break;
        case "paradise":
            count = 4;
            break;
        case "phantom":
            count = 3;
            break;
        case "sekretaerinnen":
            count = 4;
            break;
        case "wwry":
            count = 5;
            break;
    }
    divs = "";
    for(i = 1 ; i<= count; i++){
        img = "<img src=./media/images/"+value+"/"+i+".jpg></img>";
        div = "<div">"+img+"</div>\n";
        divs += div;
    }
    
    return divs;
}

function createSliderFromSlides(value){
    slider = "<div class=\"simple-slider\" style=\"max-width: 100%;\">"
+ "    <div class=\"swiper-container\">"
+ "        <div id=\"diashow-slide-wrapper\" class=\"swiper-wrapper\">"+value+"</div>"
+ "        <div class=\"swiper-pagination\"></div>"
+ "        <div class=\"swiper-button-prev\"></div>"
+ "        <div class=\"swiper-button-next\"></div>"
+ "    </div>"
+ "</div>"
    
    return slider;
}