
//Just to show the usage of three different styling type in one component , have used bootstrap+styled components+.css file
//
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import "./Employee.css";
import Employee from "../interfaces/Employee";
import AxiosEmployeeServices from "../services/EmployeeService";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

const MainDivWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #ADD8E6;

    padding-top: 0px;
    align-items: stretch;
    margin: 3%; 5%;
    flex-direction: row;
`;



const GetEmployee: React.FC = () => {
  //Setting initial states of GetId,GetName and GetResult using UseState react hook
  const [getId, setGetId] = useState("");
  //const [getName, setGetName] = useState("");
  const [getResult, setGetResult] = useState<string | null>(null);

  //After receiveing response it should be converted into string.
  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingEmployees, refetch: getAllEmployees } = useQuery<
    Employee[],
    Error
  >(
    "query-employees",
    async () => {
      return await AxiosEmployeeServices.findAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(formatResponse(res));
      },
      onError: (err: any) => {
        setGetResult(formatResponse(err.response?.data || err));
      },
    }
  );
  useEffect(() => {
    if (isLoadingEmployees) setGetResult("loading...");
  }, [isLoadingEmployees]);
  function getAllData() {
    try {
      getAllEmployees();
    } catch (err) {
      setGetResult(formatResponse(err));
    }
  }
  const { isLoading: isLoadingEmployee, refetch: getEmployeeById } = useQuery<
    Employee,
    Error
  >(
    "query-totorial-by-id",
    async () => {
      return await AxiosEmployeeServices.findById(getId);
    },
    {
      enabled: false,
      retry: 1,
      onSuccess: (res) => {
        setGetResult(formatResponse(res));
      },
      onError: (err: any) => {
        setGetResult(formatResponse(err.response?.data || err));
      },
    }
  );
  useEffect(() => {
    if (isLoadingEmployee) setGetResult("loading...");
  }, [isLoadingEmployee]);
  function getDatabyId() {
    if (getId)
      try {
        getEmployeeById();
        console.log(getEmployeeById())
      } catch (err) {
        setGetResult(formatResponse(err));
      }
  }
  const clearGetOutput = () => {
    setGetResult(null);
  };

  return (
    <MainDivWrapper>
      <div className="container">
        <header>GET Employees</header>
        <form>
        <ul className="flex-outer">
        <li>
          <label htmlFor="Id">Id</label>
          <input
            type="text"
            value={getId}
            onChange={(e) => setGetId(e.target.value)}
            className="form-control ml-2"
            placeholder="Id"
          />
        </li>
        </ul >
        <ul className="flex-inner" >
        <li> 
            <button className="button" onClick={getAllData}>
            Get All
          </button>
          </li>
          <li>
        <button className="button" onClick={getDatabyId}>
            Get by Id
          </button>
        </li>
        <button className="button" onClick={clearGetOutput}>
            Clear
          </button>
          </ul>
        
          <ul className="flex-outer">
            <li>
            {getResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{getResult}</pre>
            </div>
          )}
              </li>
              </ul>
              


 
        </form>

       
      
      </div>
    </MainDivWrapper>
  );
};
export default GetEmployee;
