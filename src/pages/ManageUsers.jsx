import React, { useEffect, useState } from "react"; // Added React here
import Swal from "sweetalert2";
import { FaUserShield, FaTools } from "react-icons/fa";
import { API_ENDPOINTS } from "../config/api";

const ManageUsers = () => {
  // Using direct state (removed the React. prefix for cleaner code)
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    fetch(API_ENDPOINTS.allUsers)
      .then((res) => res.json())
      .then((data) => {
        // Safety check: ensure data is an array before setting state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleUpdate = (user, newRole) => {
    fetch(`${API_ENDPOINTS.users}/admin/${user._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          fetchUsers(); // Refresh the list from the database
          Swal.fire({
            title: "Updated!",
            text: `${user.name} is now a ${newRole}.`,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Manage All Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-slate-100">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-slate-50 transition-colors"
              >
                <th>{index + 1}</th>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge badge-md capitalize ${
                      user.role === "admin"
                        ? "badge-error text-white"
                        : user.role === "provider"
                        ? "badge-primary text-white"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  {/* Action: Promote to Admin */}
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleRoleUpdate(user, "admin")}
                      className="btn btn-sm btn-outline btn-error"
                      title="Make Admin"
                    >
                      <FaUserShield /> Admin
                    </button>
                  )}

                  {/* Action: Promote to Provider */}
                  {user.role !== "provider" && (
                    <button
                      onClick={() => handleRoleUpdate(user, "provider")}
                      className="btn btn-sm btn-outline btn-primary"
                      title="Make Provider"
                    >
                      <FaTools /> Provider
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
