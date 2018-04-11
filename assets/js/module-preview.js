/**
 * ModulePreview Class
 */

function ModulePreview() {
	var _l0 = this;
	$(document).ready(function() {
		_l0.build();
	});
};

ModulePreview.prototype.build = function() {
	var _l0 = this;
	
	// Common vars
	_l0.page = $('body', _l0.doc);
	_l0.main = $('.main', _l0.page);
	_l0.content = $('.content', _l0.main);
	_l0.creation = $('.creation', _l0.content);
	_l0.collection = $('.collection', _l0.content);
	_l0.coll_items = $('.items', _l0.collection);
	_l0.editable = $('.editable', _l0.creation);
	_l0.all_modules = $('.module', _l0.creation);
	_l0.mod_type0 = $('.module.type0', _l0.creation);
	_l0.mod_type1 = $('.module.type1', _l0.creation);
	_l0.mod_type2 = $('.module.type2', _l0.creation);
	_l0.close_button = $('a.close-button', _l0.all_modules);
	_l0.image_upload = $('.image-upload input', _l0.editable);
	_l0.image_upload_field = $('input.image-upload', _l0.editable);
	_l0.icons_sel = $('.option.type1', _l0.editable);
	_l0.mod_selected = _l0.mod_type1;
	_l0.add_button = $('.add-button', _l0.editable);
	_l0.download_all = $('a.download-all', _l0.collection);
	_l0.download_all_trigger = $('a.download-all-trigger', _l0.collection);
	_l0.coll_dwn_all = $('.collection-download-all', _l0.main);
	
	// Creation
	_l0.doCreation();
};

ModulePreview.prototype.imageUpload = function() {
	var _l0 = this;
	$('.button.upload', _l0.editable).on('click', function() {
		_l0.image_upload.trigger('click');
		return false;
	});
	_l0.image_upload.on('change', function() {
		var input = this;
		var imagename = $(input).val();
		var sel_banner = $('.banner', _l0.mod_selected);
		
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				_l0.image_upload_field.val(input.files[0].name);
				if(!sel_banner.hasClass('no-effects')) {
					sel_banner.addClass('no-effects');
				}
				var bg_wrapper = $('.wrapper', sel_banner);
				if (bg_wrapper.length && sel_banner.parent().hasClass('type2')) {
					bg_wrapper.attr('style', 'background-image:url(' + e.target.result +');');
				} else {
					sel_banner.attr('style', 'background-image:url(' + e.target.result +');');
				}
				setTimeout(function() {
					sel_banner.removeClass('no-effects');
				}, 100);
			}
			reader.readAsDataURL(input.files[0]);
		}
	});
};

ModulePreview.prototype.resetModules = function() {
	var _l0 = this;
	
	// Add button
	_l0.add_button.removeClass('selected');
	
	// Creation, remove class
	_l0.creation.removeClass('type0 type1 type2');
	
	// Banners gradients and sizes
	var module = $('.module', _l0.creation);
	var banners = $('.banner', module);
	$('.gradients', banners).attr('class', 'gradients selected');
	$('h2 a', module).removeClass('selected');
	$('h2 a:eq(0)', module).addClass('selected');
	banners.removeClass('extended');
	
	// Banner icon
	var icons = $('.icons', banners)
	$('div', icons).removeClass('selected');
	$('div:eq(0)', icons).addClass('selected');
	
	// Icon select
	var sel = $('.icons-select', _l0.content);
	$('li', sel).removeClass('choice');
	$('li:eq(0)', sel).addClass('choice');
	
	// Image upload and backgrounds
	_l0.image_upload.val('');
	_l0.image_upload_field.val('Click on Browse to upload an image');
	banners.removeAttr('style');
	$('.wrapper', banners).removeAttr('style');
	
	// Headlines
	$('h2', banners).html('&nbsp;');
	$('h3', banners).html('&nbsp;');
	$('.option:eq(0) input.text', _l0.editable).val('');
	$('.option:eq(1) input.text', _l0.editable).val('');
	
	// Color picker
	var color_picker = $('.option:eq(0) input.color', _l0.editable);
	color_picker.val('#7C2227');
	color_picker.hide();
	var color_picker_label = $('.option:eq(0) h2.color', _l0.editable)
	color_picker_label.hide();
	$('.option:eq(0) input.text', _l0.editable).attr('class', 'text');
	
	// Icons
	_l0.icons_sel.show();
		
	// Specific to module type 1
	if (_l0.mod_selected.hasClass('type1')) {
		// Icons
		_l0.icons_sel.hide();
		// Color picker
		$('.option:eq(0) .text', _l0.editable).attr('class', 'text smaller');
		color_picker.show();
		color_picker_label.show();
	}
};

