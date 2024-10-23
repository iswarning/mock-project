import { useNavigate } from "react-router-dom";
import imageAVT from "../../assets/avatarUser.png";
import { CHANGEROLE, DELETE } from "../../common/messageConfirm";
import { changeRole, deleteUser } from "../../store/actions/userAction";
import { useDispatch } from "react-redux";
import { memo } from "react";

function ElementUser({ user, handleEditUser }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
console.log('ElementUser');

    const handleChangeRole = (email, role) => {
        if (confirm(CHANGEROLE)) {
            dispatch(
                changeRole({
                    email,
                    role,
                },
                () => navigate('/login')
              )
            );
        }
      };
    
      const handleDeleteUser = (id) => {
          if (confirm(DELETE.user)) {
              dispatch(
                  deleteUser({
                      id,
                  })
              );
          }
      };

  return (
    <tr>
        <td>
            <img loading="lazy" className="avatar" src={user?.avarta || imageAVT} alt="User Avatar" />
        </td>
        <td>
            <span className="my-truncate text-truncate">
                {user.name}
            </span>
        </td>
        <td>
            <span className="my-truncate text-truncate">
                {user.email}
            </span>
        </td>
        <td>
            <select
                className="form-control"
                value={user.role}
                onChange={(e) =>
                    handleChangeRole(user.email, e.target.value)
                }
            >
                <option value={0}>User</option>
                <option value={1}>Admin</option>
            </select>
        </td>
        <td>
            <button
                className="btn btn-primary"
                onClick={() => handleEditUser(user)}
                data-bs-toggle="modal"
                data-bs-target="#modalEditUser"
                title="Edit this user"
            >
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            &nbsp;
            <button
                disabled={user.role === 1}
                className="btn btn-danger"
                onClick={() => handleDeleteUser(user.id)}
                title="Delete this user"
            >
                <i className="fa-solid fa-trash"></i>
            </button>
        </td>
    </tr>
  )
}

export default memo(ElementUser)