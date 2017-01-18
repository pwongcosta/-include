"use strict";

//Hide preload animation after the window has finished loading
jQuery(window).on('load', function () {
    $('#preloadpage').addClass('animated slideOutDown');
});

$(document).ready(function(){
    //Various Sliders options and configurations
    //More Options -> https://owlcarousel2.github.io/OwlCarousel2/docs/api-options.html
    // Slider Section BX Slider Settings
    $("ul.owl-carousel.top_slider").owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        autoplay:true,
        autoplayTimeout:9000,
        smartSpeed:1000,
        onChange: function(){
            beforeslide();
        },
        onChanged: function(){
            setTimeout(function(){
                afterslide();
            }, 500);
        }
    });

    // Team Section BX Slider Settings
    $("ul.owl-carousel.team_slider").owlCarousel({
        margin: 30,
        nav: true,
        dots: false,
        loop: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 4
          }
        }
    });

    // Causes Section BX Slider Settings
    $("ul.owl-carousel.causes_slider").owlCarousel({
        margin: 70,
        nav: true,
        dots: false,
        loop: true,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1000: {
            items: 3
          }
        }
    });

    // Projects Section BX Slider Settings
    $("ul.owl-carousel.projects_slider").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        smartSpeed: 1000,
        autoplay:true,
        autoplayTimeout: 9000
    });
    
    // Sponsors Section BX Slider Settings
    $('ul.sponsor_slider').bxSlider({
        minSlides: 2,
        maxSlides: 5,
        slideWidth: 170,
        slideMargin: 40,
        ticker: true,
        speed: 30000
    });

    //Hide mobile menu when you click link 
    $("ul.mobile-nav li a").on('click', function() {
        $('#mobilemenu').collapse('hide');
    });

    //An amount is selected on donate form
    $('input[type=radio][name=xamount]','#DonateForm').on('change', function() {
        //copy value of selection to amount field
        $('input[name=amount]','#DonateForm').val(this.value);
        //clear custom amount field
        $('input[type=text][name=yamount]','#DonateForm').val('');

        checkmonthlydonation();
    });

    //User enters a custom amount
    $('input[type=text][name=yamount]','#DonateForm').on('keyup', function() {
        //clear radio selection for predefined amounts
        $('input[type=radio][name=xamount]','#DonateForm').prop('checked', false);
        //copy input value to amount field
        $('input[name=amount]','#DonateForm').val(this.value);
    });

    //select monthly contribution
    $('input[type=checkbox][name=monthly]','#DonateForm').on('change', function() {
        checkmonthlydonation();
    });

    checkmonthlydonation();

    //Click event to scroll to top
    $('.scrollToTop').on('click', function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
    });

    //Form Validation
    $.validate({
        lang: 'en',
        onSuccess : function($form) {
            if($form.attr('id') === 'ContactForm'){
                 contactformsubmitdetailsjax();
                 return false;
            }else if($form.attr('id') === 'VolunteerForm'){
                 volunteerformsubmitdetailsjax();
                 return false;
            }
        },
    });

    // ScrollReveal - For more config details visit: https://www.npmjs.com/package/scrollreveal
    window.sr = ScrollReveal({
        origin: 'right', // 'bottom', 'left', 'top', 'right'
        distance: '10px', // 'transition distance'
        duration: 1000, // 'how long the transition will take'
        scale: 1.0 // 'Change in size of the section; 1.0 means original size is maintained'
    });

    sr.reveal('#about .row.point, #newsandevents .event-item, #ContactForm'); // comma separated sections for scroll reveal
    sr.reveal('#map, #latestnews .newsitem', {origin:'left'}); // scroll reveal with left origin

    //Top header with menu changes on scroll
    $(document).on('scroll', function() {
        var x = $(document).scrollTop();
        if(x > 200){
            $('section#header').css({"padding-bottom":"8px","padding-top":"8px","border-top":"4px solid #000000"});
            $('.scrollToTop').fadeIn();
        };
        if(x < 200){
            $('section#header').css({"padding-bottom":"20px","padding-top":"20px","border-top":"15px solid #000000"});
            $('section#header img').css({"height":"","width":""});
            $('.scrollToTop').fadeOut();
        };
    });

    //Check if monthly donation checkbox is checked or not
    function checkmonthlydonation(){
        //copy value of selection to amount field
        if($('input[type=checkbox][name=monthly]','#DonateForm').is(':checked')) {
            $('input[name=cmd]','#DonateForm').val('_xclick-subscriptions');
            $('input[name=a3]','#DonateForm').val($('input[name=amount]','#DonateForm').val());
        }else {
            $('input[name=cmd]','#DonateForm').val('_donations');
        }
    }

    jQuery.fn.visible = function() {
        return this.css('visibility', 'visible');
    };

    jQuery.fn.invisible = function() {
        return this.css('visibility', 'hidden');
    };

    //Function immediately before the slider slides - for top_slider
    function beforeslide(){
        $('.slider-tag').css('visibility', 'hidden').toggleClass('fadeIn');
        $('ul.top_slider .btn1').css('visibility', 'hidden').toggleClass('fadeInLeft');
        $('ul.top_slider .btn2').css('visibility', 'hidden').toggleClass('fadeInRight');
    }

    //Function immediately after the slider slides - for top_slider
    function afterslide(){
        $('.slider-tag').css('visibility', 'visible').addClass('animated fadeIn');
        $('ul.top_slider .btn1').css('visibility', 'visible').addClass('animated fadeInLeft');
        $('ul.top_slider .btn2').css('visibility', 'visible').addClass('animated fadeInRight');
    }

    // Submit contact form details
    function contactformsubmitdetailsjax() {
        $.ajax({
            url: 'php/contact_form_submit.php',
            type: 'post',
            data: {
                name: $('#ContactForm input#fname').val(),
                email: $('#ContactForm input#femail').val(),
                phone: $('#ContactForm input#fphone').val(),
                msg: $('#ContactForm textarea#fmsg').val()
            },
            success: function(result){
                $("#ContactForm").trigger('reset');
                $("#contactemailsendresponse").html(result);
            }
        });
    }

    // Submit volunteer form details
    function volunteerformsubmitdetailsjax() {
        $.ajax({
            url: 'php/volunteer_form_submit.php',
            type: 'post',
            data: {
                surname: $('#VolunteerForm input[name="surname"]').val(),
                firstname: $('#VolunteerForm input[name="firstname"]').val(),
                email: $('#VolunteerForm input[name="email"]').val(),
                phone: $('#VolunteerForm input[name="phone"]').val(),
                address: $('#VolunteerForm textarea[name="address"]').val(),
                gender: $('#VolunteerForm input[name="gender"]').val(),
                age: $('#VolunteerForm input[name="age"]').val(),
                why: $('#VolunteerForm textarea[name="why"]').val()
            },
            success: function(result){
                //clear fields
                $("#VolunteerForm").trigger('reset');
                
                //show success msg
                $("#volunteeremailsendresponse").html(result);

                //close modal
                setTimeout(function(){
                    $('#volunteerformModal').modal('toggle');
                }, 2000);
            }
        });
    }

    

});

// Scroll to section
$(function() {
    $('a[href*="#"]:not([href="#"])').on('click', function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	        if (target.length) {
		        $('html,body').animate({
		            scrollTop: target.offset().top
		        }, 1000);
		        return false;
	        }
	    }
    });
});

//Google Map
function initMap() {
    var uluru = {lat: -1.283816662791512, lng: 36.81950926780701}; //enter latitude and longitude of location
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: uluru,
        scrollwheel: false
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}