ModulePreview.prototype.moduleType0 = function() {
	var _l0 = this;
	var banner = $('.banner', _l0.mod_type0);
	var gradients = $('.gradients', banner);
	var grad_link = $('h2 a', _l0.mod_type0);
	
	grad_link.on('click', function() {
		var target = $(this);
		
		if (!target.hasClass('selected')) {
			target.addClass('selected');
			gradients.addClass('selected');
		} else {
			target.removeClass('selected');
			gradients.removeClass('selected');
		}
		
		return false;
	});
};

ModulePreview.prototype.moduleType1 = function() {
	var _l0 = this;
	var banner = $('.banner', _l0.mod_type1);
	var gradients = $('.gradients', banner);
	var grad_link = $('h2 a', _l0.mod_type1);
	
	grad_link.on('click', function() {
		var target = $(this);
		
		if (!target.hasClass('selected')) {
			target.addClass('selected');
			gradients.addClass('selected');
		} else {
			target.removeClass('selected');
			gradients.removeClass('selected');
		}
		
		return false;
	});
};

ModulePreview.prototype.moduleType2 = function() {
	var _l0 = this;
	var subtypes = $('h2 a', _l0.mod_type2);
	var banner = $('.banner', _l0.mod_type2);
	
	// Click
	subtypes.on('click', function() {
		var target = $(this);

		if (!target.hasClass('selected')) {
			subtypes.not(target).removeClass('selected');
			target.addClass('selected');
			
			var index = subtypes.index(target);
			if (index == 0) {
				banner.removeClass('extended');
			} else
			if (index == 1) {
				banner.addClass('extended');
			}
		}
		
		return false;
	});
};

ModulePreview.prototype.createSelect = function() {
	var _l0 = this;
	
	var sel = $('.create-select', _l0.content);
	var opt = $('li a', sel);
	
	// Click options
	opt.on('click', function() {
		var target = $(this).parent();
		var choice = $('.choice', sel);
		
		// Open close select
		if(!sel.hasClass('selected')) {
			sel.addClass('selected');
		} else {
			sel.removeClass('selected');
		}
		
		// Update results
		choice.removeClass('choice');
		if(!target.hasClass('choice')) {
			target.addClass('choice');
		}
		
		return false;
	});
	
	// Hover in and out options
	opt.on('mouseenter', function() {
		var target = $(this);
		
		// Open close select
		if(!target.hasClass('hover')) {
			target.addClass('hover');
		}
		
		return false;
	});
	
	// Moving out options
	$('ul', sel).on('mouseleave', function() {
		sel.removeClass('selected');
	});
	
	// Click create button
	var delay = 0;
	var index = 0;
	$('.create-button', _l0.sel).on('click', function() {
		var target = $('li.choice', sel);
		_l0.mod_selected = _l0.mod_type0;
		index = 0;
		if (target.hasClass('type1')) {
			_l0.mod_selected = _l0.mod_type1;
			index = 1;
		} else
		if (target.hasClass('type2')) {
			_l0.mod_selected = _l0.mod_type2;
			index = 2;
		}
		
		// Reset delay
		if (!_l0.creation.hasClass('selected')) {
			delay = 0;
		}
		
		// Hide creation
		_l0.creation.removeClass('selected');
		
		// After collapsing creation, open it again
		// We wait until full collapsing
		setTimeout(function() {
			
			// Reset modules
			_l0.resetModules();
			
			// We wait until we reset the modules ...
			setTimeout(function() {
				
				// Hide all modules
				_l0.all_modules.removeClass('selected');
		
				// Show module
				_l0.mod_selected.addClass('selected');
				
				// Show creation
				_l0.creation.addClass('selected type' + index);
		
				delay = 500;
				
			}, delay);
			
		}, delay);
		
		return false;
	});
	
};

