import "bootstrap/dist/css/bootstrap.min.css";
import AxiosEmployeeServices from "../services/EmployeeService";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import styled from "styled-components";
import "./Employee.css";

const MainDivWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #ADD8E6;
    padding-top: 0px;
    align-items: stretch;
    margin: 3%; 5%;
    flex-direction: row;
`;
const UpdateEmployee: React.FC = () => {
  //Setting initial states of GetId,GetName and GetResult using UseState react hook
  const [putId, setPutId] = useState("");
  const [putName, setPutName] = useState("");
  const [putAge, setPutAge] = useState(0);
  const [putSalary, setPutSalary] = useState(0);

  const [putResult, setPutResult] = useState<string | null>(null);

  //After receiveing response it should be converted into string.
  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isUpdatingEmployee, mutate: updateEmployee } = useMutation<
    any,
    Error
  >(
    async () => {
      return await AxiosEmployeeServices.update(putId, {
        name: putName,
        age: putAge,
        salary: putSalary,
      });
    },
    {
      onSuccess: (res) => {
        setPutResult(formatResponse(res));
      },
      onError: (err: any) => {
        setPutResult(formatResponse(err.response?.data || err));
      },
    }
  );
  useEffect(() => {
    if (isUpdatingEmployee) setPutResult("updating...");
  }, [isUpdatingEmployee]);
  function putData() {
    if (putId) {
      try {
        updateEmployee();
      } catch (err) {
        setPutResult(formatResponse(err));
      }
    }
  }

  const clearPutOutput = () => {
    setPutResult(null);
  };

  return (
    <MainDivWrapper>
      <div className="container">
        <header>Update Employee Details</header>
        <form>
<ul className="flex-outer">
  <li>
    <label htmlFor="Id">Id</label>
    <input
              type="text"
              value={putId}
              onChange={(e) => setPutId(e.target.value)}
              className="form-control ml-2"
              placeholder="Id"
            />

  </li>
  <li>
  <label htmlFor="Full Name">Full Name</label>
  <input
              type="text"
              value={putName}
              onChange={(e) => setPutName(e.target.value)}
              className="form-control ml-2"
              placeholder="Name"
            />
 
    
  </li>
  <li>
    <label htmlFor="Age">Age</label>
    <input
              type="number"
              value={putAge}
              onChange={(e) => setPutAge(e.target.valueAsNumber)}
              className="form-control ml-2"
              placeholder="Age"
            />
  </li>
  <li>
    <label htmlFor="Salary"> Salary </label>
    <input
              type="number"
              value={putSalary}
              onChange={(e) => setPutSalary(e.target.valueAsNumber)}
              className="form-control ml-2"
              placeholder="Salary"
            />
  </li>
  </ul>
  <ul className="flex-inner">
    <li>
    <button className="button" onClick={putData}>
              Update Data
            </button>
    </li>
    <li>
    <button className="button" onClick={clearPutOutput}>
            Clear
          </button>
    </li>
    
  </ul>
  <ul className="flex-inner">
    <li>
  {putResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{putResult}</pre>
            </div>
          )}
          </li></ul>
  

        </form>
     
      </div>
    </MainDivWrapper>
  );
};
export default UpdateEmployee;
