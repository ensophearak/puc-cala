


		
				var AbaPayway = (function (options) {
	"use strict"

	var _checkout = function(){

		if ($(window).width() < 500) {
			//Disable scrool in iOS
			$('.aba-modal').height($(window).height() - 30);
			$('html, body').css({"overflow":"hidden", "height":"0"});
			$('.aba-modal-content').css({'width':$(window).width()-25+'px', 'margin-left':'0'});
		}

		$('.dropdown-menu').hide();

		$('#aba_main_modal').append('<div class="aba-loader"></div>');



		$('.aba-modal-content').append('<iframe scrolling="yes" class="aba-iframe" src="" name="aba_webservice" id="aba_webservice"></iframe><span class="aba-close" ><img src="https://firebasestorage.googleapis.com/v0/b/puccala-b98b9.appspot.com/o/close.png?alt=media&token=2dcd1b6e-cb74-42f7-a683-1398d41885e6"/></span>');
		


		// Get the modal
		$('#aba_main_modal').css('display','block');


		$('#aba_main_modal').click(function(){ $(this).focus(); });

		if($('#aba_merchant_request, #respayment').submit()){

			var form = this;
			$(':submit', form).attr('disabled', false);

			setTimeout(function(){ $('.aba-loader').hide(); }, 5000);

			$('#aba_webservice').load(function(){
				$('.aba-loader').hide();
			});
		}

		//---------Close Popup----------------------------
		$(document).on("click", ".aba-close", function () {
			closePopup();
		});
	}

	var closePopup = function (){
		var confirmClose = confirm("Do you want to leave?");
		if (confirmClose == true) {
			if($('#aba_main_modal').hide()){
				$('#aba_webservice').attr('src', "");
				document.location.reload(true);

				if ($(window).width() < 500) {
					$('html, body').css({"overflow":"auto", "height":"auto"});
					//Enable scrool in iOS
				}
			}
		}
	}

	return {
		checkout: _checkout
	}
})();

			
	
