// const x :number = 101;
// console.log(x)



// function greeet(fristName:String){
//     console.log("hello "+ fristName);
// }
// greeet("Harshit")


// function sum(a:number, b:number): number{
//     return a+b;
// }
// console.log(sum(4, 5))



// function isLegal(x:number){
//     if(x>=18){
//         return true;
//     }else{
//         return false;
//     }
// }
// console.log(isLegal(34));


// function runAftee1Sec(fn:()=> void){
//     setTimeout(fn, 2000)
// }
// runAftee1Sec(() => greeet("harshit"));



// interface User {
//     fristName: String,
//     lastName: String,
//     age:number
// }

// const realUser: User = {
//     fristName: "Harshit",
//     lastName: "Pundir",
//     age: 22

// }

// function isLegal2(user:User){
//     if(user.age>=18) return true;
//     else return false
// }

// console.log(isLegal2(realUser))



// type User2 = {
//     fristName: String,
//     lastName: String,
//     age:number
// }
// type Employee = {
//     name: string;
//     startDate: Date;
//   };
  
//   type Manager = {
//     name: string;
//     department: string;
//   };
  
//   type TeamLead = Employee & Manager;
  
//   const teamLead: TeamLead = {
//     name: "harkirat",
//     startDate: new Date(),
//     department: "Software developer"
//   };



// function maxValue(arr: number[]) {
//     let max = 0;
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > max) {
//             max = arr[i]
//         }
//     }
//     return max;
// }

// console.log(maxValue([1, 2, 3]));


// interface User {
//     id: string,
//     name: string,
//     age: number,
//     email: string,
//     password: string
// }

// function sumOfAge(user1:User, user2:User){
//     return user1.age + user2.age
// }


// //Pick
// type updateProp = Pick<User, "name" | "age" | "email">
// function updateUser(updatedProp: updateProp){
//     //hit the database to update the user
// }


// //Partial ?:

// //ReadOnly

// type User2 = {
//     readonly name: string;
//     readonly age: number;
// }

// const obj :User2= {
//     name: "Harshit",
//     age: 21
// }
// obj.age = 34;  // there is an error in this lin becaus i can not rewrite the obj.ag because it is read only property

// interface Config {
//     readonly endpoint: string;
//     readonly apiKey: string;
//   }
  
//   const config: Readonly<Config> = {
//     endpoint: 'https://api.example.com',
//     apiKey: 'abcdef123456',
//   };
  
  



