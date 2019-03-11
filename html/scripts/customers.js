$(document).ready(function() {

    var level = '0';
    var cid, totalJobs, jobId;
    var dispatchArray = [];
    var EDDrivers = [];
    var SDDrivers = [];
    var DBDrivers = [];
    var TenWDrivers = [];
    var flatbed = [];
    var d = new Date();
    if(!localStorage.username){
        window.location.href = 'signin.html'; 
    }
    //console.log(localStorage.username);
var today = moment(d).format('MM-DD-YYYY');
    $.ajax({url: "http://localhost:3000/cust/customers", success: function(result){

        $("#d_tbody").empty();
            $.each(result, function(key, val){
                var  cId, cName,cLocation, dstatus;
                $.each(val, function(k, vals){
                    if (k== "customer_id"){
                        cId = vals;
                       
                    }else if(k== 'customer_name'){
                        cName = vals;
                        
                    }else if (k== "customer_location"){
                        cLocation = vals;
                    }else if(k == 'status'){
                         dstatus = vals;
                    }else{
                        
                    }
                });
                var avail = '<div class="dropdown inline"><button class="btn btn-success dropdown-toggle" data-toggle="dropdown">'
                +dstatus+' </button>'
                +'<div class="dropdown-menu pull-right">'
                +' <a class="dropdown-item" href="#">Available</a>'
                +'  <a class="dropdown-item" href="#">Assigned</a>'
                +'  <a class="dropdown-item" href="#">in-progress</a>'
                +'</div>';
                var assig = '<div class="dropdown inline"><button class="btn btn-info dropdown-toggle" data-toggle="dropdown">'
                +dstatus+' </button>'
                +'<div class="dropdown-menu pull-right">'
                +' <a class="dropdown-item" href="#">Availabl</a>'
                +'  <a class="dropdown-item" href="#">Assigned</a>'
                +'  <a class="dropdown-item" href="#">inactive</a>'
                +'</div>';
                var inactive = '<div class="dropdown inline"><button class="btn btn-danger dropdown-toggle" data-toggle="dropdown">'
                +dstatus+' </button>'
                +'<div class="dropdown-menu pull-right">'
                +' <a class="dropdown-item" href="#">Available</a>'
                +'  <a class="dropdown-item" href="#">Assigned</a>'
                +'  <a class="dropdown-item" href="#">inactive</a>'
                +'</div>';
                var statusbtn;
                if(dstatus == 'active'){
                    statusbtn = avail
                }else if(dstatus == 'closed'){
                    statusbtn = inactive
                }
                var row = "<tr><td id='newclick' class = 'newclick_"+cId+"'>"+cId+"</td><td>"+cName+"</td><td>"+cLocation+"</td><td>"+statusbtn+"</td></tr>";
                $("#d_tbody ").append(row); 
                
                   // $("#d_tbody").append(row);
                   $(".newclick_"+cId+"").click(function(){
                    cid = cId;
                    custID(cId, cName);
                  });
            });
            
            $("#driver_table").DataTable();
        }});
        
        
        $("#saveCustomer").click(function(){
            
            var customer = {
                customer_id: $("#customerId").val(),
                customer_name:$("#customerName").val(),
                customer_location:$("#clocation").val(),
                status:"active"
            }
            $.ajax({
                url: "http://localhost:3000/cust/customer", 
                data: JSON.stringify(customer),
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',    
                success: function(result){
                    if(result.msg == "success"){
                        //alert("contact added successfully");
                        location.reload();
                    }else{
                        //alert(result.msg);
                        console.log(result.msg);
                    }      
                }
        });
        });

       $("#customerCrumb, .customerCrumb").click(function(){
        // $("#customerBox").show();
        // $("#job_table").empty();
        // var headcrumb = '<li class="breadcrumb-item"><a id="customerCrumb" class="customerCrumb" >All Customers</a></li>';
        // $("#headercrumb").empty();
        // $("#headercrumb").append(headcrumb);
       });

       $(".smallButton").click(function(){
        level1_0();
       });

      function custID(custId, cName){
        $("#customerBox").hide();
        $("#jobBox").show();
        $("#Jobs").hide();
        var cName = cName.toString().toUpperCase();
        $("#customerCrumb").empty();
        $("#customerCrumb").append(cName);
        var headcrumb = '<li class="breadcrumb-item"><a id="customerCrumb" class="customerCrumb" >'+cName+'</a></li>';
        var jobcrumb = '<li class="breadcrumb-item"><a href="#" id="jobCrumb">All Jobs</a></li>';
        $("#headercrumb").append(jobcrumb);
        $("#customer_id").val(custId);
        $("#customer_name").val(cName);
        jobId = cid+"-"+1;
        $("#job_id").val(jobId);
        $("#dispatchData").hide();
        $("#configData").show();

         
         var customerId = {
            customer_id : custId
         }
         $.ajax({
            url: "http://localhost:3000/job/custjobs", 
            data: JSON.stringify(customerId),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',    
            success: function(result){
                if(result.length == 0){
                    $(".noJobs").show();
                    
                }else{
                    
                    // calculating job id
                    totalJobs = result.length;
                    var totalJob = totalJobs+1;
                    jobId = cid+"-"+totalJob;
                    $("#job_id").val(jobId);
                    $("#customer_id").val(custId);
                    $("#customer_name").val(cName);
            // $("#job_tbody").empty(); 
            var tableName = cName.replace(/ /g,"_")+'_table';
            var jobtable = '<table id="'+tableName+'" class="table table-striped b-t"></table>';
            $("#jobTableDiv").empty();
            $("#jobTableDiv").append(jobtable);
            //jobTable.destroy();
            var appendhash = '#'+tableName;
                var jobTable = $(appendhash).DataTable({ 
                    "columns": [
                        { title: "Job Id" },
                        { title: "Job Name" },
                        { title: "Job Location" },
                        { title: "Start Date" },
                        { title: "Status" }
                    ]
                });  
                $.each(result, function(key, val){
                    var jId,jLocation, jName,sdate, dstatus;
                    $.each(val, function(k, vals){
                        if (k== "job_id"){
                            jId = vals;
                        }else if(k== 'job_location'){
                            jLocation = vals;
                        }else if (k== "job_name"){
                            jName = vals;
                        }else if(k== 'start_date'){
                            sdate = vals;
                        }else if(k == 'status'){
                             dstatus = vals;
                        }else{
                            
                        }
                    });
                    var avail = '<div class="dropdown inline"><button class="btn btn-success dropdown-toggle" data-toggle="dropdown">'
                    +dstatus+' </button>'
                    +'<div class="dropdown-menu pull-right">'
                    +' <a class="dropdown-item" href="#">Available</a>'
                    +'  <a class="dropdown-item" href="#">Assigned</a>'
                    +'  <a class="dropdown-item" href="#">in-progress</a>'
                    +'</div>';
                    var assig = '<div class="dropdown inline"><button class="btn btn-info dropdown-toggle" data-toggle="dropdown">'
                    +dstatus+' </button>'
                    +'<div class="dropdown-menu pull-right">'
                    +' <a class="dropdown-item" href="#">Available</a>'
                    +'  <a class="dropdown-item" href="#">Assigned</a>'
                    +'  <a class="dropdown-item" href="#">inactive</a>'
                    +'</div>';
                    var inactive = '<div class="dropdown inline"><button class="btn btn-danger dropdown-toggle" data-toggle="dropdown">'
                    +dstatus+' </button>'
                    +'<div class="dropdown-menu pull-right">'
                    +' <a class="dropdown-item" href="#">Available</a>'
                    +'  <a class="dropdown-item" href="#">Assigned</a>'
                    +'  <a class="dropdown-item" href="#">inactive</a>'
                    +'</div>';
                    var statusbtn;
                    if(dstatus == 'running'){
                        statusbtn = avail
                    }else if(dstatus == 'closed'){
                        statusbtn = inactive
                    }
                    var row = "<tr><td class = 'JobDetails_"+jId+"'>"+jId+"</td><td>"+jName+"</td><td>"+jLocation+"</td><td>"+sdate+"</td><td>"+statusbtn+"</td></tr>";
                   jobTable.row.add($(row)[0]).draw();
                    //$("#job_tbody").append(row);
                    //rowidbol=true;
                    //$("#job_table").DataTable();
                    $(".JobDetails_"+jId+"").click(function(){
                        jobDetails(jId);
                      });
                });
            }
        }
    
        });
    }

    function jobDetails(jId){
        var Jobid = {
            job_id : jId,


         }
         $("#dispatchData").show();
        $("#configData").hide();
         dispatchInfo(jId);
         $.ajax({
            url: "http://localhost:3000/job/jobdetails", 
            data: JSON.stringify(Jobid),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',    
            success: function(result){
                console.log(result);
                $("#jobBox").hide();
                $("#Jobs").show();
                clearjobform();
                $("#customer_id").val(result[0].customer_id);
                $("#cust-id").append(result[0].customer_id)
                $("#customer_name").val(result[0].customer_name.toString().toUpperCase());
                $("#cust-name").append(result[0].customer_name.toString().toUpperCase())
                $("#job_id").val(result[0].job_id);
                $("#job-id").append(result[0].job_id);
                $("#job_name").val(result[0].job_name.toString().toUpperCase());
                $("#job-name").append(result[0].job_name.toString().toUpperCase());
                $("#startDate").val(result[0].start_date);
                $("#job_location").val(result[0].job_location);
                $("#job-loc").append(result[0].job_location);
                $("#loca").val(result[0].job_location);
                $("#typebutton").append(result[0].job_type);
                $("#job-type").append(result[0].job_type);
                $("#DBweek").val(result[0].weekday.doublebottom);
                $("#DBweekend").val(result[0].weekend.doublebottom);
                $("#DBton").val(result[0].ton.doublebottom);
                $("#DBload").val(result[0].load.doublebottom);
                $("#SBweek").val(result[0].weekday.semibuttom);
                $("#SBweekend").val(result[0].weekend.semibuttom);
                $("#SBton").val(result[0].ton.semibuttom);
                $("#SBload").val(result[0].load.semibuttom);
                $("#EDweek").val(result[0].weekday.enddump);
                $("#EDweekend").val(result[0].weekend.enddump);
                $("#EDton").val(result[0].ton.enddump);
                $("#EDload").val(result[0].load.enddump);
                $("#TWweek").val(result[0].weekday.tenwheeler);
                $("#TWweekend").val(result[0].weekend.tenwheeler);
                $("#TWton").val(result[0].ton.tenwheeler);
                $("#TWload").val(result[0].load.tenwheeler);
                $("#Fweek").val(result[0].weekday.flatbed);
                $("#Fweekend").val(result[0].weekend.flatbed);
                $("#Fton").val(result[0].ton.flatbed);
                $("#Fload").val(result[0].load.flatbed);
            }
        });

    }

function clearjobform(){
    
    $(".job-form").val('');
    $(".job-form").empty();
    $("#reqDispatch").empty();
    $("#typebutton").empty();
    $("#job-id").empty();
    $("#job-name").empty();
    $("#job-loc").empty();
    $("#cust-id").empty();
    $("#cust-name").empty();
    $("#job-type").empty();
}

function level1_0(){
//show all customers
        $("#customerBox").show();
        $("#jobBox").hide();
        var headcrumb = '<li class="breadcrumb-item"><a id="customerCrumb" class="customerCrumb" >All Customers</a></li>';
        $("#headercrumb").empty();
        $("#headercrumb").append(headcrumb);
        $("#jobTableDiv").empty();
        $("#Jobs").hide();
        $(".noJobs").hide();
}
function level1_1(){
//new customer page
}
function level1_2(){
//old customer page
}
function level2_0(){
//all jobs of the customer
}
function level2_1(){
//new job 
}
function level2_2(){
//job details of the customer
}

$("#edit").click(function(){
    $(".newJob").prop('disabled', false); 
});

$("#update").click(function(){
    $(".newJob").prop('disabled', true); 
});

// Job Functionality 
$("#newJob").click(function(){
    $("#customerBox").hide();
    $("#jobBox").hide();
    $("#Jobs").show();
    clearjobform();
    $("#job_id").empty();
    $("#job_name").empty();
    $("#job_location").empty();
    $("#startDate").datetimepicker({
        timepicker:false,
        format:'m-d-Y',
        minDate:0
    });
    
});

var jobtype;
$(".jobtype").click(function(){
    jobtype = $(this).attr('value');
    $("#typebutton").empty();
    $("#typebutton").append(jobtype);
  });

  $(".ttype").click(function(){
    var ttype = $(this).attr('value');
    $("#ttype").empty();
    $("#ttype").append(ttype);
  });

  

$(".deleteRow").click(function(){
    $("table tbody").find('input[name="record"]').each(function(){
        if($(this).is(":checked")){
            $(this).parents("tr").remove();
        }
    });
});

$("#saveJob").click(function(){
        
    var job = {
        customer_id : cid,
        customer_name : $("#customerCrumb").text(),
        job_id : jobId,
        job_name: $("#job_name").val(),
        start_date: $("#startDate").val(),
        job_location:$("#job_location").val(),
        job_type: jobtype,
        weekday: {  doublebottom : $("#DBweek").val(), 
                    semibuttom : $("#SBweek").val(),
                    enddump : $("#EDweek").val(),
                    tenwheeler : $("#TWweek").val(),
                    flatbed : $("#Fweek").val(),
                },
        weekend: {  doublebottom : $("#DBweekend").val(), 
                    semibuttom : $("#SBweekend").val(),
                    enddump : $("#EDweekend").val(),
                    tenwheeler : $("#TWweekend").val(),
                    flatbed : $("#Fweekend").val(),
                },
        ton: {  doublebottom : $("#DBton").val(), 
                semibuttom : $("#SBton").val(),
                enddump : $("#EDton").val(),
                tenwheeler : $("#TWton").val(),
                flatbed : $("#Fton").val(),
                },
        load: {  doublebottom : $("#DBload").val(), 
                semibuttom : $("#SBload").val(),
                enddump : $("#EDload").val(),
                tenwheeler : $("#TWload").val(),
                flatbed : $("#Fload").val(),
        },
        notes: $("#notes").val(),
        status:"running"
    } 
    console.log(job);
    $.ajax({
        url: "http://localhost:3000/job/newjob", 
        data: JSON.stringify(job),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            if(result.msg == "success"){
                $("#success-msg").append("New Job created.")
                alert("job created");
                level1_0();
                $("#job-success").alert()
            }else{
                alert(result.msg);
                console.log(result.msg);
            }      
        }
});
});

$("#config").click(function(){
$("#configData").show();
$("#dispatchData").hide();
$("#jobsData").hide();
});
$("#dispatch").click(function(){
    $("#configData").hide();
    $("#dispatchData").show();
    $("#jobsData").hide();
});
$("#jobs").click(function(){
    $("#configData").hide();
    $("#dispatchData").hide();
    $("#jobsData").show();
});

$("#time").datetimepicker({
    datepicker:false,
  format:'H:i'
});



$("#cDispDate").datetimepicker({
    timepicker:false,
    format:'m-d-Y'
})

$("#cDispDate").val(today);

$("#cDispDate").on('change', function () {
    dateValidator();
});
dateValidator()

function dateValidator() {
    var val = $("#cDispDate").val();
    if (today == val) {
        $(".addDisp").prop('disabled', false);
    } else {
        $(".addDisp").prop('disabled', true);
    }
}


$("#cpre5").click(function(){
    var d = moment($("#cDispDate").val());
    var dp = d.add('days', -5);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#cDispDate").val(dp);
    dateValidator();
})
$("#cyest").click(function(){
    var d = moment($("#cDispDate").val());
    var dp = d.add('days',-1);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#cDispDate").val(dp);
    dateValidator();
})
$("#ctomm").click(function(){
    var d = moment($("#cDispDate").val());
    var dp = d.add('days',1);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#cDispDate").val(dp);
    dateValidator();
})
$("#cnex5").click(function(){
    var d = moment($("#cDispDate").val());
    var dp = d.add('days',5);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#cDispDate").val(dp);
    dateValidator();
})


$("#addToDispatch").click(function(){
    var dispatch = makeJsonFromDispatchTable('CDispatchTable');
    var strDisp = JSON.stringify(dispatch);
    console.log(strDisp);
    //var assigDriver = dispatch[0].value;
    //console.log(assigDriver);
    var drivers=[];
    $.each(dispatch,function(key,val){
        $.each(val, function(k,val){
            if(k=="Driver"){
                drivers.push(val);
            }
        })
    })


    var i = $("#cust-id").text(),
        j = $("#cust-name").text(),
        k = $("#job-id").text(),
        l = $("#job-name").text();
    var li = '<li class="list-group-item dark-white box-shadow-z0 b">'+i+'/ '+j+' / '+k+' / '+l+'</li>';
    $("#dispJobs").append(li);
    var count = $("#dispCount").text();
        count = parseInt(count)+dispatch.length;
        $("#dispCount").empty();
    $("#dispCount").append(count);

    // insert into db with wait status
    $.ajax({
        url: "http://localhost:3000/disp/newManydispatch", 
        data: strDisp,
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result);
            if(result.msg == "success"){
                for(var i=0;i<drivers.length;i++){
                    AssignDrivers(drivers[i]);
                }
                
                alert("Dispatch Scheduled");
                level1_0();
            }else{
                alert(result.msg);
                console.log(result.msg);
            }      
        }
});
});

