let getTo = (date, from, hours) => {
  let dateArr = date.split("/");
  let fromArr = from.split(":");
  let meridiem = fromArr[1].split(" ")[1];
  let hr = +hours;

  // console.log(dateArr);
  let oldDate = new Date(
    +dateArr[2],
    +dateArr[1] - 1,
    +dateArr[0],
    meridiem === "pm" ? +fromArr[0] + 12 : fromArr[0],
    +fromArr[1].split(" ")[0],
    0
  );

  // console.log("oldDate", oldDate.getTime());

  let incDateBy = Math.trunc(hr / 24);

  if (incDateBy > 0) {
    dateArr[0] = +dateArr[0] + incDateBy;
  }

  let incMeridiem = Math.trunc((hr % 24) / 12);

  if (incMeridiem > 0) {
    if (incMeridiem % 2 !== 0) {
      meridiem === "pm"
        ? (function () {
            meridiem = "am";
            dateArr[0] = +dateArr[0] + 1;
          })()
        : (meridiem = "pm");
    }
  }

  let incTimeHour = Math.trunc((hr % 24) % 12);

  if (incTimeHour > 0) {
    fromArr[0] = +fromArr[0] + incTimeHour;

    if (fromArr[0] >= 12) {
      meridiem === "pm"
        ? (function () {
            meridiem = "am";
            dateArr[0] = +dateArr[0] + 1;
          })()
        : (meridiem = "pm");
      fromArr[0] = fromArr[0] - 12;
    }
  }

  let finalDate = dateArr.join("/");

  let obj = {
    finalDate,
    time:
      fromArr[0] < 410
        ? "0" + fromArr[0] + ":" + fromArr[1].split(" ")[0]
        : fromArr[0] + ":" + fromArr[1].split(" ")[0],
    meridiem,
  };

  let cdate = obj.finalDate.split("/");

  let time;
  let hour;
  let minute = fromArr[1].split(" ")[0];
  if (meridiem === "pm") {
    time = obj.time.split(":");
    hour = +time[0] + 12;
  } else {
    time = obj.time.split(":");
    hour = +time[0];
  }

  let newdate = new Date(cdate[2], +cdate[1] - 1, cdate[0], hour, minute, 0);
  // console.log("newDate", newdate.getTime());

  // console.log("Result is: ", newdate.getTime() - oldDate.getTime());


  obj =  {
    finalDate,
    time:
      fromArr[0] < 10
        ? "0" + fromArr[0] + ":" + fromArr[1].split(" ")[0]
        : fromArr[0] + ":" + fromArr[1].split(" ")[0],
    meridiem,
    unavailable: newdate.getTime() - oldDate.getTime(),
    newdata: {
      fromMillisec: oldDate.getTime(),
      toMillisec: newdate.getTime(),
    },
  };

  // console.log(obj);

  return obj;
};

export default getTo;

// getTo("20/12/2022", "3:50 am", "58");
