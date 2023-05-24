import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app_config from "../../config";
import { toast } from "react-hot-toast";

const ContentHistory = () => {
    const [contentList, setContentList] = useState([]);
  const {apiUrl} = app_config; 
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const fetchUserData = async () => {
    const res = await fetch(apiUrl+"/content/getbyuser/"+currentUser._id);
    console.log(res.status);
    const data = await res.json();
    console.log(data);
    setContentList(data.result);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="tab2 p-md-3 container">

      <h1 className="container-fluid text-center badgeHeading2">
        Content Generation History
      </h1>
      <hr />
      <table className="table container-fluid badgeTable2 ">
        <thead className="fs-6 headBlock2">
          <tr>
            <th>S. No.</th>
            <th>Prompt Text</th>
            <th>Generated Content</th>
            
            <th>Date Generated</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bodyBlock2">
          {contentList.map((student, index) => (
            <tr>
              <td>{index+1}</td>
              <td>{student.prompt}</td>
              <td>{student.content.slice(0, 100)} ...</td>
              <td>{new Date(student.created_at).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-primary" onClick={() => {
                   navigator.clipboard.writeText(student.content);
                   toast.success('Content Copied')
                }}><i class="fas fa-copy    "></i> Copy Content</button>  
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentHistory;
