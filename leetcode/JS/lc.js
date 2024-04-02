var findNumbers = function(nums) {
    var counter=0;
    for (var i of nums){
        if(i.toString().length%2==0){
            counter++;
        }
    }
    return counter;
};

nums = [12,345,2,6,7896];

console.log(findNumbers(nums));