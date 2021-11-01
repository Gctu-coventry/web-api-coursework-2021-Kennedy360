document.addEventListener("DOMContentLoaded", function(){
    
var form_submit = getId("paybox");
form_submit.onsubmit = function(e){
    e.preventDefault();
    pay();
};

})

// Get ID
function getId(id){
    var result = document.getElementById(id);
    return result;
}

function getValue(key){
    return key.value;
}

function jsons(data){
    return JSON.stringify(data);
}

function texts(json){
    return JSON.parse(json);
}

const getQueryParams = ( params, url ) => {
    let href = url;
    // this is an expression to get query strings
    let regexp = new RegExp( '[?&]' + params + '=([^&#]*)', 'i' );
    let qString = regexp.exec(href);
    return qString ? qString[1] : null;
  };

function pay(){
        
        var student_id = getId("paybox-student-id");
        var payer = getId("paybox-payer");
        var phone_number = getId("paybox-phonenumber");
        var card_number = getId("paybox-card-number");
        var card_expiry_month= getId("paybox-card-expiry-month");
        var card_expiry_year = getId("paybox-card-expiry-year");
        var card_cvv = getId("paybox-card-cvv");
        var amount = getId("paybox-amount");

        
    
        var payment_details = {
            "student_id" : getValue(student_id),
            "depositor_name" : `${getValue(payer)}`,
            "phone_number" : getValue(phone_number),
            "card_number" : getValue(card_number),
            "card_expiry_month" : getValue(card_expiry_month),
            "card_expiry_year" : getValue(card_expiry_year),
            "card_cvv" : getValue(card_cvv),
            "amount" : getValue(amount),
            "payment_method" : "card"
        }

        fetch("http://localhost:5000/api/v1/payments",{
            method: "POST",
            body: jsons(payment_details),
            headers: {
                "Content-Type" : "application/json",
                "Authentication": "Basic U2F2aW91cjpGcmFz"
            },
            redirect: 'follow',
            mode: "cors"
            
        })
        .then((res) => res.json()).then((data) => { 
            // 4242424242424242
            
        if(data.status === "Approved"){
            alert("Payment Successful");
        }
        else{
            alert("Payment Failed");
        }

    })

};
