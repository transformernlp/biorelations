document
        .getElementById("query")
        .addEventListener("keypress", function (event) {
          if (event.keyCode == 13) {
            event.preventDefault();
            document.getElementById("search_btn").click();
          }
        });

      function loadJSON(callback) {
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", "./data/biorelation.json", true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
        };
        xobj.send(null);
      }

      function get_rels() {
        loadJSON(function (response) {
          var query = document.getElementById("query").value.toLowerCase();
          // Parse JSON string into object
          var actual_JSON = JSON.parse(response);
          var res = actual_JSON[query];
          if (!res) {
            document.getElementById("cause_div").innerHTML =
              '<p>No cause relations found</p>';
            document.getElementById("treat_div").innerHTML =
              '<p>No treat relations found</p>';
          }
          if (res["caused by"].length == 0) {
            document.getElementById("cause_div").innerHTML =
              '<p>No cause relations found</p>';
          }
          if (res["treated by"].length == 0) {
            document.getElementById("treat_div").innerHTML =
              '<p>No treat relations found</p>';
          }
          if (res["caused by"].length > 0) {
            var cause_rels = res["caused by"].slice(0, 10);
            document.getElementById("cause_div").innerHTML =
              "<strong><u>Caused By </u></strong><li>" +
              cause_rels.join("</li><li>");
            +"</li>";
          }
          if (res["treated by"].length > 0) {
            var treat_rels = res["treated by"].slice(0, 10);
            document.getElementById("treat_div").innerHTML =
              "<strong><u>Treated By</u></strong><li>" +
              treat_rels.join("</li><li>");
            +"</li>";
          }
        });
      }