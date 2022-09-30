import React, { useState, useEffect } from 'react';
import './dashboard.css'
import Page from '../Pagination/page';
import { FiEdit, FiSave } from "react-icons/fi";
import { RiDeleteBinLine as RiDelete } from "react-icons/ri";
import { IoMdCloseCircleOutline as IoClose } from "react-icons/io";


const Dashboard = () => {

    // Fetches the data from the api, when the component mounts
    useEffect(() => {
        fetChingApi();
    }, [])

    /* State of the component */

    const [userData, setUser] = useState([]);
    const [viewPage, setViewPage] = useState({
        startIndex: 0,
        endIndex: 0,
    });
    const [saveUser, setSaveUser] = useState({
        name: "",
        email: "",
        role: "",
    });
    const [selectAll, setSelectAll] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    /**
   * @description Makes an api call and update the state of the user.
   * @returns {void}
   */

    const fetchFn = () => {
        return fetch(
            "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        ).then((res) => res.json());
    };

    const fetChingApi = () => {
        fetchFn().then((res) => {
            console.log("res", res);
            const apiData = res.map((user) => {
                return { ...user, status: false, selected: false };
            })
            console.log("apiData", apiData);
            setFilteredData(apiData);
            setUser(apiData);
        })
    }

    /**
   * @description updates the status of a user to true.
   * @param {*} id The id of the user that is to be edited.
   * @returns {void}
   */
    const editingHandler = (id) => {
        let data = filteredData.map((user) => {
            if (user.id === id) {
                return { ...user, status: true };
            }
            return user;
        });
        setFilteredData(data)
    };
    /**
  * @description updates the status of a user to false.
  * @param {*} id The id of the user that is to be edited.
  * @returns {void}
  */
    const closeHandler = (id) => {
        let data = filteredData.map((user) => {
            if (user.id === id) {
                return { ...user, status: false };
            }
            return user;
        });
        setSaveUser({ name: "", email: "", role: "" });
        setFilteredData(data);
    }

    /**
   * @description saves the user with the updated data.
   * @param {*} id The id of the user that is to be saved.
   * @returns {void}
   */
    const savingHandle = (id) => {
        let data = filteredData.map((user) => {
            if (user.id === id) {
                return {
                    id: user.id,
                    name: saveUser.name ? saveUser.name : user.name,
                    email: saveUser.email ? saveUser.email : user.email,
                    role: saveUser.role ? setUser.role : user.role,
                    status: false,
                };
            }
            return user;
        })
        setSaveUser({ name: "", email: "", role: "" });
        setFilteredData(data)
    }


    /**
     * @description deletes the user, and update the state of the Users.
     * @param {*} id The id of the user that is to be deleted.
     * @returns {void}
     */

    const deletingHandle = (id) => {
        let data = filteredData.filter((user) => user.id !== id);
        setFilteredData(data);
    }

    /**
  * @description update the state of the savedUser
  * @param {*} key
  * @param {*} value
  */
    const updatingHandle = (key, value) => {
        setSaveUser({ ...saveUser, [key]: value });
    }

    /**
   * @description Handler function when current page changes.
   * @param {*} start
   * @param {*} end
   */
    const PageChangeHandler = (start, end) => {
        setViewPage({
            startIndex: start,
            endIndex: end
        });
        setSelectAll(false);
        let data = filteredData.map((val) => {
            return { ...val, selected: false };
        });
        setFilteredData(data);
    }


    /**
     * @description updates the `selected` field of the filteredUsers.
     * @param {*} event
     */

    const selectAllHandler = (event) => {
        console.log("filtered", filteredData);
        setFilteredData(!selectAll);
        let data;
        if (event.target.checked) {
            data = filteredData.map((val) => {
                if (val.id > viewPage.startIndex && val.id <= viewPage.endIndex + 1)
                    return { ...val, selected: true }
                return val;
            })
        } else {
            data = filteredData.map((val) => {
                if (val.id > viewPage.startIndex && val.id <= viewPage.endIndex)
                    return { ...val, selected: false };
                return val;
            });
        }
        setFilteredData(data)
    }

    /**
   * @description Function handler for `Delete Selected` button.
   */
    const deletedSelectedHandler = () => {
        let data = filteredData.filter((val) => !val.selected);
        setFilteredData(data);
    }

    /**
   * @description toggles the selected status of a user.
   * @param {*} id The id of the user that is to be toggled.
   */
    const selectChangeHandler = (id) => {
        let data = filteredData.map((user) => {
            if (user.id === id) {
                return { ...user, selected: !user.selected };
            }
            return user;
        })
        setSelectAll(false);
        setFilteredData(data);
    }


    const updateUsers = (args) => {
        const keys = args?.target.value.toLowerCase();
        let data = [...userData];
        if (keys) {
          data = data.filter((obj) =>
            Object.keys(obj).some((key) => {
              if (typeof obj[key] === "string") {
                return obj[key].toLowerCase().includes(keys);
              }
              return false;
            })
          );
          setRefresh(!refresh);
        }
        setFilteredData(data);
      };
    
      const debounce = function (fn, d) {
        let timerId;
        return function () {
          const context = this,
            args = arguments;
          clearTimeout(timerId);
          timerId = setTimeout(function () {
            fn.apply(context, args);
          }, d);
        };
      };

    const debounceSearch = debounce(updateUsers, 300)
    return (
        <>
            <div>
                <input type="text" onKeyUp={debounceSearch} className='search' placeholder='Search by name,email or roles' />
            </div>
            <table className='userTable'>
                <thead>
                    <tr>
                        <th>
                            <input checked={selectAll} onChange={selectAllHandler} type='checkbox' />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roles</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="content">
                    {filteredData.slice(
                        viewPage.startIndex,
                        viewPage.startIndex + 10,
                    ).map((user) => (
                            <tr key={parseInt(user.id)}>
                                <td>
                                    <input checked={user.selected} onChange={() => { selectChangeHandler(user.id) }} type="checkbox" />
                                </td>
                                <td>
                                    <div style={user.status ? { border: "1px solid black" } : null}
                                        contentEditable={user.status}
                                        onInput={(event) => updatingHandle("name", event.target.value)}>
                                        {user.name}
                                    </div>
                                </td>
                                <td>
                                    <div style={user.status ? { border: "1px solid black" } : null}
                                        contentEditable={user.status}
                                        onInput={(event) => updatingHandle("email", event.target.value)}>
                                        {user.email}
                                    </div>
                                </td>
                                <td>
                                    <select disabled={user.status ? true : false} defaultValue={user.role}
                                        onChange={(event) => {
                                            updatingHandle("role", event.target.value)
                                        }}>
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </select>
                                </td>
                                <td>
                                    {user.status ? (
                                        <>
                                            <button onClick={() => savingHandle(user.id)}>
                                                <FiSave />
                                            </button>
                                            <button onClick={() => closeHandler(user.id)}>
                                                <IoClose />
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => editingHandler(user.id)}>
                                            <FiEdit />
                                        </button>)}
                                    <button onClick={() => deletingHandle(user.id)}>
                                        <RiDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div style={{ display: "flex" }}>
                <button className='deleteButton' onClick={deletedSelectedHandler}>
                    Delete Selected
                </button>
                {filteredData.length > 0 && (
                    <Page
                        sumOfItem={filteredData.length}
                        pageChange={PageChangeHandler}
                        refresh={refresh}
                    />
                )}
            </div>

        </>
    )
}

export default Dashboard;