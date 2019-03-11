$(document).ready(function () {

    if(!localStorage.username){
        window.location.href = 'signin.html'; 
    }

$("#DispatchDate").datetimepicker({
    timepicker: false,
    format: 'm-d-Y'
});
var d = new Date();
var today = moment(d).format('MM-DD-YYYY');
getDispatch(today);
$("#DispatchDate").val(today);

$("#DispDate").datetimepicker({
    timepicker: false,
    format: 'm-d-Y'
})
var d = new Date();
var today = moment(d).format('MM-DD-YYYY');
getCurrentDispatch(today);

$("#DispDate").val(today);

$("#DispDate").on('change', function () {
    dateValidator();
});
dateValidator()

function dateValidator() {
    if (today == $("#DispDate").val()) {
        $(".dispBlock").prop('disabled', false);
        getCustomers();
    } else {
        $(".dispBlock").prop('disabled', true);
        $(".ddTT").prop('disabled', true);
    }
}

function getCustomers(){
    $("#CustDropDown").empty();
    $.ajax({
        url: "http://localhost:3000/job/cust",
        type: 'get',
        http2: true,
        contentType: 'application/json',
        success: function (result) {
            console.log(result);
            $.each(result, function (key, val) {
            var dd = '<a class="dropdown-item custdd" id="'+val+'">'+val+'</a>'
            $("#CustDropDown").append(dd);
            })

        }
    })
}

$('#CustDropDown').on('click','.custdd',function(){
    $("#DCustomerName").empty();
    $("#DCustomerName").append($(this).attr('id'));
    $("#DCustomerName").removeClass('white');
    $("#DCustomerName").addClass('b-success');
    getCustJobs($(this).attr('id'));
})

function getCustJobs(custName){
    var name ={
        customer_name : custName
    }
    $("#Djob").empty();
    $.ajax({
        url: "http://localhost:3000/job/cjobs", 
        data: JSON.stringify(name),
        type: 'post',
        http2: true,
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result);
            $.each(result, function (key, val) {
                $.each(val, function (k, val) {
                    if(k=='customer_id'){
                        $("#DCustomerId").empty();
                        // $(".dispBlock").prop('disabled', true);
                        $("#DCustomerId").val(val);
                        $("#DCustomerId").addClass('b-success');
                        // $(".dispBlock").prop('disabled', false);
                    }else if(k == 'job_name'){
                        $("#DJobName").empty();
                        $("#DjobId").empty();
                        $("#DjobLocation").empty();
                        $("#DjobType").empty();
                        $("#DJobName").append('Job Name')
                        $(".ddTT").prop('disabled', true);
                        var dd = '<a class="dropdown-item jobdd" id="'+val+'">'+val+'</a>'
                        $("#Djob").append(dd);
                    }

                })
            })
        }
    })
}

$('#Djob').on('click','.jobdd',function(){
    $("#DJobName").empty();
    $("#DJobName").append($(this).attr('id'));
    $("#DJobName").removeClass('white');
    $("#DJobName").addClass('b-success');
    getjobDetails($(this).attr('id'))
})

function getjobDetails(jname){
    var name ={
        job_name : jname
    }

    $.ajax({
        url: "http://localhost:3000/job/jjobs", 
        data: JSON.stringify(name),
        type: 'post',
        http2: true,
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            
            $.each(result, function (key, val) {
                $.each(val, function (k, val) {
                    if(k == 'job_id'){
                        $("#DjobId").val(val);
                        $("#DjobId").addClass('b-success');
                    }else if(k == 'job_location'){
                        $("#DjobLocation").val(val);
                        $("#loca").val(val)
                        $("#DjobLocation").addClass('b-success');
                    }else if(k == 'job_type'){
                        $("#DjobType").val(val);
                        $("#DjobType").addClass('b-success');
                    }
                })
            })
            $(".ddTT").prop('disabled', false);
        }
    })
}

