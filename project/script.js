function parseJobDescription() {
    const jobDesctiptionElement = document.querySelector('.jobs-description-content__text');
    const socialShareBtn = document.querySelector('.social-share__dropdown-trigger');


    if (jobDesctiptionElement === null || socialShareBtn === null) {
        return;
    }
    const jobDesctiptionText = jobDesctiptionElement.innerText;
    matches = jobDesctiptionText.match(/(\d+\+?| \d+\-\d+\+?)[ ]*year/gi);
    if (matches == null || matches.length === 0) {
        removeTag();
        return;
    }
    const filteredMatches = [];
    for (const match of matches) {
        const matchInt = parseInt(match);
        if (Number.isInteger(matchInt) && matchInt < 20) {
            filteredMatches.push(matchInt)
        }
    }
    if (filteredMatches.length === 0) {
        removeTag();
        return;
    }

    const minYOE = Math.min(...filteredMatches);
    const maxYOE = Math.max(...filteredMatches);
    console.log(filteredMatches,minYOE, maxYOE )
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

function removeTag(){
    let yoeTag = document.getElementById('yoe_tag');
    if (yoeTag != null) {
        yoeTag.remove();
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

const target = document.querySelector('.jobs-description-content__text');

// Create an observer instance

const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      console.log(mutation.type);
    });
    parseJobDescription()
});
  
// Starts listening for changes in the root HTML element of the page.
mutationObserver.observe(document.documentElement, {
    attributes: true, 
    childList: true, 
    subtree: true
});

