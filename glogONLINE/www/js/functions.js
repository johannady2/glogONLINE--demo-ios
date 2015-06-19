	var glogOrViveg = '';

    var networkstatus = '';
    var ref = null;
	var onlineSingleItemPictureFileName;
	var onlineSingleItemBarcode;
	var onlineSingleItemBrand;
	var onlineSingleItemFullDescription;
	var onlineSingleItemPromoName;
	var onlineSingleItemPromoPrice;
    var stocksavailable;   
    var onlineSingleItemStocksAvailable;


    var scancounter;
    var locationcounter;
    var closecounter;
          

    var bTimerId;                                                 

    var timerId;
    setTimeout(function()
    {


    timerId = setInterval(function(){  bugFix(); }, 1800);

    }, 3000);







	if(scanResultWhenOffline == null)//initialize when not initialized
	{
		var scanResultWhenOffline;
	}





    function onBodyLoad()
	{   
		document.addEventListener("offline", onDeviceOffline, false);
		document.addEventListener("online", onDeviceOnline, false);


	}
	  //listen for changes






	function onDeviceOffline()
	{


		$('.splashscreencont').hide();
		$('.noti-blanket , .noti-offline').show();

			networkstatus = 'disconnected';


	}

                                                                                    


	function onDeviceOnline()
	{ 
        


        
		networkstatus = 'connected';
		if(scanResultWhenOffline != null)
		{
			renderOnlineSinglePage(scanResultWhenOffline);
		}


		$('.noti-blanket, .noti-offline, .splashscreencont').hide();
		$('.splashscreencont').show();
		$('.splashloading').hide();
		$('.slideToUnlock').show();
        

        
	}

function Exit()
{
              navigator.notification.confirm(
                'Do you want to exit app?',  
                function(i){
                    if(i==2)
                     {
                         if (navigator.userAgent.match(/(iPod|iPhone|iPad)/))
                         {
                            alert('Use home button to exit on ios device');
                         }
                         else
                         {
                              navigator.app.exitApp(); //This will Close the App
                         }
                     }
                },              
                '',            
                'Cancel,Exit'          
              );
 }