function AssignDrivers(drivers){

    var dri={
        driver:drivers,
        status : 'Assigned',
        date : today
    }
    console.log(dri);
    $.ajax({
        url: "http://localhost:3000/dri/dristatupdate", 
        data: JSON.stringify(dri),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result);
        }
    })
}

function dispatchInfo(jId){
    var jobid = {
        job_id : jId,
        dispDate : today
    }
    $.ajax({
        url: "http://localhost:3000/disp/dispatchW", 
        data: JSON.stringify(jobid),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            if(result.length>0){
            console.log(result);
            var increment = 0;
            $("#Dispatchw").empty();
            $.each(result, function(key, val){
                increment = parseInt(increment)+1;
                var time,truckType,rate,driver,truck, status,notes;
                $.each(val, function( k, val ){
                    if( k == "Time"){
                        time = val;
                    }else if(k == "Truck_Type"){
                        truckType = val;
                    }else if(k == "Rate"){
                        rate = val;
                    }else if(k == "Driver"){
                        if(val==""){
                            driver = "";
                        }else{
                            driver = val;
                        }
                    }else if(k == "Truck_id"){
                        if(val==""){
                            truck = "";
                        }else{
                            truck = val;
                        }
                    }else if(k == 'status'){
                        if(val == 'New'){
                           status = '<td id = "status_'+increment+'"class = "btn btn-fw white">New</td>'
                        }else if(val == 'Assigned'){
                            status = '<td id = "status_'+increment+'" class = "btn btn-fw primary">Assigned</td>' 
                        }
                    }else if(k == 'notes'){
                        notes = val;
                    }
                });
                var row = "<tr><td>"+time+"</td><td>"+truckType+"</td><td>"+rate+"</td><td id= 'assigDriver_"+increment+"' class='assigDriver' data-truck-type= '"+truckType+"'>"+driver+"</td><td id= 'assigtruck_"+increment+"'>"+truck+"</td><td></td>"+status+"<td>"+notes+"</td></tr>";
                
                $("#Dispatchw").append(row);
                
            });
            
            }else{
                $("#Dispatchw").empty();
            }
        }
    });
}

