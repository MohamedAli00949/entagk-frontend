import React from 'react';

// import { GrFormCheckmark } from 'react-icons/gr';

import { FaCheck } from 'react-icons/fa'
import './style.css';
import Loading from '../../../../utils/Loading';
import { useSelector } from 'react-redux';

function CompletedStatus({ data, setIsLoading, isLoading, setOpen }) {
  const { active, activites } = useSelector(state => state.timer);

  if (isLoading) {
    return (
      <Loading
        color={activites[active].color}
        backgroud="transparent"
        size="200"
        strokeWidth="2.5"
      />
    )
  }

  return (
    <div className='completed-status'>
      <div className='icon'>
        <FaCheck color='lime' />
      </div>
      <h3>Success</h3>
      <p>
        {data?._id ? (
          <>
            The <strong>{data?.name}</strong> template has been edited successfully.
          </>
        ) : (
          <>
            {/* A new template has been added successfully. */}
          </>
        )}
      </p>
      <div>
        <button aria-label='close popup' className='close' onClick={() => setOpen(false)}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CompletedStatus;
