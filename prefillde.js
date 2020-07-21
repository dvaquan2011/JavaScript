(function (win, doc) {

    "use strict";

    var data, fillForm, FormData, len, _rand;

    // I like Chris's (http://chriscoyier.net/) randomize function.  Lets use it here.
    _rand = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getScriptEmail = (function () {
        var scripts = document.getElementsByTagName('script');
        var index = scripts.length - 1;
        var myScript = scripts[index];
        return function () { return myScript.getAttribute("data-email"); };
    })();

    // Load FakerJS library
    var script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js"
    script.onload = function () {
        fillForm();
    }
    document.head.appendChild(script);

    /*==========  CREATE DATA OBJECT  ==========*/

    FormData = function (faker) {
        this.randomWord = faker.Internet.domainWord();

        this.firstname = faker.Name.firstName() + "_fake";
        this.lastname = faker.Name.lastName() + "_fake";

        this.address1 = faker.Address.streetAddress() + "_fake";
        this.city = faker.Address.city() + "_fake";
        this.zip = faker.Address.zipCode() + "_fake";
        this.phone = _rand(1000, 120000);

        this.cardNo = "4000000000000010";
        this.cvv = _rand(100, 999);
        this.cardExpiryYear = fixRandMonth(_rand(1, 12)) + "/" + _rand(17, 37);
    };


    function fixRandMonth(input) {
        if (input < 10) {
            return "0" + input;
        } else {
            return input;
        }
    }

    // FormData.prototype.randomizeParagraph = function (el) {
    //     $(el).val(this.faker.Lorem.sentence(5));
    // };

    FormData.prototype.randomizeEmail = function (el) {
        //var email = getScriptEmail();
        //var random = this.randomWord + _rand(1, 10000);
        //el.value = email.split('@')[0] + "+" + random + "@" + email.split('@')[1];
        el.value = 'dfoqcteam+' + _rand(1, 10000) + '@dfo.global';
    };



    /*==========  FILL IN THE FORM  ==========*/

    fillForm = function () {
        data = new FormData(win.Faker);

        // var iframe = document.querySelector('iframe');
        // if(iframe) { //check if in dotAdmin with iframe 
        //     doc = iframe.contentDocument || iframe.contentWindow.document;
        // }

        if(doc.getElementById('customer_firstname')) {
            doc.getElementById('customer_firstname').value = data.firstname;
        }
        
        if(doc.getElementById('customer_lastname')) {
            doc.getElementById('customer_lastname').value = data.lastname;
        }

        if(doc.getElementById('customer_cpf')) {
            doc.getElementById('customer_cpf').value = '116.968.656-70';

            if(doc.getElementById('customer_phone')) {
                doc.getElementById('customer_phone').value = '(41) 2381-6677';
            }
        } else {
            if(doc.getElementById('customer_phone')) {
                doc.getElementById('customer_phone').value = data.phone;
            }            
        }
		
		if(doc.getElementById('shipping_streetname')) {
            doc.getElementById('shipping_streetname').value = '1234';
        }
		
		if(doc.getElementById('shipping_streetnumber')) {
            doc.getElementById('shipping_streetnumber').value = '4321';
        }

        if(doc.getElementById('shipping_cep')) {
            doc.getElementById('shipping_cep').value = '13087-430';
        }

        if(doc.getElementById('shipping_numero')) {
            doc.getElementById('shipping_numero').value = 'test+numero';
        }

        if(doc.getElementById('shipping_complemento')) {
            doc.getElementById('shipping_complemento').value = 'test+complemento';
        }
        
        if(doc.getElementById('shipping_firstname')) {
            doc.getElementById('shipping_firstname').value = data.firstname;
        }
        
        if(doc.getElementById('shipping_lastname')) {
            doc.getElementById('shipping_lastname').value = data.lastname;
        }

        if(doc.getElementById('billing_firstname')) {
            doc.getElementById('billing_firstname').value = data.firstname;
        }
        
        if(doc.getElementById('billing_lastname')) {
            doc.getElementById('billing_lastname').value = data.lastname;
        }
        
        data.randomizeEmail(doc.getElementById('customer_email'));
        if(doc.getElementById('billing_email')) {
            data.randomizeEmail(doc.getElementById('billing_email'));
        }
        
        if(doc.getElementById('billing_phone')) {
            doc.getElementById('billing_phone').value = data.phone;
        }

        doc.getElementById('creditcard_creditcardnumber').value = data.cardNo;
        var dt = new Date();
        var mm = _rand(1, 12), yy = dt.getFullYear() - 2000 + _rand(2, 10);
        mm = (mm < 10 ? "0" : "") + mm, yy = (yy < 10 ? "0" : "") + yy;
        doc.getElementById('creditcard_expirydate').value = mm + "/" + yy;
        doc.getElementById('creditcard_cvv').value = data.cvv;

        if(doc.getElementById('shipping_address1')) {
            doc.getElementById('shipping_address1').value = data.address1;
        }
        
        if(doc.getElementById('billing_address1')) {
            doc.getElementById('billing_address1').value = data.address1;
        }

        if(doc.getElementById('shipping_city')) {
            doc.getElementById('shipping_city').value = data.city;
        }
        
        if(doc.getElementById('billing_city')) {
            doc.getElementById('billing_city').value = data.city;
        }

        doc.querySelectorAll('#shipping_province option')[1].selected = true;
        if(doc.querySelectorAll('#billing_province option').length > 1) {
            doc.querySelectorAll('#billing_province option')[1].selected = true;
        }

        if(doc.getElementById('shipping_postal')) {
            doc.getElementById('shipping_postal').value = data.zip;        
        }
        
        if(doc.getElementById('billing_postal')) {
            doc.getElementById('billing_postal').value = data.zip;        
        }        
    };

}(window, window.document));