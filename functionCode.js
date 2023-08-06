function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}
function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
            const plainTextLength = plainText.length;
            const positionsArray = plainTextPositions.map(position => [position.start, position.end]);
            positionsArray.sort((a, b) => a[0] - b[0]);
            let highlightedContent = '';
            let lastEndPosition = 0;
            for (let i = 0; i < positionsArray.length; i++) {
                let startPosition;
                let endPosition;
                let htmlindex = getIndicesOf(plainText.substring(positionsArray[i][0],positionsArray[i][1]), htmlContent);
                let plainindex = getIndicesOf(plainText.substring(positionsArray[i][0],positionsArray[i][1]), plainText);            
                for (let index = 0; index < plainindex.length; index++) {
                    if (plainindex[index] === positionsArray[i][0]) {
                        console.log("match found")
                        startPosition=htmlindex[index];
                        console.log(startPosition);
                        endPosition=htmlindex[index]+positionsArray[i][1]-positionsArray[i][0];
                        console.log(endPosition);
                        console.log(index);
                    }
                }
                const nonMatchingContent = htmlContent.substring(lastEndPosition, startPosition);
                highlightedContent += nonMatchingContent;
                const matchingContent = htmlContent.substring(startPosition, endPosition);
                highlightedContent += `<mark>${matchingContent}</mark>`;
                lastEndPosition = endPosition;
            }
            const finalNonMatchingContent = htmlContent.substring(lastEndPosition, htmlContent.length);
            highlightedContent += finalNonMatchingContent;
            return highlightedContent;
        }
const htmlContent = '<p><span>Hi David<br><br>Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects<br><br>Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar…<br><br>Read the full article <a href="https://content.seleritycorp.com/hosted/assets/www/UKMW47_hYz_RGzPSpHm44Hi1L49HdNBhs1OkKKW2OPI">here</a><br><br>-------------------------------------<br><br>You received this because you are subscribed to news related to <a href="https://iris.steeleye.co/market/instruments?search=ES0113900J37">ES0113900J37</a>, and this story was marked as 82% relevant.<br><br>Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. <br><br>To unsubscribe change your email preferences, please click <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley">here</a>.<br><br>-------------------------------------<br><br><img src="https://context.seleritycorp.com/selerity/assets/sc_icons/pressRelease.png" alt="Rick Astley" style="width:100px;height:100px;"></span></p>';
        const plainText = 'Hi David Headline: Energix Closes $520 Million Financing and Tax Equity Deal to Fund New Solar Projects Summary: Two deals with Morgan Stanley Renewables Inc. and Santander CIB will help finance the construction and operation of six utility Equity scale solar… Read the full article here ------------------------------------- You received this because you are subscribed to news related to ES0113900J37 , and this story was marked as 82% relevant. Copyright of PR Newswire. All Rights Reserved. Terms and Conditions | Privacy Policy. To stop PR Newswire emails from getting removed by email filters please add our address (noreply@prnewswire.com) to your email address book. Registered Office: 3 Spring Mews, London SE11 5AN. Tel: +44 (0) 207 8405100. To unsubscribe change your email preferences, please click here . -------------------------------------';
        const plainTextPositions = [
    {
        start: 241,
        end: 247,
    },
    {
        start: 518,
        end: 525,
    },
];
document.write(htmlContent);
const highlightedHTML = highlightHTMLContent(htmlContent, plainText, plainTextPositions);
document.write(highlightedHTML);
