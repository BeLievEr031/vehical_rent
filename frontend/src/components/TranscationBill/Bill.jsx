import React from "react";
import Style from "./Bill.module.css";
import { jsPDF } from "jspdf";

function Bill({ bill }) {
  const GenericPdfDownloader = (rootElementId, downloadFileName) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("Transcation History", 20, 20);

    doc.setFontSize(16);
    doc.text(`_id:${bill._id}`, 20, 30);

    doc.setFontSize(16);
    doc.text(`Name:${bill.name}`, 20, 40);

    doc.setFontSize(16);
    doc.text(`Email: ${bill.email}`, 20, 50);

    doc.setFontSize(16);
    doc.text(`Vehical: ${bill.vehical ? bill.vehical.model : ""}`, 20, 60);

    doc.setFontSize(16);
    doc.text(`Hours: ${bill.hours}`, 20, 70);

    doc.setFontSize(16);
    doc.text(`From: ${bill.date} ${bill.from}`, 20, 80);

    doc.setFontSize(16);
    doc.text(
      `To: ${bill.to.finalDate} ${bill.to.time} ${bill.to.meridiem}`,
      20,
      90
    );

    doc.setFontSize(20);
    doc.setFont("helvatica", "bold");
    doc.text(`Amount: ${bill.amount}$`, 20, 105);
    doc.save(`${downloadFileName}.pdf`);
  };

  return (
    <>
      <div className={Style.bill_cont} id="rec">
        <h3>id: {bill._id}</h3>
        <div className={Style.user_cont}>
          <h3>Name:{bill.name}</h3>
          <h3>email:{bill.email}</h3>
        </div>

        <div className={Style.car_cont}>
          <h3>vehical:{bill.vehical ? bill.vehical.model : ""}</h3>
        </div>
        <div className={Style.date_cont}>
          <h3>Hours:{bill.hours} </h3>

          <h3>
            from:{bill.date + " "}
            {bill.from.trim()}
          </h3>
          <h3>
            to:{bill.to.finalDate + " "}
            {bill.to.time + " "}
            {bill.to.meridiem}
          </h3>
          <h3>Amount:${bill.amount}</h3>
        </div>

        <div className={Style.bill_action_cont}>
          <button
            className={Style.download}
            onClick={() => {
              GenericPdfDownloader("rec", bill._id);
            }}
            style={(() => {
              if (bill.status === "successfull") {
                return {
                  backgroundColor: "lightgreen",
                  color: "black",
                };
              } else if (bill.status === "fail") {
                return {
                  backgroundColor: "red",
                };
              }
            })()}
          >
            Download
          </button>
        </div>
      </div>
    </>
  );
}

export default Bill;
