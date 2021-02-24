/**
 * @preserve: Obscure Email - Character Replacement, v1.0.1
 * @url: https://github.com/madebygrant/obsmail
 * @author: Grant, https://madebygrant.com
 */

const __ = (fn) => {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
};

const obsMail = {
    _d: function(char) {
        let a = document.createElement("textarea");
        return a.innerHTML = char, a.value
    },

    replaceChars: function(){
        const emailLinks = document.getElementsByClassName("obs-mail");

        if (0 !== emailLinks.length){

            for (let i = 0; i < emailLinks.length; ++i) {
                let emailA = emailLinks[i].getAttribute("data-link"),
                    updated_email = emailA.replace(/\#/g, this._d("&#64;")).replace(/\:/g, this._d("&#46;")).replace(/\$/g, this._d("&#97;")).replace(/\%/g, this._d("&#101;")).replace(/\|/g, this._d("&#105;")).replace(/\!/g, this._d("&#111;")).replace(/\&/g, this._d("&#117;")),
                    label = emailLinks[i].querySelector("span");

                if( label && label.innerHTML == '' ){
                    label.innerHTML = updated_email;
                }

                emailLinks[i].addEventListener("click", function(e) {
                    e.preventDefault();

                    const emailA2 = updated_email,
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
    obsMail.replaceChars();
});