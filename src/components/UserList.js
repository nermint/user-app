import React from 'react';
import './UserList.css';

const UserList = () => {
    return (
        <div>
            <div className="container">
                <div className="table-responsive custom-table-responsive">
                    <table className="table custom-table">
                        <thead>
                            <tr>
                                <th scope="col">Order</th>
                                <th scope="col">Name</th>
                                <th scope="col">Occupation</th>
                                <th scope="col">Contact</th>
                                <th scope="col">Education</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    1392
                                </td>
                                <td><a href="test">James Yates</a></td>
                                <td>
                                    Web Designer
                                    <small className="d-block">Far far away, behind the word mountains</small>
                                </td>
                                <td>+63 983 0962 971</td>
                                <td>NY University</td>
                            </tr>
                            <tr className="spacer"><td colSpan="100"></td></tr>
                            <tr>
                                <td>4616</td>
                                <td><a href="test">Matthew Wasil</a></td>
                                <td>
                                    Graphic Designer
                                    <small className="d-block">Far far away, behind the word mountains</small>
                                </td>
                                <td>+02 020 3994 929</td>
                                <td>London College</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}

export default UserList;
