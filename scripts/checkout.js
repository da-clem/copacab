


    // $(document).ready(function() {

    //     setTimeout(function(){ 
    //         var hi = $('.pricemontagecheckout').html();
    //         console.log(hi);
    //         $('#montageDiv').append(hi);

    //      }, 3000);


    // });




    $(window).on('load', function() {
        //$('.pricemontagecheckout').hide();
        var totalPrice = 0;
        var montageprice =0;
       
        var checkExist = setInterval(function() {
            if ($('.priceitotalitem').length && $('.priceitotalitem:first').html()) {
                $('.priceitotalitem').each(function( index ) {
                    //console.log($(this).html());
                    totalPrice += parseInt($(this).html().replace( /\D+/g, ''));
                    //console.log(totalPrice);
                });
                if (totalPrice) {$('.pricetotal').html(totalPrice +' €');}
                montageprice = $('.pricemontagecheckout').html();
                $('#montageAmountText').html('Prix du montage en option : ' + montageprice + '€');
                if (montageprice){
                    $('.pricetotalmontage').html(montageprice +' €');
                } else {
                    $('.titre-h3-panier-montage').remove();
                    $('.pricetotalmontage').remove();
                    $('.blocmontage').remove();
                }

                clearInterval(checkExist);
            }
         }, 100);
    });