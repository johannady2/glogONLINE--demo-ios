 $(document).ready(function()
{ 
      
    
       var defaultContent = 'splash.html';     
         $(".content-cont").load(defaultContent,  null, function(event,filename)
         {
			 $('.site-content').removeClass('container');
             $('body').css('background-image', 'url(' + '"img/splashbg.jpg"' + ')');
			 $('.content-cont').css( 'marginTop','0px' );
    		 $('.content-cont').css('marginBottom', '0px' );
			 $('body').bind('touchmove', function(e){e.preventDefault()});
			 $('.bxslider').bxSlider();

			 
			 
				 $(".slideToUnlock").on('click',function()
				 {      clearInterval(timerId);

						$('.site-content').addClass('container');
						$('body').css('background-image', 'none');
						$('.content-cont').css('marginTop','60px');
						$('.content-cont').css('marginBottom','60px');
						jQuery('body').unbind('touchmove');
					 	$('.bxslider').hide();
					 	
                  
                  

                    $('nav , footer').show();
                    $('.splashscreencont').remove();
                    
					  //chooseurl();
                  
                  
                    askExit();    
                    openHomePage();



                    
                  

				 });
         });

    $('body').on("click",'.yesExit', function()
     {
                         if (navigator.userAgent.match(/(iPod|iPhone|iPad)/))
                         {
                            alert('Use home button to exit on ios device');
                         }
                         else
                         {
                              navigator.app.exitApp(); //This will Close the App
                         }
     });

    $('body').on("click",'.noContinue', function()
    {  
        openHomePage();
    });


     $('body').on('click','.chooseurl', function()
    {
         
         $('.noti-any , .noti-blanket').hide();
         $('.noti-any').empty();
         
        if($(this).attr('class') == 'btn btn-large btn-success chooseurl g-log')
        {
            glogOrViveg = 'g-log.co';
            
            
        }
        else if($(this).attr('class') == 'btn btn-large btn-primary chooseurl viveg')
        {
             glogOrViveg = 'viveg.net';
             
        }
         
        askExit();
        openHomePage();
     });
     
 });
