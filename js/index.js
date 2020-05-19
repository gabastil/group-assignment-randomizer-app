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

        let items = input.val().split(',');
        let validListSize = items.length > 0;
        let singleItemNotBlank = validListSize;

        if (items.length === 1) {
            singleItemNotBlank = items[0] !== "" ? true : false;
        }

        if (validListSize && singleItemNotBlank){
            let itemsToGroup = processArrayOfItems(items);
            let userSetGroups = select.val();
            let groupedItems = assignArrayToGroups(itemsToGroup, userSetGroups)

            let idx, table;
            for (idx in groupedItems){
                table = createTableWith(groupedItems[idx], idx);
                output.append(table);
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
 * Return an Array of trimmed comma separated values
 * @param {Array} arr : value from textarea to process into list
 */
function processArrayOfItems(arr){
    let output = [];
    for (let item of arr){
        output.push(item.trim());
    }
    return output;
}

/**
 * Assign array items to n groups.
 * @param {Array} arr : array of items to assign to groups
 * @param {int} n : maximum number of groups
 */
function assignArrayToGroups(arr, n){
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

function createTableWith(arr, idx){
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