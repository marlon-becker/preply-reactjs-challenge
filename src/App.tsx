import React, { useEffect, useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import useIsOnlineNotification from './hooks/isOnlineNotification';
import OnlineStatusMock from './OnlineStatusMock';
import './App.css';

interface Props {
  isOnline: boolean
}

type withOnlineStatusType = (
  WrappedComponent: React.FunctionComponent<Props>
) => () => JSX.Element

const withOnlineStatus: withOnlineStatusType = (WrappedComponent) => {
  return () => {
    const [
      isOnlineNotification,
      setIsOnlineNotification,
    ] = useIsOnlineNotification();
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
      // @ts-ignore
      setIsOnlineNotification(isOnline)
    }, [isOnline, setIsOnlineNotification])

    return (
      <>
        <OnlineStatusMock
          onIsOnlineChange={(isOnline: React.SetStateAction<boolean>) =>
            setIsOnline(isOnline)
          }
        />
        { /* @ts-ignore */}
        <WrappedComponent isOnline={isOnlineNotification}/>
      </>
    )
  }
}

const App: React.FunctionComponent<Props> = (props) => {
  const { isOnline } = props;

  useEffect(() => {
    NotificationManager.info(isOnline ? 'Online' : 'Offline');
  }, [isOnline]);

  return (
    <>
      <div className={isOnline ? 'online' : 'offline'}>
        {isOnline ? 'Online' : 'Offline'}
        <NotificationContainer />
      </div>
    </>
  )
}

export default withOnlineStatus(App);
