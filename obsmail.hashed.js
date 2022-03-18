/**
 * @preserve: Obscure Email - Hashed, v1.1
 * @url: https://github.com/madebygrant/obsmail
 * @author: Grant, https://madebygrant.com
 */

const obsMail = {
    _d: function(encodedString){
        let string = "",
            keyInHex = encodedString.substr(0, 2),
            key = parseInt(keyInHex, 16);
    
        for ( let n = 2; n < encodedString.length; n += 2 ) {
            let charInHex = encodedString.substr(n, 2),
                char = parseInt(charInHex, 16),
                output = char ^ key;
    
            string += String.fromCharCode(output);
        }
        return string;
    },

    hashed: function(){
        const emailLinks = document.getElementsByClassName("obs-mail");

        if (0 !== emailLinks.length){

            for (let i = 0; i < emailLinks.length; ++i) {
                let emailA = emailLinks[i].getAttribute("data-link"),
                    updated_email = this._d(emailA),
                    label = emailLinks[i].querySelector("span");

                if( label && label.innerHTML == '' ){
                    label.textContent = updated_email;
                }

                emailLinks[i].addEventListener("click", function(e) {
                    e.preventDefault();

                    let emailA2 = updated_email,
                        emailS = e.target.parentNode.getAttribute("data-subject");

                    if (emailS != 'undefined' && emailS != null) {
                        window.location.href = "mailto:" + emailA2 + "?subject=" + emailS
                    } 
                    else {
                        window.location.href = "mailto:" + emailA2
                    }

                })
            }

        }
    }
}
document.addEventListener('DOMContentLoaded', function(){
    obsMail.hashed();
});
