$(document).ready(function () {

var d = new Date();
var today = moment(d).format('MM-DD-YYYY');

var invId;
getMaxInv()
function getMaxInv(){
    var d ={
     now : new Date()
    }
$.ajax({
    url: "http://localhost:3000/inv/maxInv",
    type: 'get',
    
    http2: true,
    contentType: 'application/json',
    success: function (result) {
        console.log(result);
        
        invId = result.invId
        
    }
})
}

$("#iweekly, #ijob").change(function () {
    if ($("#iweekly").is(":checked")) {
        getAllTagsByWeek()
        $('#invByWeek').show();
        $('#invByJob').hide();
    }else{
        $('#invByWeek').hide();
        $('#invByJob').show();
    }
    })
    
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
getAllTagsByWeek()

var tagsWeekly, tagsJob;
function getAllTagsByWeek(){
    var dateRange = {
        status : 'Entered'
    }
    $.ajax({
        url: "http://localhost:3000/ftb/getEnterFTB", 
        data: JSON.stringify(dateRange),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            if(result.length >0){
            
            const Array = result;
            const Property = "job_id";
            const FtbillByJobs = _.groupBy(Array, Property);
            $('#iJobIds').empty()
            tagsJob = FtbillByJobs
            $.each(FtbillByJobs, function(key,val){
                var jobid = '<li class="dd-item" data-id="15">'+
                '<div class="dd-content box ddFont"><div class="dd-handle pointernone"><i class="fa fa-reorder text-muted"></i></div>'+key+
                '<span id="'+key+'"class="text-success md-flat pull-right invthisJob"></span>'+
                '</div>'+
                '<ol class="dd-list">'
                $.each(val, function(k,v){
                    jobid = jobid + '<li class="dd-item" data-id="16">'+
                        '<div class="dd-content box ddFont"><div class="dd-handle pointernone"><i class="fa fa-reorder text-muted"></i></div>'+
                        '<div class="row">'+
                        '<div class="col-md-3"><span>FT Bill : </span>'+
                        '<span id ="'+ v.Fright_Bill+'"class="viewTag text-primary">'+v.Fright_Bill+'</span></div>'+
                        '<div class="col-md-3"><span>Date : </span><span class=" text-primary">'+moment(v.date).format("MM-DD-YYYY")+'</span></div>'+
                        '<div class="col-md-3"><span>Qty : </span><span class=" text-primary">'+v.bqty+'</span></div>'+
                        '<div class="col-md-3"><span>Total : $ </span><span class=" text-success">'+ v.bTotal+'</span></div>'+
                        '</div>'+
                        '</div>'+
                    '</li>'
                })
                jobid = jobid+'</ol></li>'
                $('#iJobIds').append(jobid);
            })
            var len = result.length
            var minDate = moment(result[len-1].date), maxDate = moment(result[0].date);
            var f=[];
            
            var WeekE = moment($("#invdate").val()).format('MM/DD/YYYY');
            f.push(WeekE);
            WeekE = moment(WeekE)
            if(moment(minDate).format('MM-DD-YYYY') === moment(maxDate).format('MM-DD-YYYY')){
                var weeks = Math.ceil(WeekE.diff(minDate, 'days')/7)
            }else{
                var weeks = Math.ceil(maxDate.diff(minDate, 'days')/7)
            }
            
            
            for(var i= 0; i< weeks;i++){ 
                WeekE =  moment(moment(WeekE).add(-7, 'days')).format('MM/DD/YYYY');
                f.push(WeekE);
            }
            var FTbillByWeek ={};
            
            for(var i =0;i<f.length;i++){
                var temp =[];
            $.each(result, function(key,val){
                var date = moment(val.date).format('MM/DD/YYYY')
                var week = Math.ceil(moment(f[i]).diff(date, 'days'))
                if(week<0){
                    
                }else if(week >=0 && week< 6){
                    temp.push(val);
                }
            })
            if(temp.length>0){
                FTbillByWeek[f[i]] = temp;
            }else{
            }
            }
            
            for(var i =0;i<f.length;i++){
                var a = FTbillByWeek[f[i]];
                var b = _.groupBy(a, "job_id");
                FTbillByWeek[f[i]] = b;
            }
            tagsWeekly = FTbillByWeek;
            $('#iByWeeks').empty(); 
            $.each(FTbillByWeek, function(key,val){ 
                var jobid = '<li class="dd-item" data-id="15">'+
                '<div class="dd-content box ddFont"><div class="dd-handle pointernone"><i class="fa fa-reorder text-muted"></i></div>'+key+'</div>'+
                '<ol class="dd-list">'
                $.each(val, function(keys,vals){
                    jobid = jobid + '<li class="dd-item" data-id="15">'+
                    '<div class="dd-content box ddFont"><div class="dd-handle pointernone"><i class="fa fa-reorder text-muted"></i></div>'+keys+
                    '<span data-week="'+key+'" data-job="'+keys+'" id="'+keys+'"class="text-success md-flat pull-right invthisWeek">Invoice</span>'+
                    '</div>'+
                    '<ol class="dd-list">'
                    $.each(vals, function(k,v){
                        jobid = jobid + '<li class="dd-item" data-id="16">'+
                        '<div class="dd-content box ddFont"><div class="dd-handle pointernone"><i class="fa fa-reorder text-muted"></i></div>'+
                        '<div class="row">'+
                        '<div class="col-md-3"><span>FT Bill : </span>'+
                        '<span id ="'+ v.Fright_Bill+'"class="viewTag text-primary">'+v.Fright_Bill+'</span></div>'+
                        '<div class="col-md-3"><span>Date : </span><span class=" text-primary">'+moment(v.date).format("MM-DD-YYYY")+'</span></div>'+
                        '<div class="col-md-3"><span>Qty : </span><span class=" text-primary">'+v.bqty+'</span></div>'+
                        '<div class="col-md-3"><span>Total : $ </span><span class=" text-success">'+ v.bTotal+'</span></div>'+
                        '</div>'+
                        '</div>'+
                    '</li>'
                    })
                    jobid = jobid + '</ol></li>' 
            })
            jobid = jobid+'</ol></li>'
                $('#iByWeeks').append(jobid);
                
                
        })
        }else{
            $('#iByWeeks').empty();
        }
    }
    })
}


$( "ol" ).on( "click", "span.invthisWeek" , function() {
    invoicing($(this).data("job"),$(this).data("week"))
    getAllTagsByWeek()
})

$( "ol" ).on( "click", "span.invthisJob" , function() {
    // alert($(this).attr("id"))
    getAllTagsByWeek()
})

function invoicing(job,week){
   
var details ={},custId,custName,jobId,jobName,jobLoc,jobType,total = 0,totalTag=0,ftb = '';

$.each(tagsWeekly, function(key,vals){ 
    if(key === week){
        $.each(vals, function(key,val){
            if(key === job){
                console.log(val);
                $.each(val, function(k,v){ 
                    d={}
                    totalTag++
                    custId = v.customer_id
                    custName = v.customer_name 
                    jobId = v.job_id
                    jobName = v.job_name
                    jobLoc = v.job_location
                    jobType = v.job_type
                    ftb= ftb+v.Fright_Bill+'||'
                    d.date = v.date
                    d.ftb= v.Fright_Bill
                    d.qty = v.bqty
                    d.total = v.bTotal
                    total = total+v.bTotal
                    details[k]=d;
                })
            }
        })
    }
})

var inv = invId.split('-')
var counter = parseInt(inv[1])+1
var now = new Date();
var data = {
    date : week,
    invId : inv[0]+'-'+counter,
    updatedBy : localStorage.username,
    updatedDate : now,
    status : 'Created',
    detail : details,
    total : total,
    cust_id : custId,
    cust_name : custName,
    job_id : jobId,
    job_name : jobName,
    job_loc : jobLoc,
    job_type : jobType,
    ftb:ftb
}

$.ajax({
    url: "http://localhost:3000/inv/newInv", 
    data: JSON.stringify(data),
    type: 'post',
    dataType: 'json',
    contentType: 'application/json',    
    success: function(result){
        if(result.msg == 'success'){
            invPrint(result.invRes,custId, totalTag);
        }
        
    }
})
}
function getCustLoc(cust){
    
return custLoc
}

function invPrint(invData,loc, totalTag){
    console.log(invData,loc)
    var data = {
        customer_id : loc
    }
    var custLoc
    $.ajax({
        url: "http://localhost:3000/cust/custLoc", 
        data: JSON.stringify(data),
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',    
        success: function(result){
            $('#InvoiceModal').modal('show');
            getAllTagsByWeek();
            $('#QTYTotal').empty();
            $('.invForm').empty();
            custLoc = result.customer_location
            custLoc = custLoc.split(',')
            $('#invId').append(invData.invId);
            $('#invDate').append(moment(invData.InvDate).format('MM-DD-YYYY'))
            $('#custId').append(invData.customer_name)
            $('#add1').append(custLoc[0])
            $('#add2').append(custLoc[1])
            $('#phone').append(invData.phone)
            $('#email').append(invData.email)
            
            for(var i=0;i<totalTag;i++){
                var tr='<tr><td>'+moment(invData.details[i].date).format('MM-DD-YYYY')+'</td>'+
                        '<td>'+invData.details[i].ftb+'</td>'+
                        '<td>'+invData.details[i].qty+'</td>'+
                        '<td>'+invData.details[i].total+'</td></tr>'
                $('#QTYTotal').append(tr)
            }
            var tr = '<tr><td></td><td></td><td><strong>Total</strong></td><td> <strong> $ '+invData.Total+'</strong></td></tr>'
                        $('#QTYTotal').append(tr)

            
        }
    })

}



})