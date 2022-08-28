import { Button } from "antd";
import axios from "axios";
import { useRef } from "react";
import { toast } from "react-toastify";
import { read, utils } from "xlsx"
export default function CSVTOJSON() {
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      console.log(e, "e")

      reader.onload = (event) => {
        console.log(event, "event")
        const data = event.target.result;
        console.log(data, "data")
        const workbook = read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json(worksheet);
        console.log(json);
        const bodyFormData = new FormData();
        bodyFormData.append("RequestType", "AddProductByCSV");
        bodyFormData.append("RequestData", JSON.stringify({ AddedBy: localStorage.getItem("Token"), ProductList: json }));
        axios
          .post("https://theductus.com/", bodyFormData)
          .then((res) => {
            toast(res?.data?.ResponseMessage);
          })
          .catch((err) => toast(err));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }
  const Upload = useRef(null)
  return (
    <Button
      type="primary"
      danger
      style={{
        padding: "0px 50px",
        fontSize: "15px",
        borderRadius: "10px",
        height: "40px",
        background: "#F57702",
        marginRight:"10px"
      }}
      onClick={() => Upload.current.click()}
    >
      <input
        type="file"
        name="upload"
        id="upload"
        style={{ display: "none" }}
        onChange={(e) => readUploadFile(e)}
        ref={Upload}
      />
      ADD Products By CSV
    </Button>
  );
}
