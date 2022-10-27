function parseJobDescription() {
    const jobDesctiptionElement = document.querySelector('.jobs-description-content__text');
    const socialShareBtn = document.querySelector('.social-share__dropdown-trigger');


    if (jobDesctiptionElement === null || socialShareBtn === null) {
        return;
    }
    const jobDesctiptionText = jobDesctiptionElement.innerText;
    matches = jobDesctiptionText.match(/(\d+\+?| \d+\-\d+\+?)[ ]*year/gi);
    if (matches == null || matches.length === 0) {
        return;
    }
    const filteredMatches = [];
    for (const match of matches) {
        const matchInt = parseInt(match);
        if (Number.isInteger(matchInt) && matchInt < 30) {
            filteredMatches.push(matchInt)
        }
    }
    const minYOE = Math.min(...filteredMatches);
    const maxYOE = Math.max(...filteredMatches);
    const yoeText = minYOE === maxYOE ? `${String(minYOE)}+ YOE` : `${minYOE}-${maxYOE}+ YOE`;
    console.log(yoeText);
    let yoeTag = document.getElementById('yoe_tag');
    
    //first show yoeTag
    if (yoeTag === null){
        yoeTag = document.createElement('span');
        yoeTag.setAttribute('id', 'yoe_tag');
        modifyTag(yoeTag, yoeText, maxYOE)
        socialShareBtn.parentNode.before(yoeTag);

    } else if (yoeTag.innerHTML !== yoeText) {
        modifyTag(yoeTag, yoeText, maxYOE)
    }

}

function modifyTag(yoeTag, yoeText, maxYOE) {
    if (yoeText !== ''){
        // need yoe
        yoeTag.innerHTML = yoeText;
        addTagClass(yoeTag, maxYOE)
    } else {
        // potential ng
        yoeTag.innerHTML = 'Potential New Grad';
        yoeTag.classList.add('yoe_tag');
        yoeTag.classList.add('new-grad');
    }
}

function addTagClass(yoeTag, maxYOE) {
    yoeTag.removeAttribute('class');
    yoeTag.classList.add('yoe_tag');
    if (maxYOE == null) {
        yoeTag.classList.add('new-grad');
    } else if (1 <= maxYOE && maxYOE < 3){
        yoeTag.classList.add('junior')
    } else if (3 <= maxYOE && maxYOE < 5){
        yoeTag.classList.add('mid-level')
    } else {
        yoeTag.classList.add('senior')
    }
}

document.addEventListener("DOMSubtreeModified", function(event){
    parseJobDescription()
  });
