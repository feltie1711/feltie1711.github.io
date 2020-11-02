var detailsHeight;
var activeMenuItem;
var detailsMaxHeight;
var itemsMaxWidth;
var currentItemDiv;
var selectedItemType;
var selectedItem;
var longDescriptionTarget = "POPUP";
var showSuperclassAttributes = "FALSE";
var isCancelled = 'true';

$(document).ready(function(){
	activeMenuItem = $("#database"); 
	$("#con-java").toggle();
	
	detailsMaxHeight = $(".container").height() - 84;
	$("#details").css("max-height", detailsMaxHeight);
	$("#itemType").css("max-height", detailsMaxHeight);
	
	$("#details").css("height", 400);
	$("#panel2").html( $("#t-application-div").clone(true) );
	$("#panel2Strong").text("Application");
	
	itemsMaxWidth = $(".container").width() - 7;
	$(".col1").css("max-width", itemsMaxWidth);
	
	currentDetailsDiv = $("#t-database-div");
	$("#panel1").html( $(currentDetailsDiv).clone(true) );
	selectedItemType = $("#t-database");
	selectedItemType.toggleClass("active");
	selectedItem = $("#aboutPopup"); 
	
	if (showSuperclassAttributes == 'FALSE') {
		$(".superClass").hide();
	}
	
    $(".max").click(function() {
		id = $(this).parent().parent().attr("id");

		var newHeight;
		if ($(this).parent().parent().hasClass("fullColElem")) {
			$("#details").css("max-height", detailsMaxHeight);
			
			newHeight = detailsHeight; 
			$(".max").attr("title", "Maximize");
		} else {
			$("#details").css("max-height", '');
			
			detailsHeight = $("#details").css("height");
			newHeight = "100%"; 
			$(".max").attr("title", "Restore");
		}

		$(".splitter").toggle();
		$("#items").toggle();
		$("#itemType").toggle();
		if (id == 'details') {
			$("#graph").toggle();
			$("#details").css("height", newHeight);
		} else {
			$("#details").toggle();
		}

		$(this).parent().parent().parent().toggleClass("col2");
		$(this).parent().parent().parent().toggleClass("fullCol");
		$(this).parent().parent().toggleClass("fullColElem");
		$(this).toggleClass("fullMax");
    });	

	$(window).resize(function() {
		detailsMaxHeight = $(".container").height() - 84;
		if (!$("#details").hasClass("fullColElem") ) {
			$("#details").css("max-height", detailsMaxHeight);
		}
		$("#itemType").css("max-height", detailsMaxHeight);
		
		itemsMaxWidth = $(".container").width() - 7;
		$(".col1").css("max-width", itemsMaxWidth);
	});

	$("#about").click(function() {
		$("#aboutPopup").dialog({
			draggable: true,
			resizable: false
		});
	});	

	$("#settings").click(function() {
		isCancelled = 'true';
		$("#settingsPopup").dialog({
			width: 350,
			draggable: true,
			resizable: false,
			close: function() {
				if (isCancelled == 'true') {
					$("#showLongDescriptions").val(longDescriptionTarget);
					$("#showSuperclassAttributes").val(showSuperclassAttributes);
				} 
			},
			buttons: [
    			{
      				text: "Ok",
      				click: function() {
						isCancelled = 'false';
						var selected1 = $("#showLongDescriptions").find(":selected").val();
						longDescriptionTarget = selected1;
						var selected2 = $("#showSuperclassAttributes").find(":selected").val();
						showSuperclassAttributes = selected2;
						if (showSuperclassAttributes == 'FALSE') {
							$(".superClass").hide();
						} else {
							$(".superClass").show();
						}

	       				$( this ).dialog( "close" );
      				},
    			},
    			{
      				text: "Cancel",
      				click: function() {
						$("#showLongDescriptions").val(longDescriptionTarget);
						$("#showSuperclassAttributes").val(showSuperclassAttributes);
        				$( this ).dialog( "close" );
      				}
    			}

  			]
		});
	});	

	$(".popup").click(function() {
		id = "#popup-" + $(this).attr("data-id");
		if (longDescriptionTarget == 'POPUP') {
			$(id).dialog({
				width: 500
			});
		} else {
			currentDetailsDiv = id;
			$("#panel2").html( $(currentDetailsDiv).clone() );
			text = $(currentDetailsDiv).attr("data-ti");
			$("#panel2Strong").text(text);
			$("#panel2HeaderImage").attr("src", "resources/text.png");
		}
	});	
	
	$(".pertypes").click(function() {
		if ($(this).attr("id") == 't-application' ) {
			$("#panel2").html( $("#t-application-div").clone(true) );
			$("#panel2Strong").text("Application");
			$("#panel1HeaderImage").attr("src", "resources/java.png");

		} else if ($(this).attr("id") == 't-database' ) {
			currentDetailsDiv = "#t-database-div";
			$("#panel1").html( $("#t-database-div").clone(true) );
			$("#panel1Strong").text("Database");
			$("#panel1HeaderImage").attr("src", "resources/db.png");

		} else if ($(this).attr("id") == 't-indices' ) {
			currentDetailsDiv = "#t-database-div";
			$("#panel1").html( $("#t-indices-div").clone(true) );
			$("#panel1Strong").text("Indices");
			$("#panel1HeaderImage").attr("src", "resources/db.png");
		} else if ($(this).attr("id") == 't-constraints' ) {
			currentDetailsDiv = "#t-database-div";
			$("#panel1").html( $("#t-constraints-div").clone(true) );
			$("#panel1Strong").text("Constraints");
			$("#panel1HeaderImage").attr("src", "resources/db.png");
		} else {
			$(currentItemDiv).toggle();
			currentItemDiv = "#i" + $(this).attr("id");
			$(currentItemDiv).toggle();
			$("#itemsStrong").text($(this).text());
		}
		
		selectedItemType.toggleClass("active");
		selectedItemType = $(this);
		$(this).toggleClass("active");
	})
	
	$(".peritems").click(function() {
		currentDetailsDiv = "#de-" + $(this).attr("id");
		$("#panel1").html( $(currentDetailsDiv).clone(true) );
		
		if (currentDetailsDiv.indexOf("de-it-embeddables") > 0 ||
			currentDetailsDiv.indexOf("de-it-mappedSuperclasses") > 0 ||
			currentDetailsDiv.indexOf("de-it-enums") > 0 ||
			currentDetailsDiv.indexOf("de-it-entities") > 0) {
			$("#panel1HeaderImage").attr("src", "resources/java.png");
		} else {
			$("#panel1HeaderImage").attr("src", "resources/db.png");
		}
		
		$("#panel1Strong").text($(this).text());
		selectedItem.toggleClass("active");
		selectedItem = $(this);
		$(this).toggleClass("active");
	})
	
	$(".col1").resizableSafe({
    	handleSelector: ".splitterH",
    	resizeHeight: false
	});

	$("#itemType").resizableSafe({
    	handleSelector: "#splV1",
    	resizeWidth: false
	});

	$("#details").resizableSafe({
    	handleSelector: "#splV2",
    	resizeWidth: false
	});

	$(".link1").click(function() {
		id = $(this).parents("div.content").attr("id");
		currentDetailsDiv = "#de-" + $(this).attr("data-id");
		$("#panel2").html( $(currentDetailsDiv).clone(true) );
		text = $(this).text();
		index = text.lastIndexOf(".");
		if(index > 0) {
			text = text.substring(index+1);
		}
		$("#panel2Strong").text(text);
		if (currentDetailsDiv.indexOf("de-it-embeddables") > 0 ||
			currentDetailsDiv.indexOf("de-it-mappedSuperclasses") > 0 ||
			currentDetailsDiv.indexOf("de-it-enums") > 0 ||
			currentDetailsDiv.indexOf("de-it-entities") > 0) {
			$("#panel2HeaderImage").attr("src", "resources/java.png");
		} else {
			$("#panel2HeaderImage").attr("src", "resources/db.png");
		}
	})

	$(".plusminus").click(function() {
		id = $(this).attr("data-klapp");
		text = $(this).text();
		if (text == '\u229E') {
			$(".topshow-" + id).html("&boxminus;");
			$(".show-" + id).show();
		} else if (text == '\u229F') {
			$(".tophide-" + id).html("&plusb;");
			$(".hide-" + id).hide();
		}
	})

});
		
	
function sortTable(n, tableId) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableId);
  window.alert(tableId);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
	