function bugFix()//sometimes noti popups don't appear so we check it and make them appear.
{

	if($('.splashpageindicator').is(":visible"))
	{
		if(($('.slideToUnlock').is(":visible") == false) && ($('.splashloading').is(":visible")== false))
		{
			
			
			if(($('.noti-offline').is(":hidden") == true) && ($('.noti-online').is(":hidden") == true))
			{
				
				if(networkstatus !='disconnected' && networkstatus !='connected')
				{
					location.reload();
				}
			}
			
		}
		else
		{
			$('.noti-offline').hide();
			$('.noti-online').hide();
		}
		
		

	}
}


	/*----------------------------------------------------------------------*/
	/*-------------------custom events-------------------------------*/
	/*----------------------------------------------------------------------*/


	function doneScanning(event,scanResult)
	{

		$(document).trigger('itemScanned',[scanResult]);

	}

	/*----------------------------------------------------------------------*/
	/*-------------------//custom events-------------------------------*/
	/*----------------------------------------------------------------------*/

	/*----------------------------------------------------------------------*/
	/*-------------------online-single-item.html------------------------------*/
	/*----------------------------------------------------------------------*/
	function renderOnlineSinglePage(scanResult)
	{
		$(".content-cont").empty();
		$(".content-cont").append('<img src="img/loading.gif" style="margin:15% auto; width:25%; display:block;"/>');


				$.when($.getJSON('http://www.'+glogOrViveg+'/api4v2.php?format=json&barcode='+scanResult+'&user=wcu&pass=v1v3g')).done(function(forOnlineSingleData)
				{

						$.each(forOnlineSingleData, function( index, value ) 
						  {

								$.each(value, function(inde, valu)
								{
									$.each(valu, function(ind, val)
									{
										$.each( val, function( i, v )
										{

											//{"ALL":[{"posts":{"RowNumber_InvtyCat":"27","SysPk_InvtyCat":"SY - 211","SKU_InvtyCat":"SY - 211","PictureFileName_InvtyCat":"http:\/\/g-log.co\/img\/p\/5\/3\/53.jpg","Barcode_InvtyCat":"4806508161665","Brand_InvtyCat":"Sanyang Study Table","FullDescription_InvtyCat":"<p>Wooden Sanyang study table. Available colors in beige and black.<\/p>","PromoName_InvtyCat":"Sanyang Study Table","PromoPrice_InvtyCat":"2678.571429"}}]}	


												if(i == 'PictureFileName_InvtyCat')
												{	
													onlineSingleItemPictureFileName = val[i];
												}
												else if(i == 'Barcode_InvtyCat')
												{
													onlineSingleItemBarcode = val[i];
												}
												else if(i == 'Brand_InvtyCat')
												{
													onlineSingleItemBrand = val[i];
												}
												else if(i == 'FullDescription_InvtyCat')
												{
													 onlineSingleItemFullDescription = val[i];
												}
												else if(i == 'PromoName_InvtyCat')
												{
													 onlineSingleItemPromoName = val[i];
												}
												else if(i == 'PromoPrice_InvtyCat')
												{
													 onlineSingleItemPromoPrice = val[i];
												}
                                                else if(i == 'Stock_InvtyCat')
                                                {
                                                    onlineSingleItemStocksAvailable = val[i];
                                                }
                                               /* else if(i == 'PromoStartDate_CatMstr')
                                                {
                                                    onlineSingleItemPromoStartDate = val[i];
                                                }
                                                else if(i == 'PromoEndDate_CatMstr')
                                                {
                                                    onlineSingleItemPromoEndDate = val[i];
                                                }*/
                                               

										});	

									});	

								});
						  });


				}).then(function(objects)
				{



					 $(".content-cont").empty();
					if(onlineSingleItemBarcode != null && onlineSingleItemBarcode != '')
					{
						$(".content-cont").unload().load('online-single-item.html',  null, function()
						{	
                            //alert(onlineSingleItemPromoStartDate);
                            //alert(onlineSingleItemPromoEndDate);
							$('.addToPrestaCart').attr('data-barcode',onlineSingleItemBarcode);
							$('.onlineSingleItemPromoPrice').append(onlineSingleItemPromoPrice);
							$('.glogtotal').append(onlineSingleItemPromoPrice);
							$('.onlineSingleItemPictureFileName').attr('src',onlineSingleItemPictureFileName);
							$('.onlineSingleItemFullDescription').append(onlineSingleItemFullDescription);
							$('.onlineSingleItemBrand').append(onlineSingleItemBrand);
							$('.onlineSingleItemPromoName').append(onlineSingleItemPromoName);
							$('.onlineSingleItemStocksAvailable').append(onlineSingleItemStocksAvailable);
                           
                            if(onlineSingleItemStocksAvailable <= 0)
                            {
                                $('.addToPrestaCart').after('<p class="warning">Item out of stock</p>');
                                $('.addToPrestaCart').hide();
                            }
                            /*
                            setTimeout(function()
                            {
                                 $('.content-cont').empty();
                                $('.content-cont').append('<p>Time Out. Please Scan Again.  <a href="#" onclick="scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback)">Click here</a></p>');

                            }, 60000);*/

							/*because when item is not available, variables are not updated which causes the last avaialble item to appear on online-single-item.html... By assigning them with '' value, I can output, "iteme unavailable" when value is '' item is not available according to the api*/
							onlineSingleItemPictureFileName = '';
							onlineSingleItemBarcode = '';
							onlineSingleItemBrand = '';
							onlineSingleItemFullDescription = '';
							onlineSingleItemPromoName = '';
							onlineSingleItemPromoPrice = '';
                            stocksavailable =  onlineSingleItemStocksAvailable;
                            onlineSingleItemStocksAvailable = '';
                            
                            
						});


					}
					else
					{
						$(".content-cont").empty();
						$(".content-cont").append('<p>Item Unavailable</p>');
					}


				});



	}



	$(document).on('input','#onlineSingleItemEnteredQuantity',function ()
	{
		/*keycodes undefined are undefined so i did this instead*/
		var glogprice = $('.onlineSingleItemPromoPrice').html(); 

		 var currentvalue = $('#onlineSingleItemEnteredQuantity').val();
		 var glogqlen = $.trim($('#onlineSingleItemEnteredQuantity').val());

		//alert('glogqlen ='+glogqlen);

		if(glogqlen.length>0 && currentvalue != 0 && currentvalue !='0' && testinput(/[^0-9]/, currentvalue)==0)//if not empty && not zero && (does not contain any none numeric)
		{
		  //alert('in if');
			//alert('currentvalue =' + currentvalue);
            
            var newvalue = currentvalue.toString().replace(/[^0-9]+/g, '');
	    
		
            

            if(parseInt(newvalue) > parseInt(stocksavailable))
            {
                $('#onlineSingleItemEnteredQuantity').blur();
                
                $('.noti-any , .noti-blanket').show();
                $('.noti-any').empty();
                $('.noti-any').append('There are only  ' + stocksavailable + '  stocks left');
                
                
                
                setTimeout(function()
                {
                     $('.noti-any , .noti-blanket').hide();
                }, 1500);
                               
               $('#onlineSingleItemEnteredQuantity').val(stocksavailable); 
            }
            else
            {   $('#onlineSingleItemEnteredQuantity').val(newvalue);
			    
            }
            
            var qval = $('#onlineSingleItemEnteredQuantity').val();


		}
		else
		{

		  //alert('in else');
			currentvalue = 1;
		   // //alert('currentvalue =' + currentvalue);

			var newvalue = currentvalue.toString().replace(/[^0-9]+/g, '');
            
			$('#onlineSingleItemEnteredQuantity').val('');
			var qval = 1;
            

		}


		//alert('after if else');



			parseInt(qval);

		   // //alert(qval);
			var glogtotaltemp = qval *  glogprice;   
			var glogtotal = glogtotaltemp.toFixed(2);
		   // //alert('glogtotal =' + glogtotal);
			$('.glogtotal').empty();
			$('.glogtotal').append(glogtotal);


			$('.addToPrestaCart').attr('data-quantity',qval);
			//$('.addToPrestaCart').attr('data-subtotal',glogtotal);//no need for this data


	});


	function testinput(re, str)
	{


		if (re.test(str) && (str.length == 1))
		{
		   // //alert('contains none numeric and string length == 1');
			return 1;
		} 
		else
		{
		  //  //alert('does not contain none numeric || or contains but length > 1');
			return 0;
		}

	}


	$('body').on('click','.addToPrestaCart',function()
	{

		ref = window.open('http://'+glogOrViveg+'/index.php?barcode='+$(this).attr('data-barcode')+'&quantity='+$(this).attr('data-quantity')+'&localmobiledate='+getDateNow()+'&glog-app-access=76ef0d45220fdee3ac883a0c7565e50c', '_blank', 'location=no,toolbar=no');
        eventListeners();


	});

    $('body').on('click','.viewOnlineCart',function()
    {
    
    
        ref = window.open('http://'+glogOrViveg+'/index.php?controller=order', '_blank', 'location=no,toolbar=no');
        eventListeners();
        

    });

    $('.changeLocation').on('click', function()
    {
        chooseurl();
    });
	/*-----------------------------------------------------------------------*/
	/*-------------------//online-single-item.html-------------------------------*/
	/*----------------------------------------------------------------------*/

	function getDateNow()
	{

		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var seconds = d.getSeconds();

		var output = d.getFullYear() + '-' +
			(month<10 ? '0' : '') + month + '-' +
			(day<10 ? '0' : '') + day;

		return output;
	}



