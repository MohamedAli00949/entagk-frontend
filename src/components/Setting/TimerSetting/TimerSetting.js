import React, { Suspense, lazy } from 'react';

import { LONG, PERIOD, SHORT } from "../../../actions/timer";

import Loading from '../../../utils/Loading/Loading';

const Select = lazy(() => import('../Select/Select'));
const TimeInputs = lazy(() => import('../TimeInputs/timeInputs'));
const ToggleButton = lazy(() => import('../ToggleButton/ToggleButton'));

const TimerSetting = ({ handleChange, data, setData }) => {
  const automations = [
    {
      type: "autoBreaks",
      name: "Auto start breaks"
    },
    {
      type: "autoPomodors",
      name: "Auto start pomodoros"
    },
    {
      type: "autoStartNextTask",
      name: "Auto start next task"
    }
  ]

  return (
    <>
      {data?.format && (
        <div className='block' style={{ flexDirection: "row" }}>
          <h3>Timer format</h3>
          <Suspense fallback={
            <Loading
              size="small"
              color={"#fff"}
              backgroud="transparent"
              paddingBlock='0'
            />
          }>
            <Select
              options={["analog", "digital"]}
              type="format"
              data={data}
              setData={setData}
              setChange={() => { }}
              width="106px"
            />
          </Suspense>
        </div>
      )}
      <div className='block'>
        <div className='time-inputs'>
          {[PERIOD, SHORT, LONG].map((item, index) => (
            <div className='time' key={index}>
              <h4>{index === 0 ? 'Pomodoro' : item.toLocaleLowerCase()}</h4>
              <Suspense fallback={
                <Loading
                  size="small"
                  color={"#fff"}
                  backgroud="transparent"
                  paddingBlock='0'
                />
              }>
                <TimeInputs
                  name={item}
                  data={data}
                  setData={setData}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
      <div className='block' style={{ flexDirection: "row" }}>
        <h3>Long Break Interval</h3>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: 'fit-content'
        }}>
          <input
            className={data?.longInterval <= 0 ? 'error' : undefined}
            name='longInterval'
            type="number"
            min="1"
            max="100"
            defaultValue={data?.longInterval}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='block'>
        {automations.map((auto, index) => (
          <div style={{
            border: index === automations.length - 1 ? 'none' : '',
            marginBottom: index + 1 !== automations.length ? '10px' : "0"
          }} key={index}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}>
              <h3 style={{ width: 'fit-content' }}>{auto.name}</h3>
              <Suspense fallback={
                <Loading
                  size="small"
                  color={"#fff"}
                  backgroud="transparent"
                  paddingBlock='0'
                />
              }>
                <ToggleButton
                  type={auto.type}
                  data={data}
                  setData={setData}
                />
              </Suspense>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TimerSetting;