$(".ttype").click(function(){
    var ttype = $(this).attr('value');
    $("#ttype").empty();
    $("#ttype").append(ttype);
    $("#sDriver").empty();
    $("#sDriver").append('Driver - Truck')
    var type = {
        tt:ttype
    }
    $.ajax({
        url: "http://localhost:3000/dri/getDriver", 
        data: JSON.stringify(type),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result);
            $("#drivers").empty();
            $("#truckid").empty();
            $.each(result, function (key, val) {
                var dri,tru;
                $.each(val, function (key, val) {
                    if(key == 'driver_name'){
                        dri = val
                    }else if(key == 'truck_id'){
                        tru = val
                    }
                })
                var btn = '<a class="dropdown-item dritru" href="#" data-driver ="'+dri+'" data-truck="'+tru+'" value = "'+dri + ' - '+ tru +'">'+dri+ ' - '+tru+'</a>'
                        $("#drivers").append(btn)
            })

        }
    })
  });

  $('#drivers').on('click','.dritru',function(){
    var ttype = $(this).attr('value');
    $("#sDriver").empty();
    $("#sDriver").append(ttype);
})

$("#DispTime").datetimepicker({
    datepicker:false,
  format:'H:i'
});

$("#pre5").click(function () {
    var d = moment($("#DispDate").val());
    var dp = d.add('days', -5);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#DispDate").val(dp);
    $(".dispBlock").prop('disabled', true);
    $(".ddTT").prop('disabled', true);
    dateValidator();
    getDispatch(dp);
})
$("#yest").click(function () {
    var d = moment($("#DispDate").val());
    var dp = d.add('days', -1);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#DispDate").val(dp);
    $(".dispBlock").prop('disabled', true);
    $(".ddTT").prop('disabled', true);
    dateValidator();
    getDispatch(dp);
})
$("#tomm").click(function () {
    var d = moment($("#DispDate").val());
    var dp = d.add('days', 1);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#DispDate").val(dp);
    $(".dispBlock").prop('disabled', true);
    $(".ddTT").prop('disabled', true);
    dateValidator();
    getDispatch(dp);
})
$("#nex5").click(function () {
    var d = moment($("#DispDate").val());
    var dp = d.add('days', 5);
    dp = moment(dp).format('MM-DD-YYYY');
    $("#DispDate").val(dp);
    $(".dispBlock").prop('disabled', true);
    $(".ddTT").prop('disabled', true);
    dateValidator();
    getDispatch(dp);
})
$("#Dispatch").click(function () {
    $("#Dispatchs").show();
    $("#Bills").hide();
    $('#invoices').hide();
})
$("#Fbill").click(function () {
    $("#Dispatchs").hide();
    $("#Bills").show();
    $('#invoices').hide();
    clearform()
})

var dispatchTable = $("#dispatchTable").DataTable();

$(".add-rows").click(function (){
    var dritru = $("#sDriver").text();
    dritru = dritru.split(' - ');
    var newDispatch = {
        custId : $("#DCustomerId").val(),
        custName :$('#DCustomerName').text(),
        jobId : $('#DjobId').val(),
        jobName : $("#DJobName").text(),
        jobLoc : $("#DjobLocation").val(),
        jobType : $('#DjobType').val(),
        status : 'Assigned',
        notes : $("#DispNotes").val(),
        DispDate : $("#DispDate").val(),
        Time : $('#DispTime').val(),
        Fright_Bill : '',
        Truck : dritru[1],
        Driver : dritru[0],
        Rate : $("#DispRate").val(),
        Truck_Type : $("#ttype").text(),
        locA : $("#loca").val(),
        locB : $("#locb").val()
    }

    console.log(newDispatch);
    $.ajax({
        url: "http://localhost:3000/disp/newdispatch", 
        data: JSON.stringify(newDispatch),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            var driverstat = updateDriverStat(dritru[0],'Assigned', today);
            console.log(driverstat);
            var c = parseInt($("#dispCount").text())+1
            $("#dispCount").empty();
            $("#dispCount").append(c);
            console.log(result);
           /*  dispatchTable.row.add( [
                $('#DCustomerName').text(),
                $('#DjobId').val(),
                $('#DjobType').val(),
                $('#ttype').text(),
                $('#DispTime').val(),
                $('#DispRate').val(),
                dritru[0],
                dritru[1],
                '',
                'Assigned',
                $('#DispNotes').val(),
        ] ).draw( false ); */
        getDispatch($("#DispDate").val());
        }
    })
})

