// Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function (context) {
    return JSON.stringify(context);
});



// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    smartSelectSearchbar:true,
    smartSelectOpenIn:'picker',
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
    template7Pages: true,
    // Specify Template7 data for pages
    template7Data: {
        // Will be applied for page with "projects.html" url
        'url:week1.html': {
            firstname: 'Jeffrey',
            lastname: 'Lambert',
            age: 32,
            position: 'CEO',
            email: 'jdl212@exeter.ac.uk',
            company: 'University of Exeter',
            interests: ['swimming', 'music', 'JavaScript', 'iMac', 'iOS apps', 'sport'],
            projects: [
                {
                    title: 'Google',
                    description: 'Nice search engine'
                },
                {
                    title: 'YouTube',
                    description: 'Online video service'
                },
                {
                    title: 'Android',
                    description: 'Mobile operating system'
                }
            ]
        },

        // Will be applied for page with data-page="contacts"
        'page:contacts': {
            tel: '+1 (222) 333-44-55',
            email: 'john@doe.com',
            country: 'USA',
            city: 'San Francisco',
            zip: '12345',
            street: 'Awesome st'
        },

        // Just plain data object that we can pass for other pages using data-contextName attribute
        cars: [
            {
                vendor: 'Volkswagen',
                model: 'Passat',
                power: 152,
                speed: 280,
                weight: 1400,
                color: 'black',
                year: 2012,
                description: ''
            },
            {
                vendor: 'Skoda',
                model: 'Superb',
                power: 152,
                speed: 260,
                weight: 1600,
                color: 'white',
                year: 2013,
                description: ''
            },
            {
                vendor: 'Ford',
                model: 'Mustang',
                power: 480,
                speed: 320,
                weight: 1200,
                color: 'red',
                year: 2014,
                description: ''
            },
        ],

        // Another plain data object, used in "about" link in data-contextName object
        about: {
            name: 'Jeffrey Lambert',
            age: 32,
            position: 'CEO',
            company: 'University of Exeter',
            email: 'jdl212@exeter.ac.uk',
            interests: ['swimming', 'music', 'JavaScript', 'iMac', 'iOS apps', 'sport']
        }
    }


});

// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
});
/*
var testView = myApp.addView('.view-test', {


});
*/

myApp.onPageInit('week1', function (page) {
  var weekNum = page.name + "activities";
  localStorage.setItem("week", weekNum);
  console.log(weekNum) ;
})

myApp.onPageInit('add_activity', function (page) {

  $$('#saveActivities').on('click', function (e) {

      var activitiesObj ;
      var actVal1 = $$('#activities1').val();
      var actVal2 = $$('#activities2').val();
      var actVal3 = $$('#activities3').val();


      if (actVal1 === "none")
      {
        alert("You must choose at least one Activity") ;
        return ;
      }
      else
      {
        actObj= {
          "act1": actVal1,
          "act2": actVal2,
          "act3": actVal3,
        };




        //var theWeek = localStorage.getItem("week") ;
        localStorage.setItem("week1Act", JSON.stringify(actObj));
        var data= JSON.parse(localStorage.getItem("week1Act")) ;
        mainView.router.loadPage("assign_difficulty.html") ;

      }


    });

})


myApp.onPageInit('assign_difficulty', function (page) {

var data= JSON.parse(localStorage.getItem("week1Act")) ;
console.log(data.act1) ;
console.log(data.act2) ;
console.log(data.act3) ;
$$('#activity1').html("<h2>" + data.act1 + "</h2>");
$$('#activity2').html("<h2>" + data.act2 + "</h2>");
$$('#activity3').html("<h2>" + data.act3 + "</h2>");

  $$('#saveDifficulty').on('click', function (e) {

    console.log("button clicked") ;
    //var isChecked = $$('.act1').prop('checked').val();
    var act1Diff = document.querySelector('input[name="act1"]:checked').value;
    var act2Diff = document.querySelector('input[name="act2"]:checked').value;
    var act3Diff = document.querySelector('input[name="act3"]:checked').value;



    actObj= {
      "act1": data.act1 + " - " + act1Diff,
      "act2": data.act2 + " - " + act2Diff,
      "act3": data.act3 + " - " + act3Diff,
    };

    localStorage.setItem("week1Act", JSON.stringify(actObj));
    mainView.router.loadPage("set_date.html") ;



  });
})

myApp.onPageInit('set_date', function (page) {
  /*
var calendarDefault = myApp.calendar({
    input: '#calendar-default',
});*/

var data= JSON.parse(localStorage.getItem("week1Act")) ;
$$('#dateAct1').html("<h2>" + data.act1 + "</h2>");
$$('#dateAct2').html("<h2>" + data.act2 + "</h2>");
$$('#dateAct3').html("<h2>" + data.act3 + "</h2>");


$$('#reminders').on('click', function (e) {
  console.log("button") ;

  var act1Date = document.querySelector('input[name="act1Date"]').value;
  var act2Date = document.querySelector('input[name="act2Date"]').value;
  var act3Date = document.querySelector('input[name="act3Date"]').value;
  console.log(act1Date) ;
  console.log(act2Date) ;
  console.log(act3Date) ;

  if (act1Date != null)
  {
    alert("Your activites have been saved and reminders have been set") ;

    var id  = localStorage.getItem("registrationId") ;
    console.log("hello " + id) ;
    window.open("https://as.exeter.ac.uk/codebox/iexeter/testing/alerts/test_send_alerts.php?id="+id) ;
/*
      $.ajax({
        url: "https://as.exeter.ac.uk/codebox/iexeter/testing/alerts/test_send_alerts.php?id="+id,
        method: "get",
        success: function (data) {
          alert("alerts sent") ;
          console.log(data) ;
        },
        error: function (jQxhr, errorCode, errorThrown) {
          console.log(errorThrown);
        }
      });
*/

  }
  else {
    alert("You need to set a date") ;
  }




});

})
