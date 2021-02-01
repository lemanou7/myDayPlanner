$(document).ready(function() {
  
    // Set current time from moment
    const now = moment().format('MMMM Do YYYY');
  
    // Setting non standard time format

    let nowHour12 = moment().format('h');
  
    let $dateHeading = $('#navbar-subtitle');
    $dateHeading.text(now);
    
    // Get stored todos from localStorage
    // Parsing the JSON string to an object
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));
  
    // If plans were retrieved from localStorage, update the plan array to it
    if (storedPlans !== null) {
      planTextArr = storedPlans;
    } else {
      // this should only occur on first time the app is loaded in the browser
      // helpfully remind user that lunch is important
      planTextArr = new Array(9);
      planTextArr[0] = "BBQ AT CENTRAL PARK NEW YORK";
    }
  
    // set variable referencing planner element
    let $plannerDiv = $('#plannerContainer');
    // clear existing elements
    $plannerDiv.empty();
  
    // BUILD CALENDAR BY ROW FOR EACH HOUR USING A FOR LOOP
    for (let hour = 9; hour <= 17; hour++) {
      // index for array 
      let index = hour - 9;
      
      // BUILD DIV AND ASSIGN CLASS AND ATTRIBUTE 
      let $rowDiv = $('<div>');
      $rowDiv.addClass('row');
      $rowDiv.addClass('plannerRow');
      $rowDiv.attr('hour-index',hour);
    
      
    
      // create timeBox element (contains time)
      const $timeBoxSpn = $('<span>');
      // can use this to get value
      $timeBoxSpn.attr('class','timeBox');
      
      // format hours for display
      let hourFormat = 0;
      let amOrpm = "";
      if (hour > 12) { 
        hourFormat = hour - 12;
        amOrpm = "pm";
      } else {
        hourFormat = hour;
        amOrpm = "am";
      }
      
      // populate timeBox with time
      $timeBoxSpn.text(`${hourFormat} ${amOrpm}`);

      // Start building Time box portion of row
      let $col2TimeDiv = $('<div>');
      $col2TimeDiv.addClass('col-md-2');
      // insert into col inset into timebox
      $rowDiv.append($col2TimeDiv);
      $col2TimeDiv.append($timeBoxSpn);
      // End building Time box portion of row
  
      // START building input portion of row
      // build row components
      let $dailyPlanSpn = $('<input>');
  
      $dailyPlanSpn.attr('id',`input-${index}`);
      $dailyPlanSpn.attr('hour-index',index);
      $dailyPlanSpn.attr('type','text');
      $dailyPlanSpn.attr('class','dailyPlan');
  
      // access index from data array for hour 
      $dailyPlanSpn.val( planTextArr[index] );
      
      // create col to control width
      let $col9IptDiv = $('<div>');
      $col9IptDiv.addClass('col-md-9');
  
      // add col width and row component to row
      $rowDiv.append($col9IptDiv);
      $col9IptDiv.append($dailyPlanSpn);
      // STOP building Time box portion of row
  
      // START building save portion of row
      let $col1SaveDiv = $('<div>');
      $col1SaveDiv.addClass('col-md-1');
  
      let $saveBtn = $('<i>');
      $saveBtn.attr('id',`saveid-${index}`);
      $saveBtn.attr('save-id',index);
      $saveBtn.attr('class',"far fa-save saveIcon");
      
      // add col width and row component to row
      $rowDiv.append($col1SaveDiv);
      $col1SaveDiv.append($saveBtn);
      // STOP building save portion of row
  
      // set row color based on time
      updateRowColor($rowDiv, hour);
      
      // add row to planner container
      $plannerDiv.append($rowDiv);
    };
  
    // function to update row color
    function updateRowColor ($hourRow,hour) { 

        let current24Format = moment().format('H');
  
        if ( hour < current24Format) {
            // $hourRow.css('')
        
            $hourRow.css("background-color","lightgrey")
        } else if ( hour > current24Format) {
            
            $hourRow.css("background-color","lightgreen")
        } else {
            
            $hourRow.css("background-color","tomato")
        }
    };
  
    // saves to local storage
    // conclick function to listen for user clicks on plan area
    $(document).on('click','i', function(event) {
      event.preventDefault();  
  
      let index = $(this).attr('save-id');
      let inputId = '#input-'+index;
      let value = $(inputId).val();
  
      planTextArr[index] = value;
  
      // remove shawdow pulse class
      $(`#saveid-${index}`).removeClass('shadowPulse');
      localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });  
    
    // function to color save button on change of input
    $(document).on('change','input', function(event) {
      event.preventDefault();  
      
      // neeed to check for save button
  
      let i = $(this).attr('hour-index');
  
      // add shawdow pulse class
      $(`#saveid-${i}`).addClass('shadowPulse');
    });
  });