function updateDriverStat(Dname, stat, date){
    var reqData = {
        driver : Dname,
        status : stat,
        date : date
    }
    var stat
    $.ajax({
        url: "http://localhost:3000/dri/dristatupdate", 
        data: JSON.stringify(reqData),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            stat = result.nModified; 
        }
    })
    return stat
}

function getCurrentDispatch(today) {
    var dates = {
        date: today
    }
    $.ajax({
        url: "http://localhost:3000/disp/getDispatch",
        data: JSON.stringify(dates),
        type: 'post',
        contentType: 'application/json',
        success: function (result) {
            var totaltrucks = 0;
            $("#dispJobs").empty();

            $.each(result, function (key, val) {
                var i, j, l, m;
                $.each(val, function (k, val) {
                    if (k == 'value') {
                        totaltrucks = parseInt(totaltrucks) + val.length;
                        $("#dispCount").empty();
                        $("#dispCount").append(totaltrucks);
                    } else if (k == 'customer_id') {
                        i = val;
                    } else if (k == 'customer_name') {
                        j = val;
                    } else if (k == 'job_id') {
                        l = val;
                    } else if (k == 'job_name') {
                        m = val;
                    }
                })
                var li = '<li class="list-group-item dark-white box-shadow-z0 b">' + i + ' / ' + j + ' / ' + l + ' / ' + m + '</li>';
                $("#dispJobs").append(li);
                var tr = '<td>' + j + '</td><td>' + l + '</td><td>' + m + '</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>'
            })
        }
    });
}

var thisDisp = [];

function getDispatch(fordate) {
    var dates = {
        date: fordate
    }
    $.ajax({
        url: "http://localhost:3000/disp/getDispatch",
        data: JSON.stringify(dates),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function (result) {
            thisDisp = result;
            console.log(thisDisp)
            dispatchTable.clear().draw();
            $.each(result, function (key, val) {
                var _id,id,i, j, l, m,n,dri,tt,ti,fb,t,r,tr,a;
                $.each(val, function (k, trucks) {
                    if(k == '_id'){
                        _id = trucks
                        id = trucks.substr(trucks.length - 4)
                    }else if(k=='customer_name'){
                        i=trucks;
                    }else if(k=='job_id'){
                        j=trucks;
                    }else if(k == 'job_type'){
                        m=trucks;
                    }else if(k == 'status'){
                        if(trucks == 'New'){
                            n = '<span class = "stat text-accent md-btn">New</span>' 
                         }else if(trucks == 'Assigned'){
                             n = '<span class = " stat text-warning md-btn">Assigned</span>' 
                         }else if(trucks == 'Accepted'){
                             n = '<span class = "stat text-success md-btn">Accepted</span>'
                         }else{
                            n = '<span class = "stat text-danger md-btn">'+trucks+'</span>'
                         }
                    }else if(k=='notes'){
                        a = trucks;
                    }else if(k=='Driver'){
                        dri = trucks;
                    }else if(k =='Truck_Type' || k =='Truck-Type'){
                        tt = trucks;
                    }else if(k =='Time'){
                        ti = trucks;
                    }else if(k == 'Fright_Bill' || k =='Fright_bill'){
                        fb = trucks;
                    }else if(k =='Truck_id'){
                        t = trucks;
                    }else if(k == 'Rate'){
                        r = trucks;
                    }
                
                var b ='<a><span id="edit" style = "color:green"><i class="fa fa-pencil"></i></span></a><a><span style="color:red" class ="deleteRow"><i class="fa fa-trash-o"></i></span></a>';
                
                })
                dispatchTable.row.add( [
                    id,i,j,m,tt,ti,r,dri,t,fb,n,a
                ] ).draw( false );
                
            })
            
        }});
}


$(".deleteRow").click(function(){
    dispatchTable.row( $(this).parents('tr')).remove().draw();
});

var ftStat = false;

