import React, { lazy, useState, Suspense } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewTask, modifyTask } from "../../../actions/tasks";

import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';

import "./style.css";

import Loading from "../../../utils/Loading";
const MoreSetting = lazy(() => import("./MoreSetting"));

const initialData = {
  name: "",
  est: 1,
  notes: "",
  project: ""
}

const TaskForm = ({
  oldData,
  setOpen,
  isLoading,
  setIsLoading,
  setMessage,
  template,
  setTemplateData
}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(oldData === null ? initialData : oldData);
  const [openNotes, setOpenNotes] = useState(data.notes === "" ? false : true);
  const [openProject, setOpenProject] = useState(data.project === "" ? false : true);
  const [moreDetails, setMoreDetails] = useState(false);
  const [setting, setSetting] = useState(oldData === null && oldData?.tasks?.length > 0 ? null : oldData?.setting);

  const { activites, active } = useSelector(state => state.timer);

  const handleChange = (e) => {
    if (e.target.name === 'est' || e.target.name === 'act') {
      setData({ ...data, [e.target.name]: Number(e.target.value) });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  }

  const handleSave = (e) => {
    e.preventDefault();

    setOpen(ot => !ot);
    if (!data.name || !data.est) {
      setMessage("Error at name or est");
    }

    if (template) {
      data.template = template;
    }

    if (template !== 'new') {
      if (!oldData) {
        dispatch(addNewTask(data, setIsLoading, setMessage));
      } else {
        dispatch(modifyTask({ ...data, setting }, data._id, setIsLoading, setMessage));
      }
    } else {
      if (!oldData) {
        setTemplateData(t => ({ ...t, tasks: t.tasks.concat([{...data, id: t.tasks.length + 1}]) }));
      } else {
        setTemplateData(t => ({ ...t, tasks: [...t.tasks.filter(task => task.id !== data.id), data] }))
      }
    }
  }

  return (
    <>
      {isLoading === data?._id && (
        <div className="loading-container" style={{
          position: 'fixed',
          top: '0',
          right: '0',
          background: '#ffffff73',
          width: '100%',
          height: '100%',
          zIndex: '1000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Loading
            size="100"
            strokeWidth="5"
            color={activites[active].color}
            backgroud="transperent"
          />
        </div>
      )}
      <form className="task-form zoom-in" style={{ margin: oldData !== null && "20px 0 20px" }} onSubmit={handleSave}>
        <div className="form-container">
          <div className="form-inner-container">
            <div className="block" style={{ position: "relative" }}>
              <input
                autoFocus
                className={`${!data.name && 'error'} name`}
                maxLength="50"
                required
                name="name"
                type="text"
                value={data.name}
                placeholder="What is task title?"
                onChange={handleChange}
              />
              <div className="text-counter" style={{ color: `${50 - data?.name?.length > 10 ? "#0effe9" : "#ff002f"}` }}>
                <p
                  style={{ fontSize: "16px", fontWeight: "500", marginBottom: "15px" }}
                >{50 - data?.name?.length}</p>
              </div>
            </div>
            <div className="block">
              <p>
                {(!data.template?.todo && data.template) ? (<></>) : (
                  <>
                    {data.act >= 0 && <>act / </>}
                  </>
                )}
                est pomodoros
              </p>
              <div className="pomodoros">
                {(!data.template?.todo && data.template) ? (<></>) : (
                  <>
                    {data.act >= 0 && (
                      <div className="input-number">
                        <input
                          name="act"
                          className="act"
                          type="number"
                          min='0'
                          max="1000"
                          defaultValue={data.act}
                          disabled={data?.tasks?.length > 0}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {data.act >= 0 && (<>/</>)}
                  </>
                )}
                <div className="input-number">
                  <input
                    name="est"
                    required
                    className={`${!data.est && 'error'}`}
                    type="number"
                    min='1'
                    max="1000"
                    disabled={data?.tasks?.length > 0}
                    defaultValue={data.est}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="block">
              {openNotes && (
                <div className="notes">
                  <textarea name="notes" type='text' maxLength="500" onChange={handleChange} value={data.notes}></textarea>
                  <div className="text-counter" style={{ color: `${500 - data?.notes?.length > 100 ? "#0effe9" : "#ff002f"}` }}>
                    <p style={{ fontSize: "16px", fontWeight: "500" }}>{500 - data?.notes?.length}</p>
                  </div>
                </div>
              )}
              {(openProject) && (
                <div className="project">
                  <input name="project" type="text" onChange={handleChange} value={data.project} />
                </div>
              )}
              <div className="add-buttons">
                {!openNotes && (
                  <button
                    aria-label="add notes button"
                    type="button"
                    onClick={() => setOpenNotes(on => !on)}
                  >+ add notes</button>
                )}
                {(!openProject) && (
                  <button
                    aria-label="add project button"
                    type="button"
                    onClick={() => setOpenProject(on => !on)}
                  >+ add project</button>
                )}
              </div>
            </div>
            {data?.tasks?.length > 0 && (
              <>
                <Suspense fallback={
                  <Loading
                    size="100"
                    strokeWidth="5"
                    color={activites[active].color}
                    backgroud="transparent"
                  />
                }>
                  {moreDetails && (
                    <MoreSetting setting={setting} setSetting={setSetting} />
                  )}
                </Suspense>
                <div className="block more-details-container">
                  <button
                    className="more-details"
                    aria-label="more details template"
                    type="button"
                    onClick={() => setMoreDetails(s => !s)}>
                    {moreDetails ? "Less Details" : "More Details"}
                    {moreDetails ? (
                      <MdOutlineKeyboardArrowUp size="20" />
                    ) : (
                      <MdOutlineKeyboardArrowDown size="20" />
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="task-footer">
          <button
            aria-label="cancel form button"
            type="button"
            onClick={() => setOpen(o => !o)}
          >cancel</button>
          <button
            aria-label="submit form button"
            type="submit"
            className="save"
            disabled={!data.name || !data.est}
          >save</button>
        </div>
      </form>
    </>
  )
}

export default TaskForm;
