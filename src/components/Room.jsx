import React, { useContext, useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import AuthContext from '../AuthContext/Authcontext';


const Room = () => {
  const { RoomId } = useParams();
  const { user } = useContext(AuthContext);
  const zpRef = useRef(null);
  const meetingContainerRef = useRef(null);

  useEffect(() => {
    const initializeZego = async () => {
    console.log('Before create:', zpRef.current);
    console.log(user);
      const appID = 841344454; 
      const serverSecret = 'eba48eba736d8456b4204eae5357bce5';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        RoomId,
        Date.now().toString(),
        user?.username
      );

      zpRef.current = ZegoUIKitPrebuilt.create(kitToken);
      console.log('ds create:', zpRef.current);
      zpRef.current.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [
            {
              name: 'Personal link',
              url:
               window.location.protocol + '//' + 
               window.location.host + window.location.pathname 
                
            },
          ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        showPreJoinView: true,
      });
    };

    initializeZego();

    return () => {
      zpRef.current?.hangUp();
      zpRef.current?.destroy();
      console.log('hangup function');
    };
  }, [RoomId, user?.username]);

  return (
    <>
    <div
      className="myCallContainer"
      ref={meetingContainerRef}
      style={{ width: '100vw', height: '100vh', marginTop: '30px' }}
    ></div></>
  );
};

export default Room;