$(".add-row").click(function(){
    var ttype = $("#ttype").text();
    var time = $("#time").val();
    var rate = $("#rate").val();
    var qty = $("#qty").val();
    var status = 'New';
    var notes = '';
    if(qty == ''){
        qty = 1;
    }
    var trow = '';
    var rowCount = $('#CDispatchTable tr').length;
    for (var i=1; i<=qty;i++){
        trow = trow+ "<tr><td>" + time  + "</td><td id='ttype_'"+i+">" + ttype + "</td><td>" + rate +
                    '</td><td id = "assigDriver_'+rowCount+'"class = "assigDriver" data-truck-type= "'+ttype+'" ></td><td id = "assigtruck_'+rowCount+'"></td><td id="frightBill"></td><td id = "status_'+rowCount+'" class = "btn btn-fw white">'+status+'</td><td>'+notes+'</td></tr>';
                    rowCount++;
    }
    $("#Dispatchw").append(trow);
});
getEDDrivers()
getSDDrivers()
getDBDrivers()
getTenWrivers()
getFlatBed()
function getEDDrivers(){
    $.ajax({
        url: "http://localhost:3000/dri/EDDrivers",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            EDDrivers = result;
        }
    })
}
function getSDDrivers(){
    $.ajax({
        url: "http://localhost:3000/dri/SDDrivers",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            SDDrivers=result;
        }
    })
}
function getDBDrivers(){
    $.ajax({
        url: "http://localhost:3000/dri/DBDrivers",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            DBDrivers = result;
        }
    })
}
function getTenWrivers(){
    $.ajax({
        url: "http://localhost:3000/dri/TenWDrivers",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            TenWDrivers = result;
        }
    })
}
function getFlatBed(){
    $.ajax({
        url: "http://localhost:3000/dri/Flatbed",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            flatbed = result;
        }
    })
}


