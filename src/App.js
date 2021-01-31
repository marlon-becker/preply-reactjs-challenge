import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import useIsOnlineNotification from "./hooks/isOnlineNotification";
import OnlineStatusMock from "./OnlineStatusMock";
import "./App.css";

const withOnlineStatus = (WrappedComponent) => {
  const WithOnlineStatus = (props) => {
    const [
      isOnlineNotification,
      setIsOnlineNotification
    ] = useIsOnlineNotification(false);
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
      setIsOnlineNotification(isOnline);
    }, [isOnline, setIsOnlineNotification]);

    return (
      <>
        <OnlineStatusMock
          onIsOnlineChange={(isOnline) => setIsOnline(isOnline)}
        />
        <WrappedComponent {...props} isOnline={isOnlineNotification} />
      </>
    );
  };

  return WithOnlineStatus;
};

const App = (props) => {
  const { isOnline } = props;

  useEffect(() => {
    NotificationManager.info(isOnline ? "Online" : "Offline");
  }, [isOnline]);

  return (
    <>
      <div className={isOnline ? "online" : "offline"}>
        {isOnline ? "Online" : "Offline"}
        <NotificationContainer />
      </div>
    </>
  );
};

export default withOnlineStatus(App);
