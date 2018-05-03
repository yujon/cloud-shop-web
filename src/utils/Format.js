export const formatDateString = (timestamp) => {
  if (timestamp === undefined) {
    return '';
  }
  const date = new Date(parseInt(timestamp) * 1000);
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
};

export const formatStringWithHtml = (originString) => {
  if (originString === undefined) {
    return '';
  }
  const newString = originString
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  return newString;
};

export const turnBirthToAge = (birthday) => {    
  if(!birthday)
    return 0;
  var returnAge;  
  var birthdayArr = birthday.split("-");  
  var birthYear = birthdayArr[0];  
  var birthMonth = birthdayArr[1];  
  var birthDay = birthdayArr[2];  
    
  var date = new Date();  
  var nowYear = date.getFullYear();  
  var nowMonth = date.getMonth() + 1;  
  var nowDay = date.getDate();  
    
  if(nowYear == birthYear){  
      returnAge = 0;//同年 则为0岁  
  }  
  else{  
      var ageDiff = nowYear - birthYear ; //年之差  
      if(ageDiff > 0){  
          if(nowMonth == birthMonth) {  
              var dayDiff = nowDay - birthDay;//日之差  
              if(dayDiff < 0){  
                  returnAge = ageDiff - 1;  
              }else{  
                  returnAge = ageDiff ;  
              }  
          }  
          else{  
              var monthDiff = nowMonth - birthMonth;//月之差  
              if(monthDiff < 0){  
                returnAge = ageDiff - 1;  
              }else{  
                  returnAge = ageDiff ;  
              }  
          }  
      }  
      else{  
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
      }  
  }   
  return returnAge;//返回周岁年龄  
}

export const getDate = function(date){
  console.log(date)
  if(!date){
    return ''
  };
   var temp = date.split('T');
   return temp[0];
}

export const getPriceRangeAndAllRest = (models)=>{
    var min,max,priceRange,allRest = 0;
    if(!models || models.length == 0){
      return  0;
    };
    min = max = models[0].modelPrice;
    for(var i=1;i<models.length;i++){
      if(models[i].modelPrice > max){
        max = models[i].modelPrice;
      }
      if(models[i].modelPrice < min){
        min = models[i].modelPrice;
      }
      allRest += models[i].modelRest;
    }
    if(min == max){
      priceRange = min.toString();
    }else{
      priceRange = min + "~" + max;
    }
    return {priceRange,allRest}
  }

