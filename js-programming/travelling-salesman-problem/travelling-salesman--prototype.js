
var points = [ /* all points */ ];
var distances_2d = [ [], [], [] ];

function recursion(remain_list, total_distance_so_far, last_point)
{
    let total_distance;
    for (let i = 1; i < remain_list.length; i++) {
        let cloneList = remain_list.slice();
        cloneList.splice(i, 1);
        total_distance = recursion(cloneList, total_distance_so_far + distances_2d[last_point, i]);
    }

    return total_distance;
}