ModulePreview.prototype.iconsSelect = function() {
	var _l0 = this;
	
	var sel = $('.icons-select', _l0.content);
	var opt = $('li a', sel);
	
	// Click options
	opt.on('click', function() {
		var target = $(this).parent();
		var choice = $('.choice', sel);
		
		// Open close select
		if(!sel.hasClass('selected')) {
			sel.addClass('selected');
		} else {
			sel.removeClass('selected');
		}
		
		// Update results
		choice.removeClass('choice');
		if(!target.hasClass('choice')) {
			target.addClass('choice');
		}
		
		// Update banner icons
		var icons = $('.banner .icons', $('.module.selected', _l0.creation));
		var icon = $('div', icons);
		icon.removeClass('selected');
		
		var index = opt.index($(this));
		$('div:eq(' + index + ')', icons).addClass('selected');
		
		return false;
	});
	
	// Hover in and out options
	opt.on('mouseenter', function() {
		var target = $(this);
		
		// Open close select
		if(!target.hasClass('hover')) {
			target.addClass('hover');
		}
		
		return false;
	});
	
	// Moving out options
	$('ul', sel).on('mouseleave', function() {
		sel.removeClass('selected');
	});
	
};

ModulePreview.prototype.closeButton = function() {
	var _l0 = this;
	_l0.close_button.on('click', function() {
		// Hide creation (reset will be applied on creation)
		_l0.creation.removeClass('selected');
		return false;
	});
};

ModulePreview.prototype.trimAll = function(str) {
	return str.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
}

ModulePreview.prototype.doInputs = function() {
	var _l0 = this;

	// Disable spell check
	$('input.text', _l0.editable).attr('spellcheck', 'false');
	$('input.color', _l0.editable).attr('spellcheck', 'false');
	
	setInterval(function() {
		if (_l0.creation.hasClass('selected')) {
			// Head copy
			var h2 = $('.banner h2', _l0.mod_selected);
			var edt_h2 = $('.option:eq(0) input.text', _l0.editable);
			//var edt_h2_val = _l0.trimAll(edt_h2.val()).replace(/<br>/g , "<br />");
			var edt_h2_val = _l0.trimAll(edt_h2.val()).replace(/>>>/g , "<br />");
			h2.html(edt_h2_val);
			
			// Subhead copy
			var h3 = $('.banner h3', _l0.mod_selected);
			var edt_h3 = $('.option:eq(1) input.text', _l0.editable);
			var edt_h3_val = _l0.trimAll(edt_h3.val()).replace(/>>>/g , "<br />");
			h3.html(edt_h3_val);
			
			// Background color
			if (_l0.mod_selected.hasClass('type1')) {
				var color_picker = $('.option:eq(0) input.color', _l0.editable);
				var txt = $('.text', _l0.mod_selected);
				txt.css('background-color', '' + color_picker.val());
			}
			
			// Show/hide add button
			if (_l0.mod_selected.hasClass('type0') || _l0.mod_selected.hasClass('type1') || _l0.mod_selected.hasClass('type2')) {
				if (edt_h2_val.length && _l0.image_upload_field.val() != 'Click on Browse to upload an image') {
					_l0.add_button.attr('class', 'add-button selected');
				} else {
					_l0.add_button.removeClass('selected');
				}
			}/* else
			if (edt_h2_val.length && edt_h3_val.length && _l0.image_upload_field.val() != 'Click on Browse to upload an image') {
				_l0.add_button.attr('class', 'add-button selected');
			} else {
				_l0.add_button.removeClass('selected');
			}*/
			//_l0.add_button.attr('class', 'add-button selected');
		}
		
		// Show/hide collection
		var num_items = $('.item', _l0.coll_items).length;
		if (num_items > 1) {
			_l0.download_all.attr('class', 'download-all selected');
		} else {
			_l0.download_all.attr('class', 'download-all');
		}
		if (num_items > 0) {
			_l0.collection.attr('class', 'collection selected');
		} else {
			_l0.collection.attr('class', 'collection');
		}
	}, 100);
};

