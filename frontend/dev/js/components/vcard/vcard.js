/*global define, console*/
define(["jquery", "knockout", "velocity", "text!./vcard.html", "velocity.ui", "domready"], function ($, ko, velocity, templateHTML) {
	"use strict";

	// DEFINE VIEW MODEL
	var VirtualCardVM		= function (params) {
		this.params			= ko.observable(params);
		this.componentID		= ko.observable('component-page-' + params.page);
		this.runFX();
	};

	// ADD ACTION FUNCTIONALITY TO THE INTERFACE / VIEWMODEL
	VirtualCardVM.prototype.showContactNo = function () {
		$('#contact_no').velocity('transition.bounceUpIn', {display: 'inline-block'});
	};

	// EXTEND FUNCTIONS ON THE VIEW MODEL AFTER INTITIALIZATION
	ko.utils.extend(VirtualCardVM.prototype, {

		runFX	:	function () {
			$(document).ready(function () {
				var $bkg = $('.wrapper-application-content'),
					$header = $('header.fx'),
					$footer = $('footer.fx'),
					$hkids = $('header .fx'),
					$fkids = $('footer .fx'),
					sequenceArray = [];
				sequenceArray = [
					{ e: $bkg,		p: { backgroundColorAlpha: 0.0 }, o: { delay: 100, duration: 6500, display: 'block' } },
					{ e: $header,	p: "transition.slideDownBigIn", o: { delay: 0, display: 'block', sequenceQueue: false } },
					{ e: $footer,	p: "transition.slideUpBigIn", o: { delay: 0, display: 'block', sequenceQueue: false } },
					{ e: $hkids,	p: "transition.slideLeftIn", o: { delay: 0, stagger: 250, display: null } },
					{ e: $fkids,	p: "transition.slideRightIn", o: { delay: 0, stagger: 250, display: null, sequenceQueue: false } }
				];
				$bkg.add($header).add($footer).add($hkids).add($fkids).velocity('stop', true);
				$.Velocity.RunSequence(sequenceArray);
			});
		}
	});

    //  HOUSEKEEPING DISPOSE AND CLEANUP
	VirtualCardVM.prototype.dispose = function () {
		$('.fx').velocity('stop', true);
	};

	return { viewModel: VirtualCardVM, template: templateHTML };

});
