function main(){
    const urlPath = window.location.pathname.split("/");

    if(!urlPath.includes("logical")){
        // Not a logical link
        window.location.href = "https://github.com/Apollorion/fly";
        return;
    }

    if(urlPath.length !== 4){
        // Bad logical link
        window.location.href = "https://github.com/Apollorion/fly/blob/main/help/logical-links.md#incorrect-length";
        return;
    }

    const linkIdentifier = urlPath[2];
    const linkLogicValues = urlPath[3].split("-");

    // This file is templated and $logicalLinks is replaced in terraform
    // with a legitimate json string. See cdn.tf.
    const logic = JSON.parse('${logicalLinks}');

    if(linkIdentifier in logic){
        let link = logic[linkIdentifier]["logic"];

        let i = 1;
        for(let item in linkLogicValues){
            link = link.replace(`$${i}`, item);
        }

        window.location.href = link;

    } else {
        window.location.href = "https://github.com/Apollorion/fly/blob/main/help/logical-links.md#logic-not-found";
    }

}

main();