$('#Dispatchw').on('click','.assigDriver',function(){
    var ttype = $(this).data("truck-type");
    var rownum = $(this).attr('id');
    var drivers;
    if(ttype == 'End-Dump'){
        drivers = EDDrivers;
    }else if(ttype == "Super-Dump"){
        drivers = SDDrivers;
    }else if(ttype == 'Double-Bottom'){
        drivers = DBDrivers;
    }else if(ttype == '10-wheeler'){
        drivers = TenWDrivers;
    }else if(ttype == 'Flatbed'){
        drivers = flatbed;
    }
    availDrivers(drivers,rownum);
 });

function availDrivers(drivers, index){

            $("#EDDrivers").empty();
            $.each(drivers, function( key, val ){
                var driver,truckid;
                $.each(val, function( k, val ){
                    if (k == "driver_name"){
                        driver = val;
                    }else if(k == "driver_id"){
                        truckid = val;
                    }else if(k=='status'){
                        stat=val
                    }
                });
                var row = "<tr class='"+stat+"'><td class='seleDriver_"+truckid+"' data-row-num='"+key+"' data-index='"+index+"'>"+driver+"</td><td>"+truckid+"</td></tr>";
                
                $("#EDDrivers").append(row);
                $(".seleDriver_"+truckid).click(function(){

                    var index = $(".seleDriver_"+truckid+"").data("index");
                    var rownum = index.split("_");
                    $("#"+index).empty();
                    $("#"+index).append(driver);
                    $("assigDriver_"+index).empty();
                    $("#assigtruck_"+rownum[1]).empty();
                    $("#assigtruck_"+rownum[1]).append(truckid);
                    $('#status_'+rownum[1]).empty();
                    $('#status_'+rownum[1]).removeClass('white');
                    $('#status_'+rownum[1]).addClass('primary')
                    $('#status_'+rownum[1]).append('Assigned');
                    $(".seleDriver_"+truckid).addClass('red')
                    $('#EDDriver').modal('hide');
                  });
                  
            });
            $('#EDDriver').modal('show');
            //$('#editDisp').modal("show"); 
}

});