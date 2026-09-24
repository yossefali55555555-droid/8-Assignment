/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let result=""
    for (let i =0;i<strs[0].length;i++){
        for(let n=1;n<strs.length;n++){
            if(strs[0][i]===strs[n][i]){
            }
            else{
                return result;
            }
        }
        result+=strs[0][i]
    }
    return result
};