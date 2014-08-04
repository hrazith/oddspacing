// JavaScript Document

$(document).ready(function() {


	$('#menuContainer').hide();

	$('#menuCTA_close').hide();
	
	$("#menuCTA").click(function() {
  	
  		$('#menuContainer').fadeIn();
  		$("#projectContainer").hide();
      $("#projectContainerHome").hide();
  		$("#menuCTA").fadeOut();
  		$("#menuCTA_close").fadeIn();

	});

	$("#menuCTA_close").click(function() {
  	
  		$('#projectContainer').show();
      $('#projectContainerHome').show();
  		$("#menuContainer").fadeOut();
  		$("#menuCTA_close").fadeOut();
  		$("#menuCTA").fadeIn();

	});


});