$(document).on('itemScanned',function(event,scanResult)
{
  if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/))
    {   
		if(networkstatus == 'disconnected')
		{
			$('.content-cont').empty();
			$('.content-cont').append('Disconnected. Please try again once online.');
			//can add "click here" with scanResult variable to retrieve once online.
			//by modifying ondeviceonline code, i can make it load automatically once online.
			
			scanResultWhenOffline = scanResult;
		}
		else
		{

			  askExit();//because it was set to loading before scanner start scanning
			  //renderOnlineSinglePage(scanResult);
              //ref = window.open('http://viveg.net/index.php?id_product=78&controller=product', '_blank', 'location=no,toolbar=no');
              ref = window.open('http://'+glogOrViveg+'/redirect.php?barcode='+scanResult, '_blank', 'location=no,toolbar=no');
               eventListeners();


		}

 

    }
});