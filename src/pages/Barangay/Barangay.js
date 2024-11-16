import React, { useState, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import BarangayModule from "./Barangay.module.css";
import LoggedInCommonNavBar from "../../components/LoggedInCommonNavBar/LoggedInCommonNavBar";

const Barangay = () => {
    const [barangay, setBarangay] = useState([]);
    const [newBarangay, setNewBarangay] = useState({ 
        barangayId: "",    
        barangay: "" 
    });
    const [barangayToDelete, setBarangayToDelete] = useState(null);
    const [barangayToEdit, setBarangayToEdit] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const fetchBrg = () => {
        fetch(`${process.env.REACT_APP_API_URL}/barangay/registered-barangays`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.isSuccess) {
                    setBarangay(data.data);
                    console.log("Fetched Barangay Data:", data.data);
                } else {
                    console.error("Failed to fetch barangay data.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handleAddBarangay = () => {
        console.log("Adding barangay: "+" "+newBarangay.barangayId+" "+newBarangay.barangay);
        if (newBarangay.barangay) {
            const updatedBarangay = [...barangay, newBarangay];
            setBarangay(updatedBarangay);
            setNewBarangay({ barangay: "" });
            setShowAddModal(false);
        } else {
            console.error("Please fill out the field before adding.");
        }
        fetch(`${process.env.REACT_APP_API_URL}/barangay/register-barangay`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ barangay: newBarangay.barangay }), // Send data as JSON string
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    };

    // const handleDeleteBarangay = () => {
    //     console.log("Deleting barangay:", barangayToDelete.barangayId);
    //     if (barangayToDelete) {
    //         setBarangay(barangay.filter((item) => item.barangay !== barangayToDelete.barangay));
    //         setBarangayToDelete(null);
    //         setShowDeleteModal(false);
    //     }
    //     fetch(`${process.env.REACT_APP_API_URL}/barangay/delete-specific-brg/${barangayToDelete.barangayId}`,{
    //         method:"POST",
    //         headers:{
    //             "Content-Type": "application/json"
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //     });
    // };

    const handleDeleteBarangay = async () => {
        if (barangayToDelete) {
            // Log the barangayId of the barangay to be deleted
            console.log("Deleting barangay with ID:", barangayToDelete.barangayId);
            
            // Send a request to delete the barangay by its ID
            fetch(`${process.env.REACT_APP_API_URL}/barangay/delete-specific-brg/${barangayToDelete.barangayId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })            
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.isSuccess) {
                    setBarangay(barangay.filter((item) => item.barangayId !== barangayToDelete.barangayId));
                    setBarangayToDelete(null);
                    setShowDeleteModal(false);
                } else {
                    console.error("Failed to delete barangay.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    };
    


    const handleEditBarangay = (editedBarangay) => {
        console.log("Editing barangay:", editedBarangay);
        setBarangay(
            barangay.map((item) =>
                item.barangay === barangayToEdit.barangay ? editedBarangay : item
            )
        );
        setBarangayToEdit(null);
    };

    useEffect(() => {
        fetchBrg();
    }, []);

    return (
        <main className="d-flex">
            <SideMenu />
            <section className={`d-block ${BarangayModule.barangayContainer}`}>
                <LoggedInCommonNavBar title="Barangay" />
                <div className="m-5">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Barangay Name</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barangay.map((item) => (
                                <tr key={item.barangay}>
                                    <td>
                                        {barangayToEdit?.barangay === item.barangay ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={barangayToEdit.barangay}
                                                onChange={(e) =>
                                                    setBarangayToEdit({
                                                        ...barangayToEdit,
                                                        barangay: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            item.barangay
                                        )}
                                    </td>
                                    <td>
                                        {barangayToEdit?.barangay === item.barangay ? (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleEditBarangay(barangayToEdit)}
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => {
                                                        setBarangayToDelete(item);
                                                        setShowDeleteModal(true);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {/* Add New Barangay Row */}
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter New Barangay"
                                        value={newBarangay.barangay}
                                        onChange={(e) =>
                                            setNewBarangay({
                                                barangay: e.target.value,
                                            })
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => setShowAddModal(true)}
                                    >
                                        Add
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Add Barangay Confirmation Modal */}
            {showAddModal && (
                <div className={`modal d-block ${BarangayModule.dimBackground}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Barangay</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to add this barangay?</p>
                                <p>
                                    <strong>Name:</strong> {newBarangay.barangay}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleAddBarangay}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Barangay Confirmation Modal */}
            {showDeleteModal && (
                <div className={`modal d-block ${BarangayModule.dimBackground}`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete Barangay</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this barangay?</p>
                                <p>
                                    <strong>Name:</strong> {barangayToDelete?.barangay}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDeleteBarangay}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Barangay;