$('#dispatchTable tbody').on('click', 'tr', function() {
    dispatchTable.$('tr.light-blue-500').removeClass('light-blue-500');
    $(this).addClass('light-blue-500');
    var row = dispatchTable.row( this ).data();
    console.log(row);
    $('#waningDiv').hide();
    var drivers = [],index;
    //fetching index of this dispatch in thisDisp array
    $.each(thisDisp, function (key, val) {
        $.each(val, function (k, v) {
            if(k=='_id'){
                if(row[0] == v.substr(v.length - 4)){
                    index = key
                }
            }
        })
    })

    $('#EDStatus').removeClass('white');
    $('#EDStatus').removeClass('primary');
    $('#EDStatus').removeClass('success');
    $('#EDStatus').removeClass('danger');
    if(row[7] == ''){
        $("#edDriIn").hide();
        $("#edDriN").show();
        $("#EDtid").val('');
        $("#edDri").empty();
        $("#EDtid").prop('disabled', false);
        var type = {
            tt:row[4]
        }
        $("#edDrivers").empty();
        $.ajax({
            url: "http://localhost:3000/dri/getDriver", 
            data: JSON.stringify(type),
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',    
            success: function(result){
                drivers = result;
                $.each(result, function (key, val) {
                    var dri,tru;
                    $.each(val, function (key, val) {
                        if(key == 'driver_name'){
                            dri = val
                        }else if(key == 'truck_id'){
                            tru = val
                        }
                    })
                    var btn = '<a class="dropdown-item eddritru" id = "'+dri+'">'+dri+'</a>'
                            $("#edDrivers").append(btn)
                })
                
            }
        })
    }else{
        $("#edDriN").hide();
        $("#edDriIn").show();
        $("#edDri").empty();
        var dri = '<input type="text" id = "edDriIn" class="form-control col-md-1" value = "'+row[7]+'" disabled>';
        $("#edDri").append(dri);
        $("#EDtid").empty();
        $("#EDtid").prop('disabled', true); 
        $("#EDtid").val(row[8]);
        if(row[9]){
            ftStat = true;
            $("#EDfb").prop('disabled', true); 
            $('#EDStatus').prop('disabled', true);
        }else{
            $("#EDfb").prop('disabled', false); 
            $('#EDStatus').prop('disabled', false);
        }
    }
    $('#EDStatus').empty();
    if(row[10].indexOf('New') >= 0){
        $("#EDfb").prop('disabled', false);
        $('#EDStatus').addClass('white');
        $('#EDStatus').removeClass('warning');
        $('#EDStatus').removeClass('success');
        $('#EDStatus').removeClass('danger');
        $("#CanDisp").show();
        $('#EDStatus').append('New');
    }else if(row[10].indexOf('Assigned') >= 0){
        $("#EDfb").prop('disabled', false);
        $('#EDStatus').addClass('warning');
        $('#EDStatus').removeClass('success');
        $('#EDStatus').removeClass('danger');
        $("#CanDisp").show();
        $('#EDStatus').append('Assigned');
    }else if(row[10].indexOf('Accepted') >= 0){
        $('#EDStatus').addClass('success');
        $('#EDStatus').removeClass('warning');
        $('#EDStatus').removeClass('danger');
        $("#CanDisp").hide();
        $('#EDStatus').append('Accepted');
    }else if(row[10].indexOf('Cancel') >= 0){
        $("#EDfb").prop('disabled', false);
        $('#EDStatus').addClass('danger');
        $('#EDStatus').removeClass('warning');
        $('#EDStatus').removeClass('success');
        $("#CanDisp").hide();
        $('#EDStatus').append('Cancel');
    }
    $("#EDispID").val(row[0])
    $('#EDcustname').val(row[1]);
    $('#EDjobid').val(row[2]);
    $('#EDjobtype').val(row[3]);
    $('#EDtt').val(row[4]);
    $('#EDtime').val(row[5]);
    $('#EDrate').val(row[6]);
    $('#EDfb').val(row[9]);
    $('#locA').empty();
    $('#locB').empty();
    $('#locA').val(thisDisp[index].locA);
    $('#locB').val(thisDisp[index].locB);
    $('#EDnotes').val(row[11]);
    $('#editDisp').modal('show'); 
  });

  $("#pointSwap").click(function(){
    var a = $("#loca").val();
    var b = $("#locb").val();
    $("#loca").empty()
    $("#locb").empty()
    $("#loca").val(b)
    $("#locb").val(a)
})

