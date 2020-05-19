$(document).ready(function(){
    const header = $('div.header'),
          body = $('div.body'),
          footer = $('div.body');

    const select = body.find('input.select'),
          assign = body.find('button.button'),
          input = body.find('textarea'),
          output = body.find('div.output');

    input.click(function(){
        $(this).removeClass('warning');
        output.empty();
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
            let counts = getcounts(inputItems, select.val());
            let groups = getGroups(inputItems, counts);

            // Add code to update the 'Number of Groups' input to counts

            let table, html;

            for (table in groups){
                html = generateTable(groups[table], table);
                output.append(html);
            }

        } else {
            let message = `<p>
                              Please specify a comma-separated
                              list of things you would like to
                              group.
                           </p>`;



            output.append(message);
            input.addClass('warning');
            setTimeout(() => {
                output.empty();
                input.removeClass('warning');
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
function getcounts(arr, count){
    let max_count = arr.length;
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
    let output = [], max = n, random_number, index;

    while (max > 0){
        output.push([]);
        max--;
    }

    for (let item of arr){
        random_number = Math.random() * n;
        index = Math.floor(random_number);
        if (output[index] !== undefined){
            output[index].push(item);
        }
    }

    return output;
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
                    <td>${item}. ${arr[item]}</td>
                  </tr>`
    }

    return `<table>
                <tbody>
                    <th>Group ${idx}</th>
                    ${tbody}
                </tbody>
            </table>`;
}
