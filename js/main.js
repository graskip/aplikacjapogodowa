var apiKEY = "35fddddbf51ee444f49097dfc7d2af0b"

$(document).ready(function(){
    sidebar()
    rdata()
})

function start(loc, city, icon_, temp_){
    var xmlDATA
    $("#CITY").text(city)
    
    var getParam = function(param, attr, sufix){
        var s = $(xmlDATA).find(param).attr(attr)
        if(!isNaN(s)){
            s = Math.floor(s)
        }
        if(sufix){
            s = s+"."+sufix
        }
        return s
    }
    var l = function(){
        ///////!!!///////
        //alert(getParam("temperature", "value"))
        if(!temp_ || !icon_){
            var temp = getParam("temperature", "value")
            var icon = getParam("weather", "icon")
        }else{
            var temp = temp_
            var icon = icon_
        }
        ////
        ////! tutaj ewentualne zmiany
        $("#TEMP").html(temp+'<span class="deg">&deg;</span>')
        $("#COND").attr("src", "img/"+icon+".gif")
        ////!
        ////
        if($("#VIDEO source").attr("inactive")){
            $("#VIDEO").remove()
        }else{
            if(icon == "01d"){
                if(Math.random()<0.5){
                    icon = "01dalt"
                }
            }
            if(icon == "02d"){
                if(Math.random()<0.5){
                    icon = "02dalt"
                }
            }
            $("#VIDEO source").attr("src", "img/"+icon+".mp4")
            $("#VIDEO")[0].load();
        }
        $("#COND").removeClass()
        $("#COND").addClass("i"+icon)
        $("#MAIN").removeClass()
        if(icon.indexOf("d")>-1){
            $("#MAIN").addClass("day")
        }else{
            $("#MAIN").addClass("night")
        }
        $("#MAIN").addClass("i"+icon)
        $("#TEMP, #MAIN").removeClass("minus").removeClass("plus")
        if(temp < 0){
            $("#TEMP, #MAIN").addClass("minus")
        }else{
            $("#TEMP, #MAIN").addClass("plus")
        }
        $("#MAIN").addClass("temp"+Math.round(temp/5)*5)
        ///////!!!///////
    }
    if(!temp_ || !icon_){
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q="+loc+"&APPID="+apiKEY+"&mode=xml&units=metric",
            dataType: "xml",
            success: function(xml) {
                xmlDATA = xml
                l()
            }
        });
    }else{
        l()
    }
}

function sidebar(){
    var getLI = function(index){
        var el = $("#sidebar ul li").eq(index)
        var city = $(el).text()
        loc = $(el).data("loc")
        start(loc, city)
    }
    $("#button").click(function(){
        $("#sidebar").addClass("active")
    })
    $("#sidebar").click(function(){
        $("#sidebar").removeClass("active")
    })
    $("#sidebar ul li").each(function(index, el){
        $(el).click(function(){
            getLI(index) 
        })
    })
    getLI(0)
}

function rdata(){
    var cnt = 0
    var icons = ["01d", "01n", "02d", "02n", "03d", "03n", "04d", "04n", "09d", "09n", "10d", "10n", "11d", "11n", "13d", "13n", "50d", "50n"]

    $("#rnd").click(function(){
        var temp = Math.round(Math.random()*30-10)
        start("poznan,pl", "Poznań", icons[cnt], temp)
        cnt++
        if(cnt >= icons.length){
            cnt = 0
        }
    })
}
