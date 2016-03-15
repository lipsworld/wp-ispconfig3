/*
*/

function ISPConfigClass() {
    var that = this;
    
    var domainMsgSelector = '#domainMessage';
    var subdomainTextSelector = '#domain_part';
    
    
    var init = function(){
        jQuery('input[data-ispconfig-checkdomain]').change(function(){
            var dom = jQuery(this).val();
            that.checkDomain( dom );
        });
        
        jQuery('input[data-ispconfig-subdomain]').keyup(function(){
            jQuery(subdomainTextSelector).text( jQuery(this).val().toLowerCase() );
        });
        
        var productDOM = jQuery('select[data-ispconfig-selectproduct]');
        
        productDOM.change(function(){
            that.selectProduct( jQuery(this).val() );
        });
        
        that.selectProduct( productDOM.val() );
    };
    
    this.selectProduct = function(product_id){
        if(parseInt(product_id) < 4) {
            jQuery('#domain').show();
            jQuery('#subdomain').hide();
        }
        else {
            jQuery('#domain').hide();
            jQuery('#subdomain').show();
        }
    };
    
    this.checkDomainCallback = function(response){
        var msg = jQuery(domainMsgSelector);
        console.log(response);
        msg.removeClass('ispconfig-msg-error ispconfig-msg-success');
        if(response < 0) {
            msg.text('Die Verfügbarkeit der Domain kann nicht verifiziert werden');
        } else if (response == 0) {
            msg.text('Der Domainname ist bereits vergeben');
            msg.addClass('ispconfig-msg-error');
        } else {
            msg.text('Der Domainname ist verfügbar');
            msg.addClass('ispconfig-msg-success');
        }
        msg.show();
    };
    
    this.checkDomain = function(domainName){
        // WP AJAX request defined in ispconfig-register.php
        ispconfig_whois(domainName, that.checkDomainCallback);
    };
    
    init();
}

jQuery(function(){
    var ISPConfig = new ISPConfigClass();
});