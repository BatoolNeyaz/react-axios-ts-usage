import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tutorial from "./interfaces/Tutorial";
import AxiosTutServices from "./services/TutorialService";
import { useQuery, useMutation } from "react-query";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  //Setting initial states of GetId,GetTitle and GetResult using UseState react hook
  const [getId, setGetId] = useState("");
  const [getTitle, setGetTitle] = useState("");
  const [getResult, setGetResult] = useState<string | null>(null);

  //After receiveing response it should be converted into string.
  const formatResponse = (res: any) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery<
    Tutorial[],
    Error
  >(
    "query-tutorials",
    async () => {
      return await AxiosTutServices.findAll();
    },
    {
      enabled: false,
      onSuccess: (res) => {
        setGetResult(formatResponse(res));
      },
      onError:(err:any)=>{
        setGetResult(formatResponse(err.response?.data|| err));
      },
    }
  );

  
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>

//           Learn React

//       </header>
//     </div>
//   );
// }

export default App;
