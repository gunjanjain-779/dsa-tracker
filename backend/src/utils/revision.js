const GAPS= [1,3,7,14,30];

function getNextSchedule(stage,result){
    let newStage;
    if(result==='solved_alone'){
         newStage= Math.min(stage+1,GAPS.length - 1);
    }else if(result==='solved_with_hint'){
        newStage= stage;
    }else{
        newStage=0;
    }
    return {stage:newStage, days:GAPS[newStage] || 30};
}

module.exports={getNextSchedule};