ModulePreview.prototype.doCollection = function() {
	var _l0 = this;
	
	// Download all
	_l0.download_all.on('click', function() {
		var target = $(this);
		
		// Render
		if (_l0.page.scrollTop() > 0) {
			_l0.page.stop(true).animate({scrollTop:0}, 500, 'easeOutExpo', function() {
				_l0.coll_dwn_all.css('visibility', 'visible');
				html2canvas(_l0.coll_dwn_all, {
					"noCache" : true,
					"logging" : false,
					onrendered: function(canvas) {
						var rand_num = 1000000000 - Math.floor(Math.random() * 1000000000);
						var all_image_name = 'all-images-' + rand_num + '.png';
						var rendered_img = canvas.toDataURL("image/png");
						_l0.download_all_trigger.attr('download', all_image_name);
						_l0.download_all_trigger.attr('href', rendered_img);
						_l0.download_all_trigger[0].click();
						_l0.coll_dwn_all.css('visibility', 'hidden');
					}
				});
			});
		} else {
			_l0.coll_dwn_all.css('visibility', 'visible');
			html2canvas(_l0.coll_dwn_all, {
				"noCache" : true,
				"logging" : false,
				onrendered: function(canvas) {
					var rand_num = 1000000000 - Math.floor(Math.random() * 1000000000);
					var all_image_name = 'all-images-' + rand_num + '.png';
					var rendered_img = canvas.toDataURL("image/png");
					_l0.download_all_trigger.attr('download', all_image_name);
					_l0.download_all_trigger.attr('href', rendered_img);
					_l0.download_all_trigger[0].click();
					_l0.coll_dwn_all.css('visibility', 'hidden');
				}
			});
		}
		
		return false;
	});
	_l0.download_all_trigger.on('click', function() {
		var target = $(this);
	});
	
	// Add button
	_l0.add_button.on('click', function() {
		var target = $(this);
		
		_l0.creation.removeClass('selected');
		_l0.page.stop(true).animate({scrollTop:0}, 500, 'easeOutExpo', function() {
			
			// Banner type
			var banner_type = 0;
			if (_l0.mod_selected.hasClass('type1')) {
				banner_type = 1;
			} else
			if (_l0.mod_selected.hasClass('type2')) {
				banner_type = 2;
				if ($('.extended', _l0.mod_selected).length) {
					banner_type = 3;
				}
			}
			
			// Render
			var sel_banner = $('.banner', _l0.mod_selected);
			if ($('.wrapper', sel_banner).length && _l0.mod_selected.hasClass('type2')) {
				sel_banner = $('.wrapper', sel_banner);
			}
			html2canvas(sel_banner, {
				"noCache" : true,
				"logging" : false,
				onrendered: function(canvas) {
					var rand_num = 1000000000 - Math.floor(Math.random() * 1000000000);
					var image_name = 'image-' + rand_num + '.png';
					var rendered_img = canvas.toDataURL("image/png");
					var download_img = '' + rendered_img.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
					
					// Specs
					bg_image = '' + sel_banner.css('background-image');
					
					var gradients = '';
					if (_l0.mod_selected.hasClass('type0')) {
						gradients = '' + $('h2 a', _l0.mod_selected).attr('class');
					}
					
					var sel_icons = $('.icons', sel_banner);
					var icon_index = $('div', sel_icons).index($('.selected', sel_icons));
					
					// Adding the new item
					_l0.coll_items.prepend('<div class="item-' + rand_num + ' item"><div class="image"><img src="' + rendered_img + '" alt="" /></div><p class="specs"><span class="type">' + banner_type + '</span><span class="h2">' + $('.option:eq(0) input.text', _l0.editable).val() + '</span><span class="h3">' + $('.option:eq(1) input.text', _l0.editable).val() + '</span><span class="bg-color">' + $('input.color', _l0.editable).val() + '</span><span class="bg-image">' + bg_image + '</span><span class="image-name">' + _l0.image_upload_field.val() + '</span><span class="gradients">' + gradients + '</span><span class="icons">' + icon_index + '</span></p><ul class="menu" data-html2canvas-ignore="true"><li class="edit"><a href="#" class="item-' + rand_num + '" title=""><span>&nbsp;</span></a></li><li class="download"><a download="' + image_name + '" href="' + rendered_img + '" title="" target="_blank"><span>&nbsp;</span></a></li><li class="delete"><a href="#" class="item-' + rand_num + '" title=""><span>&nbsp;</span></a></li></ul></div><div class="item-' + rand_num + ' spacer" data-html2canvas-ignore="true">&nbsp;</div>');
					
					// Add to hidden box for downloading all sake
					_l0.coll_dwn_all.prepend('<img class="item-' + rand_num + ' item" src="' + rendered_img + '" alt="" />');
					
					// After adding the new item
					setTimeout(function() {
						$('.spacer:eq(0)', _l0.coll_items).addClass('active');
						var new_item = $('.item:eq(0)', _l0.coll_items);
						new_item.addClass('type' + banner_type);
						
						// Delete link
						$('.menu .delete a', new_item).on('click', function() {
							var target = $(this);
							var item_to_delete = $('.' + target.attr('class'), _l0.main);
							item_to_delete.removeClass('type0 type1 type2 type3 active');
							setTimeout(function() {
								item_to_delete.remove();
							}, 250);
							return false;
						});
						
						// Edit link
						$('.menu .edit a', new_item).on('click', function() {
							var target = $(this);
							var item_to_edit = $('.' + target.attr('class'), _l0.coll_items);
							
							// Index
							var specs = $('p.specs', item_to_edit);
							var b_type = $('span.type', specs).text();
							if (b_type == 2 || b_type == 3) {
								_l0.mod_selected = _l0.mod_type2;
							} else
							if (b_type == 0) {
								_l0.mod_selected = _l0.mod_type0;
							} else
							if (b_type == 1) {
								_l0.mod_selected = _l0.mod_type1;
							}
							
							// Reset delay
							var delay = 0;
							if (_l0.creation.hasClass('selected')) {
								delay = 500;
							}
							
							var item_to_delete = $('.' + target.attr('class'), _l0.main);
							
							// Scroll to top
							if (_l0.page.scrollTop() > 0) {
								_l0.page.stop(true).animate({scrollTop:0}, 500, 'easeOutExpo');
								delay = 500;
							}
							
							// Hide creation
							_l0.creation.removeClass('selected');
							
							// After collapsing creation, open it again
							// We wait until full collapsing
							setTimeout(function() {
								
								item_to_delete.removeClass('type0 type1 type2 type3 active');
								
								// Reset modules
								_l0.resetModules();
								
								// We wait until we reset the modules ...
								setTimeout(function() {
									
									// Hide all modules
									_l0.all_modules.removeClass('selected');
							
									// Show module
									_l0.mod_selected.addClass('selected');
									
									// Fill with specs
									var h2 = $('span.h2', specs).html();
									$('.option:eq(0) input.text', _l0.editable).val('' + h2);
									$('.banner h2', _l0.mod_selected).html('' + h2);
									
									var h3 = $('span.h3', specs).html();
									$('.option:eq(1) input.text', _l0.editable).val('' + h3);
									$('.banner h3', _l0.mod_selected).html('' + h3);
									
									if (b_type == 1) {
										var bg_color = $('span.bg-color', specs).text();
										$('.option:eq(0) input.color', _l0.editable).val('' + bg_color);
										$('.text', _l0.mod_selected).css('background-color', '' + bg_color);
									}
									
									_l0.image_upload_field.val('' + $('span.image-name', specs).text());
									
									sel_banner.attr('style', 'background-image:' + $('span.bg-image', specs).text());
									if (b_type == 3) {
										sel_banner.parent().addClass('extended');
										$('h2 a:eq(0)', _l0.mod_selected).removeClass('selected');
										$('h2 a:eq(1)', _l0.mod_selected).addClass('selected');
									}
									
									// Banner icon
									var icons = $('.icons', _l0.mod_selected)
									$('div', icons).removeClass('selected');
									$('div:eq(' + $('span.icons', specs).text() + ')', icons).addClass('selected');
									
									var icons_sel = $('.icons-select', _l0.content);
									$('li', icons_sel).removeClass('choice');
									$('li:eq(' + $('span.icons', specs).text() + ')', icons_sel).addClass('choice');
	
									// Show creation
									_l0.creation.addClass('selected type' + b_type);
									
									item_to_delete.remove();
									
								}, delay);
								
							}, delay);
							
							return false;
							
						});
						
					}, 500);
					
				}
			});
		});
		
		return false;
	});
};

ModulePreview.prototype.doCreation = function() {
	var _l0 = this;
	
	// Creation select
	_l0.createSelect();
	
	// Icons select
	_l0.iconsSelect();
	
	// Image upload
	_l0.imageUpload();
	
	// Modules
	_l0.moduleType0();
	_l0.moduleType1();
	_l0.moduleType2();
	
	// Close button
	_l0.closeButton();
	
	// Inputs
	_l0.doInputs();
	
	// Collection
	_l0.doCollection();
};

var _ModulePreview = new ModulePreview();