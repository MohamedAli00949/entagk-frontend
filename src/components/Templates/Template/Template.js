import React, { lazy, Suspense, useState } from 'react';

import { updatedAt } from '../../../utils/helper';

import { FiEdit3 } from 'react-icons/fi';
import { MdDelete, MdAddTask } from 'react-icons/md';
import CircularMenu from "../../../icons/circularMenu/CircularMenu";

import Loading from '../../../utils/Loading';

import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToTodo, deleteTemplate } from '../../../actions/templates';

const DeletePopup = lazy(() => import("../../../utils/DeletePopup/DeletePopup"));

function Template({ isLoading, setIsLoading, setMessage, ...props }) {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { user } = useSelector(state => state.auth);

  const hours = ((
    (props.time.PERIOD * props.est) +
    (props.time.SHORT * (props.est - Math.floor(props.est / props.longInterval))) +
    (props.time.LONG * Math.floor(props.est / props.longInterval))
  ) / 60 / 60);

  const [updated, setUpdated] = useState(updatedAt(props?.updatedAt));

  setInterval(() => {
    setUpdated(updatedAt(props?.updatedAt));
  }, 10000);

  const hadnleAddToTodo = () => {
    setOpenMenu(false);
    dispatch(addToTodo(props._id, setIsLoading, setMessage));
  }

  const toggleDelete = () => {
    setOpenDelete(true);
    setOpenMenu(false);
  }

  const handleDelete = () => {
    setOpenDelete(false);
    dispatch(deleteTemplate(props._id, setIsLoading, setMessage));
  }

  return (
    <>
      {openDelete && (
        <Suspense fallback={
          <div className="glass-container">
            <div className="glass-effect delete-popup">
              <Loading
                size="60"
                strokeWidth="5"
                color="white"
                backgroud="#ccc"
              />
            </div>
          </div>
        }>
          <DeletePopup
            type={<><span>{props.name}</span> template</>}
            onCancel={() => setOpenDelete(false)}
            onOk={handleDelete}
          />
        </Suspense>
      )}
      <div className='template'>
        {isLoading === props._id && (
          <div className="loading-container">
            <Loading
              size="50"
              strokeWidth="3"
              color={"#ccc"}
              backgroud={"white"}
            />
          </div>
        )}
        <div className='temp-upper'>
          <p className='temp-name'>
            {props.name}
          </p>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}>
            <p className='temp-est'>
              {props.est}
            </p>
            <div className="menu">
              <button
                aria-label="toggle the task list menu"
                className="toggle-menu"
                onClick={() => setOpenMenu(om => !om)}>
                <CircularMenu />
              </button>
              {openMenu && (
                <div className="menu-content">
                  <div className="row">
                    {!user ? (
                      <>
                        <div style={{ padding: 10 }}>
                          <Loading
                            size="30"
                            strokeWidth="5"
                            color={"#ccc"}
                            backgroud="transparent"
                            paddingBlock='0'
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          aria-label='add to todo list'
                          onClick={hadnleAddToTodo}
                        >
                          <MdAddTask />
                          <p>Add to todo</p>
                        </button>
                        {user._id === props.userId && (
                          <>
                            <button
                              aria-label="edit button"
                              onClick={() => { }}
                            >
                              <FiEdit3 />
                              <p>Edit</p>
                            </button>
                            <button
                              aria-label="delet button"
                              onClick={toggleDelete}
                              style={{ color: 'red' }}
                              className="delete"
                            >
                              <MdDelete />
                              <p>Delete</p>
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='temp-desc'>
          <p>
            {props.description.length > 200 ? `${props.description.split(196)}...` : props.description}
          </p>
        </div>
        <div className='temp-lower'>
          <span>{hours.toFixed(1)} Hours</span>
          <span>{updated}</span>
        </div>
      </div>
    </>
  );
}

export default Template;
