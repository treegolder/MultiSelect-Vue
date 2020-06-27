import xlsx from "xlsx";

export function readStudentFile(file) {
  return new Promise(resolve => {
    let students = [];
    // let scs = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    // 异步
    reader.onload = event => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
        let number = parseInt(r.__EMPTY);
        if (!isNaN(number)) {
          let st = new User();
          st.name = r.__EMPTY_1;
          st.number = number;
          //st.score = r.__EMPTY_9;
          students.push(st);
          // let sc = new SC();
          // sc.Student = st;
          // sc.score = r.__EMPTY_9;
          // sc.Course = r.__EMPTY_10;
          // scs.push(sc);
        }
      });
    };
    // 当load结束，回调
    // 当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve(students);
    };
  });
}
export function readSCFile(file) {
  return new Promise(resolve => {
    let students = [];
    let scs = [];
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    // 异步
    reader.onload = event => {
      let data = event.target.result;
      let workbook = xlsx.read(data, { type: "binary" });
      let sheet = workbook.Sheets[workbook.SheetNames[0]];
      xlsx.utils.sheet_to_row_object_array(sheet).forEach(r => {
        let number = parseInt(r.__EMPTY);
        if (!isNaN(number)) {
          let st = new User();
          st.name = r.__EMPTY_1;
          st.number = number;
          //st.score = r.__EMPTY_9;
          //students.push(st);
          // let course = new Course();
          // course.name =

          let sc = new SC();
          sc.number = number;
          sc.score = r.__EMPTY_9;
          sc.courseName = r.__EMPTY_10;
          scs.push(sc);
        }
      });
    };
    // 当load结束，回调
    // 当执行resolve()方法，会激活调用处的then()方法
    reader.onloadend = () => {
      resolve(scs);
    };
  });
}

class User {
  number;
  name;
}

class SC {
  number;
  courseName;
  score;
}
// class Course {
//   name;
// }