$(".edstat").click(function(){
    var stat = $(this).attr('value')
    if(stat == 'New'){
        $('#EDStatus').addClass('white');
        $('#EDStatus').removeClass('warning');
        $('#EDStatus').removeClass('success');
        $('#EDStatus').removeClass('danger');
        $('#CanDisp').show();
    }else if(stat == 'Assigned'){
        $('#EDStatus').addClass('warning');
        $('#EDStatus').removeClass('success');
        $('#EDStatus').removeClass('danger');
        $('#CanDisp').show();
    }else if(stat == 'Accepted'){
        $('#EDStatus').addClass('success');
        $('#EDStatus').removeClass('warning');
        $('#EDStatus').removeClass('danger');
        $('#CanDisp').hide();
    }else if(stat == 'Cancel'){
        $('#EDStatus').addClass('danger');
        $('#EDStatus').removeClass('warning');
        $('#EDStatus').removeClass('success');
        $('#CanDisp').show();
    }
    $('#EDStatus').empty();
    $('#EDStatus').append(stat);
})

  $("#edDrivers").on('click', '.eddritru' , function(){
    $("#edDriver").empty();
    $("#edDriver").append($(this).attr('id'))
  })

$('#AllDispatchTbody').on('click', 'edit', function(){
    alert($(this).parents('tr'));
})
var notes = false;
$('#EDnotes').on('change', function(){
    notes = true
})

$("#CanDisp").click(function(){
console.log(notes);
    $('#waningDiv').hide();
    if(!notes){
        $('#waningDiv').show();
        $('#warning').empty();
        $('#warning').append('please Update the notes above');
    }else{  
       var dispdata  = {
            jid : $('#EDjobid').val(),
            jtype : $('#EDjobtype').val(),
            jtt : $('#EDtt').val(),
            jtime : $('#EDtime').val(),
            jrate : $('#EDrate').val(),
            dstatus : 'Cancel',
            dnotes : $("#EDnotes").val(),
            dri : $("#edDriIn").val(),
            truId : $('#EDtid').val()
       }
       var dri = $("#edDriIn").val();
       console.log(dispdata)
       $.ajax({
        url: "http://localhost:3000/disp/updateDispStat", 
        data: JSON.stringify(dispdata),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result)
            if(result.nModified === 1){
                updateDriverStat(dri , 'Available', today )
                getDispatch($("#DispDate").val());
            }
        }
        })
        $("#editDisp").modal('hide');
    }
})

$("#DispUpdate").click(function(){
  
   var id = $("#EDispID").val(),fullId
   $.each(thisDisp, function (key, val) {
    $.each(val, function (k, v) {
        if(k=='_id'){
            if(id == v.substr(v.length - 4)){
                fullId = v
            }
        }
    })
})
var dri
if($('#edDriver').text() == 'Driver' || $('#edDriver').text() == ''){
    dri = $('#edDriIn').val()
}else{
    dri =  $('#edDriver').text()
}
var dispData  = {
    id : fullId,
    job_id : $('#EDjobid').val(),
    tt : $('#EDtt').val(),
    EDtime : $('#EDtime').val(),
    driver : dri,
    truck_id : $('#EDtid').val(),
    Fbill : $('#EDfb').val(),
    status : $('#EDStatus').text(),
    notes : $('#EDnotes').val(),
    dispDate : $("#DispDate").val()
}

   var Fbill = $('#EDfb').val()
   $.ajax({
    url: "http://localhost:3000/disp/dispUpdate", 
    data: JSON.stringify(dispData),
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',    
    success: function(result){
        if(result.nModified == 1){
            $('#editDisp').modal('hide');
            if(Fbill && !ftStat){
                addFtBill(dispData);
            }
            getDispatch($("#DispDate").val());
            // window.location.href = 'dispatch.html'; 
        }

    }
})
})


