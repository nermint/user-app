import React, { useEffect, useState } from 'react';
import './UserList.css';
import { localInstance } from '../../api/instance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        localInstance.get('users').then((res) => {
            setUsers(res.data);
        });
    }

    const deleteUser = (id) =>{
        localInstance.delete('users/'+id).then((res=>{
            getUsers();
        }))
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="table-responsive custom-table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Country</th>
                                <th scope="col">Address</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length ? users.map((user, i) => (
                                <React.Fragment key={i}>
                                    <tr>
                                        <td>{user?.id}</td>
                                        <td>{user?.firstname}</td>
                                        <td>{user?.lastname}</td>
                                        <td><a href={'mailto:'+user?.email}>{user?.email}</a></td>
                                        <td>{user?.country}</td>
                                        <td>{user?.address}</td>
                                        <td><Link to={'edit/' + user.id}><FontAwesomeIcon className='cursor-pointer' color='blue' size='xl' icon={faSquarePen} /></Link></td>
                                        <td><FontAwesomeIcon className='cursor-pointer' color='red' size='lg' icon={faTrashAlt} onClick={() => deleteUser(user.id)}/></td>
                                    </tr>
                                    <tr className="spacer"><td colSpan="100"></td></tr>
                                </React.Fragment>
                            )) : <tr><td colSpan={10} className="text-center">No data found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList;
