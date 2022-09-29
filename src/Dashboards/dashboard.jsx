import react, { useState } from 'React'



const Dashboard = ()=>{

    // Fetches the data from the api, when the component mounts
    useEffect(()=>{

    },[])

    const [user,setrUserData]= useState();

    /**
   * @description Makes an api call and update the state of the usersData.
   * @returns {void}
   */
    const fetChingApi = async() =>{
    const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
    const data = await res.json();
    const apiData = data.map((user)=>{
        return {...user ,status : false , selected : false};
    })
    setrUserData(apiData);
    }
    return(
    <>
    <div>
        <input type="text" placeholder='Search by name,email or roles'></input>
    </div>
    
    </>
    )
    }