function addFtBill(dispData){
    var id= dispData.id, index;

    $.each(thisDisp, function (key, val) {
        $.each(val, function (k, v) {
            if(k=='_id'){
                if(id == v){
                    index = key
                }
            }
        })
    })

    var newFtBill = {
        custId : thisDisp[index].customer_id,
        custName : thisDisp[index].customer_name,
        jobId : thisDisp[index].job_id,
        jobName : thisDisp[index].job_name,
        jobLoc : thisDisp[index].job_location,
        jobType : thisDisp[index].job_type,
        status : 'Created',
        notes : thisDisp[index].notes,
        Date : thisDisp[index].DispDate,
        Time : thisDisp[index].Time,
        Fright_Bill : $('#EDfb').val(),
        Truck_id : thisDisp[index].Truck_id,
        Driver : thisDisp[index].Driver,
        Rate : thisDisp[index].Rate,
        Truck_Type : thisDisp[index].Truck_Type,
        locA : thisDisp[index].locA,
        locB : thisDisp[index].locB
    }

    console.log(newFtBill);

    $.ajax({
        url: "http://localhost:3000/ftb/ftBillAdd", 
        data: JSON.stringify(newFtBill),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result);
            if(result.msg == 'success'){
                ftStat = false;
                addPayables(newFtBill)
            }
        }
    })

}

function addPayables(data){
    console.log(data)
    apData = { 
        jobId : data.job_id,
        jobName : data.job_name,
        jobLoc : data.job_location,
        jobType : data.job_type,
        status : 'Created',
        notes : data.notes,
        Date : data.DispDate,
        Time : data.Time,
        Fright_Bill : $('#EDfb').val(),
        Truck_id : data.Truck_id,
        Driver : data.Driver,
        Rate : data.Rate,
        Truck_Type : data.Truck_Type,
    }
}

$("#billSearch").click(function(){
    clearform()
    getFtBill($("#billId").val())
})

function getFtBill(ftBill){
    var billId = { bill:ftBill}|| {bill:$("#billId").val()}
    $.ajax({
        url: "http://localhost:3000/ftb/getFtBill", 
        data: JSON.stringify(billId),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result);
            $(".tag_id").val(result[0].Fright_Bill)
            $(".customer_id").val(result[0].customer_id)
            $(".customer_name").val(result[0].customer_name)
            $(".job_id").val(result[0].job_id)
            $(".job_name").val(result[0].job_name)
            $(".job_type").val(result[0].job_type)
            //$("#DriverId").val(result[0].)
            $(".DriverName").val(result[0].Driver)
            $(".Truck_id").val(result[0].Truck_id)
            $(".Truck_name").val(result[0].Truck_Type)
            $(".DisNotes").val(result[0].notes)
            $(".locA").val(result[0].LocA)
            $(".locB").val(result[0].LocB)
            $(".pRate").val(result[0].Rate)
            $(".FTDispTime").val(result[0].Time)
            $(".JobLoc").val(result[0].job_location)
            $(".FTDispDate").val(moment(result[0].date).format('MM-DD-YYYY'))
            $('.invoiced').prop('disabled', false);
            if(result[0].job_type == 'hourly'){
                $(".pHr").prop('disabled', false);
                $(".pTon").prop('disabled', true);
                $(".pLoad").prop('disabled', true);
            }else if(result[0].job_type == 'ton'){
                $(".pTon").prop('disabled', false);
                $(".pHr").prop('disabled', true);
                $(".pLoad").prop('disabled', true);
            }else if(result[0].job_type == 'load'){
                $(".pLoad").prop('disabled', false);
                $(".pHr").prop('disabled', true);
                $(".pTon").prop('disabled', true);
            }
            
            if(result[0].status == 'Entered'){
                getbillingInfo(result[0]);
                
            }else if(result[0].status == 'Invoiced'){
                $(".invoiced").prop('disabled', true);
                $('#invID').empty()
                $('#invDate').empty()
                $('#invID').append(result[0].invId)
                $('#invDate').append(moment(result[0].invDate).format('MM-DD-YYYY'))
                getbillingInfo(result[0]); 

            }
        }
    })
}

/* function getBillRate(){
    var billId = { bill:$("#billId").val()}
    $.ajax({
        url: "http://localhost:3000/ftb/getFtBill", 
        data: JSON.stringify(billId),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            
        }
    })
} */

