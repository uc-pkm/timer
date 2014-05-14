function Timer(options){  
    defaults = {
        seconds: 3600,
        format: 'hh:mm:ss.ff',
        target: 'timer',
        defaultEndMsg: 'Bye',
        showTimer: 1,
        formId: '#frm',
        timeup: '#timeup',
        clock: '#clock',
        seperator: ":"
    };
    
    var settings = $.extend(defaults, options);
    settings.seperator = settings.format.charAt(2);
    
    // Private property
    var alive = true;
    var TimerId = 0;
    var milisec = 0;
    var seconds = settings.seconds;
    var target = settings.target;
    var speed = 100;
    

    this.start = start;
    this.pause = pause;
    
    // Private method
    function pause(){ 
        clearTimeout (TimerId);
    }   
    function timesUp()
    {
        clearTimeout(TimerId);
		$(settings.clock).hide();
		$(settings.timeup).val(1);
		$(settings.formId).submit();
    }
    function start(){
	if (milisec<=0)
	{
		milisec=9;
		seconds-=1;
	}
	if (seconds<=-1)
	{
		milisec=0;
		timesUp();
	}
	else if(seconds<=-1 && settings.showTimer===0)
	{
		milisec=0;
		$(target).text(settings.defaultEndMsg).attr("value",settings.defaultEndMsg);
		timesUp();
	}
	else
	{
		milisec-=1;
		hrs = Math.floor(seconds /3600);
		minute = Math.floor((seconds - (hrs * 3600)) /60);
		sec = Math.floor(seconds % 60);
		if (seconds<=0)
		{
			$(target).text(settings.defaultEndMsg).attr("value",settings.defaultEndMsg);
			timesUp();
		}
		else
		{
            var val = "";
            if(settings.format.indexOf("hh")>-1)
            {
                val += hrs+settings.seperator;   
            }
            if(settings.format.indexOf("mm")>-1)
            {
                val += minute+settings.seperator;   
            }
            if(settings.format.indexOf("ss")>-1)
            {
                val += sec;   
            }
            if(settings.format.indexOf("ff")>-1)
            {
                val += "."+milisec;   
            }
            $(target).attr("value",val).text(val);
            }
                TimerId = setTimeout(function(){start()},speed);
        }
    }
}
