const x :number = 101;
console.log(x)



function greeet(fristName:String){
    console.log("hello "+ fristName);
}
greeet("Harshit")


function sum(a:number, b:number): number{
    return a+b;
}
console.log(sum(4, 5))



function isLegal(x:number){
    if(x>=18){
        return true;
    }else{
        return false;
    }
}
console.log(isLegal(34));


function runAftee1Sec(fn:()=> void){
    setTimeout(fn, 2000)
}
runAftee1Sec(() => greeet("harshit"));



interface User {
    fristName: String,
    lastName: String,
    age:number
}

const realUser: User = {
    fristName: "Harshit",
    lastName: "Pundir",
    age: 22

}

function isLegal2(user:User){
    if(user.age>=18) return true;
    else return false
}

console.log(isLegal2(realUser))



type User2 = {
    fristName: String,
    lastName: String,
    age:number
}
type Employee = {
    name: string;
    startDate: Date;
  };
  
  type Manager = {
    name: string;
    department: string;
  };
  
  type TeamLead = Employee & Manager;
  
  const teamLead: TeamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software developer"
  };



function maxValue(arr: number[]) {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    return max;
}

console.log(maxValue([1, 2, 3]));