$('.content-cont').bind("DOMSubtreeModified",function()
{
//hide toggle menu if back button is visible
    
        if($(document).width() <= 767)
        {
            if($('.foronlinesingleonly').is(":visible"))
            {
                $('.navbar-default .navbar-toggle').hide();
            }
            else
            {
                 $('.navbar-default .navbar-toggle').show();
            }
        }
        else
        {
             $('.navbar-default .navbar-toggle').hide();
        }

 
});



function askExit()
{ 
    $('.content-cont').empty();
    $('.content-cont').append('<div class="row"><div class="col-md-12 col-sm-12 col-xs-12"><br><p>Would you like to exit this application?</p></div><div class="col-md-12 col-sm-12 col-xs-12"><button class="btn btn-sm btn-success noContinue">Continue Shopping</button></div><div class="col-md-12 col-sm-12 col-xs-12"><br><button class="btn btn-sm btn-danger yesExit">Exit</button></div><div class="col-md-12 col-sm-12 col-xs-12 disabledHere"></div></div>');
  						
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/))
	 {
	    $('.yesExit').hide();

	    $('.disabledHere').append('<button class="btn btn-sm btn-danger yesExitDisabledLook">Exit</button></div></div>');
  						
	 }

}

function openHomePage()
{
    
                    ref = window.open('http://'+glogOrViveg+'/index.php?glog-app-access=76ef0d45220fdee3ac883a0c7565e50c', '_blank', 'location=no,toolbar=no');
                    eventListeners();

}

