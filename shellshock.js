$(function() {
    $.ajaxSetup({
        async: true
    });
    $("#loading_tester").fadeOut();
    $("#shock_tester").fadeIn();
    var shocking = false;

    get_stats();

    setInterval(function() {
        get_stats()
    }, 60000);

    function get_stats() {
        var jqxhr = $.getJSON("/stats", function(data) {
                $("#test_stats").html("<strong>" + data.total + "</strong> Total tests to date. <strong>" + data.total_vulnerable + "</strong> Total vulnerable hosts found.");
            })
            .fail(function() {
                $("#test_stats").html('Error loading stats... Connection issue?');
            })

    }
    $("#btn_shock").click(function() {
        if (!shocking) {
            shocking = true;
            $("#btn_shock").html('Shocking... <i class="fa fa-spinner fa-spin"></i>');
            var shock_url = $("#test_url").val();
            if (shock_url.length <= 7) {
                $("#test_errors").html('<div class="alert alert-danger" role="alert"><strong>Invalid URL</strong> Please enter a valid url to test and try again.</div>');
                $("#btn_shock").html("Shock!");
            } else {
                var jqxhr = $.getJSON("/shock?url=" + shock_url, function(data) {
                        if (data.status == 1) {
                            $("#test_errors").html('<div class="alert alert-success" role="alert"><strong>Vulnerable!</strong> ' + data.message + '</div>');
                        }
                        if (data.status == 0) {
                            $("#test_errors").html('<div class="alert alert-warning" role="alert"><strong>Warning</strong> ' + data.message + '</div>');
                        }
                        if (data.status == 2) {
                            $("#test_errors").html('<div class="alert alert-info" role="alert"><strong>hmm...</strong> ' + data.message + '</div>');
                        }
                        if (data.status == 3) {
                            $("#test_errors").html('<div class="alert alert-info" role="alert"><strong>Error!</strong> ' + data.message + '</div>');
                        }
                        $("#btn_shock").html("Shock!");
                    })
                    .fail(function() {
                        $("#test_errors").html('<div class="alert alert-danger" role="alert"><strong>Error!</strong> Something bad happened, but it wasn\'t the vulnerability. Try again later..?</div>');
                        $("#btn_shock").html("Shock!");
                    })

            }
            shocking = false;
        } else {
            console.log('Already shocking!');
        }
    })
    /*
      <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> You successfully read this important alert message.
      </div>
      <div class="alert alert-info" role="alert">
        <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
      </div>
      <div class="alert alert-warning" role="alert">
        <strong>Warning!</strong> Best check yo self, you're not looking too good.
      </div>
      <div class="alert alert-danger" role="alert">
        <strong>Oh snap!</strong> Change a few things up and try submitting again.
      </div>
	*/
})
