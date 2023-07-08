import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTemplatesForUser } from '../../actions/templates';

import Loading from '../../utils/Loading';
import Message from '../../utils/Message';
import NetworkError from '../NetworkError/NetworkError';
import NoLogin from '../NoLogin/NoLogin';

import './style.css';

const NavBar = lazy(() => import('../NavBar/NavBar'));
const Template = lazy(() => import('./Template/Template.js'));
const TemplateForm = lazy(() => import('./TemplateForm/TemplateForm.js'))

function Templates() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({ message: "", type: "" })
  const [isLoading, setIsLoading] = useState(null);
  const [openFormForNew, setOpenFormForNew] = useState(false);
  const { userTemplates: { templates, total } } = useSelector(state => state.templates) || {};
  const {active, activites} = useSelector(state => state.timer);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (total === undefined && templates === undefined) {
        dispatch(getTemplatesForUser(1, setMessage));
      }
    }
    // eslint-disable-next-line
  }, [total]);

  if (templates === undefined && localStorage.getItem('token')) {
    return (
      <>
        {(!message.message) ?
          (
            <>
              <Loading
                size="100"
                strokeWidth="5"
                backgroud="transperent"
                color="#ffffff"
              />
            </>
          ) : (
            <>
              {(message.message && !message.message.includes('Network Error')) ? (
                <Message {...message} setMessage={setMessage} />
              ) : (
                <NetworkError />
              )}
            </>
          )
        }
      </>
    )
  }

  if (!localStorage.getItem('token')) {
    return (
      <NoLogin />
    )
  }

  return (
    <>
      {message.message && (
        <>
          {(!message.message.includes('Network Error')) ? (
            <Message {...message} setMessage={setMessage} />
          ) : (
            <NetworkError />
          )}
        </>
      )}
      <Suspense fallback={
        <Loading
          size="200"
          strokeWidth="5px"
          backgroud="transperent"
          color="#ffffff"
        />
      }>
        <NavBar />
        <div className='container'>
          <div className='templates-container'>
            {templates?.map((temp) => (
              <Template
                {...temp}
                key={temp._id}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setMessage={setMessage}
              />
            ))}
          </div>
        </div>
        {openFormForNew && (
          <Suspense fallback={
            <div className="glass-container">
              <div className="glass-effect temp-form">
                <Loading
                  size="100"
                  strokeWidth="4"
                  backgroud="#e7e7e7"
                  color={activites[active]?.color}
                />
              </div>
            </div>
          }>
            <TemplateForm
              setOpen={setOpenFormForNew}
              oldData={null}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setMessage={setMessage}
            />
          </Suspense>
        )}
      </Suspense>
    </>
  );
}

export default Templates;
