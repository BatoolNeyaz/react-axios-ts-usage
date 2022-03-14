import "bootstrap/dist/css/bootstrap.min.css";
import AxiosEmployeeServices from "../services/EmployeeService";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import "./Employee.css";
import styled from "styled-components";

const CreateEmployee: React.FC = () => {
  //Setting initial states of GetId,GetName and GetResult using UseState react hook
  const [postName, setPostName] = useState("");
  const [postAge, setPostAge] = useState(0);
  const [postSalary, setPostSalary] = useState(0);
  
  const [postResult, setPostResult] = useState<string | null>(null);

  const MainDivWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: #ADD8E6;
    padding-top: 0px;
    align-items: stretch;
    margin: 3%; 5%;
    flex-direction: row;
`;
  //After receiveing response it should be converted into string.
  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isPostingEmployee, mutate: postEmployee } = useMutation<
    any,
    Error
  >(
    
    async () => {
      return await AxiosEmployeeServices.create(
          {
              name: postName,
              age : postAge,
              salary : postSalary
          }
      );
    },
    {
     
      onSuccess: (res) => {
        setPostResult(formatResponse(res));
      },
      onError:(err:any)=>{
        setPostResult(formatResponse(err.response?.data|| err));
      },
    }
  );
  useEffect(()=>{
    if(isPostingEmployee ) setPostResult("posting...");
  },[isPostingEmployee]);
  function postData(){
   
      try{postEmployee();}
      catch(err){
        setPostResult(formatResponse(err));
      }
    
  }




const clearPostOutput=()=>{
  setPostResult(null);
};

return (
  <MainDivWrapper>
    <div className="container">
    
        <header>Create Employee Record</header>
        <form>
        <ul className="flex-outer">
          <li>
            <label htmlFor="FullName">Full Name</label>
            <input
              type="text"
              value={postName}
              onChange={(e) => setPostName(e.target.value)}
              className="form-control"
              placeholder="Name"
            />
          </li>
          <li> 
            <label htmlFor="Age">Age</label>
            <input
              type="number"
              value={postAge}
              onChange={(e) => setPostAge(e.target.valueAsNumber)}
              className="form-control"
              placeholder="Age"
            />
          </li>
          <li>
             <label htmlFor="Salary">Salary</label>
             <input
              type="number"
              value={postSalary}
              onChange={(e) => setPostSalary(e.target.valueAsNumber)}
              className="form-control"
              placeholder="Salary"
            />
          </li>
          </ul>
          <ul className="flex-inner">
            <li>
            <button className="button" onClick={postData}>
            Post Data
          </button>
        
            </li>
            <li>
            <button
            className="button"
            onClick={clearPostOutput}
          >
            Clear
          </button>

            </li>
            </ul>
            <ul className="flex-inner">
               {postResult && (
            <div className="alert alert-secondary mt-2" role="alert">
              <pre>{postResult}</pre>
            </div>
          )}
            </ul>

        </form>
       
      </div>
      </MainDivWrapper>
);
}
export default CreateEmployee;