$(".pJTQty").on('change', function(){
    var v = $('#pHr').val() || $('#pTon').val() || $('#pLoad').val();
    var qty = timeToDecimal(v)

    $("#pqty").val(qty);
    $('#bqty').val(qty);
    var rate = $("#pRate").val()
    var brokerfee = parseInt(rate) * parseInt(qty) * .08;
    $("#pbrokerfee").val(brokerfee);
    var pfee = $("#pfee").val() || 0;
    var cred = $('#pcre').val() || 0;
    var sub = parseFloat(brokerfee)+parseFloat(cred)
    var total = parseInt(qty * rate )+parseInt(pfee)-parseInt(sub)
    $('#ptotal').val(total);
    var bqty = $('#bqty').val(),brate = $('#brate').val(), bfee = $('#bfee').val(), badj = $('#badj').val()
    var btotal = parseInt(bqty*brate) + parseInt(bfee) - parseInt(badj);
    $('#btotal').val(btotal); 
})

$('.binput').change(function(){
    var bqty = $('#bqty').val(),brate = $('#brate').val(), bfee = $('#bfee').val() || 0, badj = $('#badj').val() || 0
    var btotal = parseInt(bqty*brate) + parseInt(bfee) - parseInt(badj);
    $('#btotal').val(btotal); 
})

function timeToDecimal(t) {
    var arr = t.split(':');
    var dec = parseInt((arr[1]/6)*10, 10);
    return parseFloat(parseInt(arr[0], 10) + '.' + (dec<10?'0':'') + dec);
}   

$('#FTSave').click(function(){
    var now = new Date();
    var ftData = {
        tagid  : $(".tag_id").val(),
        phr : $("#pHr").val(),
        pTon : $("#pTon").val(),
        pLoad : $("#pLoad").val(),
        pQty: $("#pqty").val(),
        pRate : $("#pRate").val(),
        pFee : $("#pfee").val(),
        pBrokerFee: $("#pbrokerfee").val(),
        pCredits : $("#pcre").val(),
        pTotal: $("#ptotal").val(),
        bQty : $("#bqty").val(),
        bRate : $("#brate").val(),
        bFee : $("#bfee").val(),
        bAdj : $("#badj").val(),
        bTotal : $("#btotal").val(),
        updated : localStorage.username,
        updatedTime : now,
        status : 'Entered'
    }
    $.ajax({
        url: "http://localhost:3000/ftb/updateFtBill", 
        data: JSON.stringify(ftData),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            console.log(result)
            if(result.ok == 1){
                getFtBill($(".tag_id").val())
                clearform() 
            }else{
                alert('Fright Bill Details Not Updateed Please Try again!!')
            }
        }
    })

})

function getbillingInfo(data){
    $("#pHr").val(data.phr)
    $("#pTon").val(data.pTon)
    $("#pLoad").val(data.pLoad)
    $("#pqty").val(data.pqty)
    $("#pRate").val(data.prate)
    $("#pfee").val(data.pfee)
    $("#pbrokerfee").val(data.pBrokerFee)
    $("#pcre").val(data.pCredit)
    $("#ptotal").val(data.pTotal)
    $("#bqty").val(data.bqty)
    $("#brate").val(data.brate)
    $("#bfee").val(data.bfee)
    $("#badj").val(data.bAdj)
    $("#btotal").val(data.bTotal)
    $('#updatedBy').append(data.updateBy)
    var dd = moment(data.updatedDate).format('MM-DD-YYYY hh:mm A');
    $('#updatedDate').append(dd)
}

var idate = moment().weekday(0);

$("#invdate").val(moment(idate).format('MM-DD-YYYY'));

$('#invdate').datetimepicker({
    onGenerate:function( ct ){
      $(this).find('.xdsoft_date.xdsoft_weekend')
        .addClass('xdsoft_disabled');
    },
    weekend:['01.01.2014','02.01.2014','03.01.2014','04.01.2014','05.01.2014','06.01.2014'],
    timepicker:false,
    format: 'm-d-Y'
  });
function clearform(){
    $('.ccfrm').empty()
    $('.ccfrm').val('')
}

$( "ol" ).on( "click", "span.viewTag" , function() {
//alert($(this).attr('id'))
clearform();
$('.tag_id').append($(this).attr('id'))
getFtBill($(this).attr('id'))
$('#FtBillShow').modal('show');

})



});