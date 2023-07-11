import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { getTemplatesForUser } from '../../actions/templates';

import Loading from '../../utils/Loading';
import Message from '../../utils/Message';
import NetworkError from '../NetworkError/NetworkError';
import NoLogin from '../NoLogin/NoLogin';

import './style.css';

const NavBar = lazy(() => import('../NavBar/NavBar'));
const Template = lazy(() => import('./Template/Template.js'));
const TemplateForm = lazy(() => import('./TemplateForm/TemplateForm.js'))
const SearchBar = lazy(() => import('./SearchBar/SearchBar'));

function Templates() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({ message: "", type: "" })
  const [isLoadingTemp, setIsLoadingTemp] = useState(null);
  const [openFormForNew, setOpenFormForNew] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { userTemplates: { templates, total }, isLoading } = useSelector(state => state.templates) || {};
  const { active, activites } = useSelector(state => state.timer);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (total === undefined && templates === undefined) {
        const sort = searchParams.get('sort')
        dispatch(getTemplatesForUser(sort, 1, setMessage));
      }
    }
    // eslint-disable-next-line
  }, [total]);

  if (templates === undefined && localStorage.getItem('token')) {
    return (
      <>
        {(!message.message.includes('Network Error')) ?
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
          size="100"
          strokeWidth="5px"
          backgroud="transperent"
          color="#ffffff"
        />
      }>
        <NavBar />
        <div className='container'>
          <SearchBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            setOpenFormForNew={setOpenFormForNew}
          />
          {isLoading ? (
            <div style={{
              width: "100%",
              margin: "30px",
            }}>
              <Loading
                size="100"
                strokeWidth="5"
                backgroud="transperent"
                color="#ffffff"
              />
            </div>
          ) : (
            <div className='templates-container'>
              {templates?.map((temp) => (
                <Template
                  {...temp}
                  key={temp._id}
                  isLoading={isLoadingTemp}
                  setIsLoading={setIsLoadingTemp}
                  setMessage={setMessage}
                />
              ))}
            </div>
          )}
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
              isLoading={isLoadingTemp}
              setIsLoading={setIsLoadingTemp}
              setMessage={setMessage}
            />
          </Suspense>
        )}
      </Suspense>
    </>
  );
}

export default Templates;
