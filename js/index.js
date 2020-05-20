$(document).ready(function(){
    const header = $('div.header'),
          body = $('div.body'),
          footer = $('div.body');

    const select = body.find('input.select'),
          assign = body.find('button.button'),
          input = body.find('textarea'),
          output = body.find('div.output');

    const text_1 = body.find('span#number-of-groups'),
          text_2 = body.find('span#list-of-items'),
          text_3 = body.find('span#assign');

    const texts = [
        [text_1, select],
        [text_2, input],
        [text_3, assign],
    ];

    // Highlight the different interactive fields on the form
    for (let text of texts){
        text[0].hover(() => {
            text[1].addClass('highlight');
            console.log(text);
        }, () => {
            text[1].removeClass('highlight');
            console.log('end');
        });
    }

    // If there is a warning regarding input data, remove it
    input.click(function(){
        $(this).removeClass('warning');
    });

    select.on('change', (data) => {
        let value = data.target.value;
        data.target.value = value > 50 ? 50 : data.target.value;
        data.target.value = value < 1 ? 1 : data.target.value;
    });

    assign.click(function(){
        output.empty();

        let items = getInput(input);
        let validListSize = items.length > 0;
        let singleItemNotBlank = validListSize;

        if (items.length === 1) {
            singleItemNotBlank = items[0] !== "" ? true : false;
        }

        if (validListSize && singleItemNotBlank){
            let inputItems = getItems(items);
            let counts = getCounts(inputItems, select.val());
            let groups = getGroups(inputItems, counts);

            // Add code to update the 'Number of Groups' input to counts

            let table, html;

            for (table in groups){
                html = generateTable(groups[table], table);
                output.append(html);
            }

        } else {
            let message = `<p class='warning-banner'>
                              Please specify a comma-separated
                              list of items you would like to
                              group in the field above.
                           </p>`;



            output.append(message);
            // input.addClass('warning');

            // setTimeout(() => {
            //     input.removeClass('warning');
            // }, 250);

            setTimeout(() => {
                output.empty();
            }, 3000);
        }
    })

});

/**
 * Return an Array of string items
 * @param {String} input : Input string of items to group
 * @param {String} delim : character to split input string by. Default is a comma
 */
function getInput(input, delim=','){
    return input.val().split(delim)
}

/**
 * Return the maximum number of groups based on the number of list items
 * @param {Array} arr : List of user input items to group
 * @param {Integer} count : User input number of groups to create
 */
function getCounts(arr, count){
    let max_count = arr.length;

    if (Number(count) === NaN){
        return NaN;
    }
    return max_count < Number(count) ? max_count : Number(count);
}

/**
 * Return an Array of trimmed comma separated values
 * @param {Array} arr : value from textarea to process into list
 */
function getItems(arr){
    let output = [], current;
    for (let item of arr){
        current = item.trim();

        if (current){
            output.push(current);
        }
    }
    return output;
}

/**
 * Assign array items to n groups.
 * @param {Array} arr : array of items to assign to groups
 * @param {int} n : maximum number of groups
 */
function getGroups(arr, n){
    let output = [], groups = n;

    while (groups > 0){
        output.push([]);
        groups--;
    }

    let shuffled = shuffle(arr), assignment, index;

    for (index in shuffled){
        assignment = index % n;
        console.log(index, assignment, n, output[assignment]);
        output[assignment].push(shuffled[index]);
    }

    return output;
}

/**
 * Shuffle an Array in place randomly
 * @param {Array} arr : List of items to shuffle
 */
function shuffle(arr) {
    let i, j;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

/**
 * Return an HTML table with the Array items passed through
 * @param {Array} arr : Array of items to put into a table
 * @param {Integer} idx : The current Array or group index for labeling
 */
function generateTable(arr, idx){
    let tbody = '', item;

    for (item in arr){
        tbody += `<tr>
                    <td>${Number(item) + 1}. ${arr[item]}</td>
                  </tr>`
    }

    return `<table>
                <tbody>
                    <th>Group ${Number(idx)+1} <span class='th-n'>(n=${arr.length})</span></th>
                    ${tbody}
                </tbody>
            </table>`;
}

/**
 * Toggle visibility of a guide arrow
 * @param {JQuery selection} arrow : ID name of HTML element containing the arrow
 */
function toggleArrow(self, arrow){
    if (arrow.hasClass('visible')){
        arrow.removeClass('visibile');
    } else {
        arrow.addClass('visible');
    }
}