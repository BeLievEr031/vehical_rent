// class Alarm {
//   alarmArr = [];

//   getCurrentTime() {
//     let date = new Date();
//     let splitArr = date.toLocaleString().split(" ");
//     console.log(splitArr[1] + " " + splitArr[2]);
//   }

//   setNewAlarm(name, date, time, formate) {
//     let dateOfAlarm = date.split("/");
//     let timeOfAlarm = time.split(":");

//     if (dateOfAlarm[1] > 12 || dateOfAlarm[0] > 31) {
//       return console.log("Invalid date");
//     }

//     let newdate = new Date(
//       dateOfAlarm[2],
//       dateOfAlarm[1] - 1,
//       dateOfAlarm[0],
//       timeOfAlarm[0],
//       timeOfAlarm[1],
//       timeOfAlarm[2],
//       0
//     );

    

//     let alarmIn = newdate.getTime() - new Date().getTime();

//     let id = setTimeout(() => {
//       let snooze = setInterval(() => {
//         console.log("Wake up...");
//       }, 1000);
//     }, alarmIn);
//     let alarmObj = {
//       id: id,
//       name: name,
//       snooze: 3,
//     };

//     this.alarmArr.push(alarmObj);
//   }

//   snoozeAlarm(nameOfAlarm) {
//     let idx = this.alarmArr.findIndex((alarmObj) => {
//       return alarmObj.name === nameOfAlarm;
//     });

//     if (idx === -1) {
//       return console.log("No alarm found");
//     }

//     if (this.alarmArr[idx].snooze > 0) {
//       this.alarmArr[idx].snooze -= 1;
//       if (this.alarmArr[idx].snooze === 0) {
//         this.deleteAlarm(nameOfAlarm);
//         console.log("No more snooze left && alarm deleted");
//       }
//     }
//   }

//   deleteAlarm(nameOfAlarm) {
//     let idx = this.alarmArr.findIndex((alarmObj) => {
//       return alarmObj.name === nameOfAlarm;
//     });

//     if (idx === -1) {
//       return console.log("No alarm found");
//     }

//     clearInterval(this.alarmArr[idx].id);
//     this.alarmArr.splice(idx, 1);
//     console.log("alarm deleted");
//   }
// }

// let alarm = new Alarm();

// alarm.getCurrentTime(); //To get current time
// alarm.setNewAlarm("Wake", "13/11/2022", "12:40:10"); //To set Alarm
// alarm.setNewAlarm("bath", "13/11/2022", "12:41:00"); //To set Alarm
// alarm.snoozeAlarm("Wake");// For snoozing alarm by name
// alarm.snoozeAlarm("Wake");// For snoozing alarm by name
// alarm.snoozeAlarm("Wake");// For snoozing alarm by name

// alarm.deleteAlarm("bath") //Delete alarm by name

let x = new Date(2022,11,23,1,0,0)
console.log(x.getDay());


mongodb+srv://drive:drive@cluster0.5y1qqd2.mongodb.net/?retryWrites=true&w=majority