function eventListeners()
{

                     ref.addEventListener('loadstart', function(event) { /*alert('start: ' + event.url);*/  });
                    ref.addEventListener('loadstop', function(event)
					{
						

						ref.insertCSS({  file: "http://viveg.net/inappbrowserfiles/custom.css" },function(){ /*alert('css inserted');*/});

						ref.executeScript({	file: "http://viveg.net/inappbrowserfiles/customdemo.js"}, 
                                          
                                          function(values){

                                          	 		clearInterval(bTimerId);
                                                   	bTimerId = setInterval(
                                                       function(values)
                                                        {
                                                             scancounter = 0;
                                                             locationcounter = 0;
                                                             closecounter = 0;
                                                           
                                                            ref.executeScript(
                                                            { code:'getSomething()' },
                                                                function(values){
                                                                var data = values[0];
                                                                	
                                                                	//alert(data.func);
                                                                    if(data.func == 'close')
                                                                    {
                                                                       if(closecounter == 0)
                                                                       {
                                                                           closecounter += 1;
                                                                           ref.close();
                                                                           askExit();
                                                                           clearInterval(bTimerId);
                                                                       }
                                                                    }
                                                                    else if(data.func == 'scan')
                                                                    {
                                                                        if(scancounter == 0)
                                                                        {
                                                                            scancounter += 1;

                                                                          ref.close();
                                                                            $('.content-cont').html('<img src="img/loading.gif" style="margin:15% auto; width:25%; display:block;"/>');
                                                                            clearInterval(bTimerId);
                                                                            setTimeout(function()
																		    {

																			   scanner.startScanning(MWBSInitSpace.init,MWBSInitSpace.callback);
                                                                           
																		    }, 2250);
                                                                            //$('.navbar-nav .scan-btn').click();
                                                                            //alert('clicked');
                                                                            
                                                                        }
                                                                    }
                                                                    else if(data.func == 'location')
                                                                    {
                                                                    
                                                                      if(locationcounter == 0)
                                                                      {
                                                                          locationcounter += 1;
                                                                       ref.close();
                                                                       $('.content-cont').empty();
                                                                       clearInterval(bTimerId);
                                                                       chooseurl();
                                                                      }
                                                                    }
                                                                  
                                                                    
                                                                    
                                                            });
                                                        }
                                                        , 2000);                                                   
                                                    
                        });

                       
                    });
                     ref.addEventListener('loaderror', function(event) { /*alert('error: ' + event.message);*/ });
                     ref.addEventListener('exit', function(event) { /*alert(event.type);*/});
}

function chooseurl()
{                  
    $('.noti-any').empty();
    $('.noti-any').append('<button class="btn btn-large btn-success chooseurl g-log">G-Log</button><br><br><button class="btn btn-large btn-primary chooseurl viveg">Viveg</button>');
    $('.noti-any , .noti-blanket').show();
}

