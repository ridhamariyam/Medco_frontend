import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoVideocam } from "react-icons/io5";
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { baseUrl, wsUrl } from '../../const/urls';
import AuthContext from '../../AuthContext/Authcontext';

function ChatDoccomponent() {

  const { username } = useParams();
  console.log('paraaaaaaaaaaa',username )
  const [recipientdetails, setRecipientDetails] = useState({})
  const [senderdetails, setSenderDetails] = useState({});
  const [senderid, setSenderId] = useState(null);
  const [recipientid, setRecipientId] = useState(null)
  const [clientstate, setClientState] = useState('');
  const [thread, setThread] = useState('');
  const [req, setReq] = useState('');
  const [messages, setMessages] = useState([]);
  const [docList, setdocList] = useState([]);
  
  const {user} = useContext(AuthContext)
  console.log(user, 'dfffffffffffff')
  const messageRef = useRef()

  const navigate=useNavigate()
 

  useEffect(()=>{
    return ()=>{
      console.log('chat closing function')
    }
  },[username, senderid, recipientid])

  const setUserProfileDetails = async () => {
    console.log('hi')
    axios.get(`${baseUrl}/chat/getuserdetails/${username}`).then((response) => {
        if (response.status == 200) {
            setRecipientDetails(response.data)
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}

const setSenderProfile = async () => {
    console.log('hi2')
    axios.get(`${baseUrl}/chat/getuserdetails/${user?.user_id}`).then((response) => {
        if (response.status == 200) {
            console.log(response.data, 'ddddddddddddddddddddddddddd')
            setSenderDetails(response.data)

        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}
const setList = async () => {
  let url

    url = `${baseUrl}/chat/getpatientchatlist/${user?.user_id}`

    axios.get(url).then((response) => {
        console.log('hi3')
        if (response.status == 200) {
            console.log(response.data, 'ddddddddddddddddddddddddddd')
            setdocList(response.data)

        }
    }).catch((error) => {
        console.error('Error:', error);
    });
}





useEffect(()=>{
    if (username){
  setUserProfileDetails()
  setSenderProfile()}
  setList()
},[username])

  const setUpChat = () => {
    console.log('setupchat');
    if (clientstate) {
      clientstate.close();
    }
    if (senderid !== null && recipientid !== null && senderid === user.user_id && recipientid === username){
    axios.get(`${baseUrl}/chat/user-previous-chats/${senderid}/${recipientid}`).then((response) => {
        if (response.status == 200) {
          console.log(response.data, 'dfffffffffjsdfhbjsdhfb')
            setMessages(response.data)
        }
    })

    const client = new W3CWebSocket(`${wsUrl}/ws/chat/${senderid}/?${recipientid}`);
    console.log('jfdkjkdj');
    setClientState(client)
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const currentDate = new Date();
      const isoString = currentDate.toISOString();
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_username: dataFromServer.senderUsername,
            send_at:isoString,
          },
        ]);
      }
    };

    client.onclose = () => {
      console.log('Websocket disconnected');
    }

    return () => {
      client.close();
    };
  }
  }


  useEffect(() => {
    setSenderId(user.user_id)
    setRecipientId(username)
    let thread_name = user.user_id > username ? `${user.user_id}_${username}` : `${username}_${user.user_id}`
    setThread(thread_name)
    
  }, [username])

  



  useEffect(() => {
    console.log('calling',senderid,recipientid)
    if (senderid != null && recipientid != null) {
    
      setUpChat()
    }
  }, [senderid, recipientid, username])

  


  const onButtonClicked = () => {

    if (messageRef.current.value.trim() == "") {
      return
    }
    clientstate.send(
      
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        receiverUsername: recipientdetails.email,
      })
      
    );
    messageRef.current.value = ''

  };
  const chatContainerRef = useRef();
  useEffect(() => {
    // Scroll to the bottom of the chat container
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight}
    
  );
  return (
    <div className="p-4 sm:ml-64 border">
      <div className="p-4 rounded-lg dark:border-yellow-700 mt-14">
        {/*  */}
        <div className="grid">
          <div className="flex rounded items-center border bg-gray-100 h-16 ">
            <h1 className="text-start font-bold  ml-5 font-sans text-gray-600 text-2xl">
            {recipientdetails?.first_name}
            </h1>
            <IoVideocam className="absolute right-14 text-3xl " />
          </div>
        </div>

        
        <div className="flex antialiased text-gray-800 mt-1">
          <div className="flex flex-row h-full w-full rounded overflow-x-hidden border bg-white">
            <div className="flex flex-col py-8 pl-6 pr-2 h-full w-64 bg-white flex-shrink-0">
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">QuickChat</div>
              </div>

              <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Active Conversations</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    4
                  </span>
                </div>
                    <div className="bg-white flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto" >
                {docList?.map((list)=>{
                      return(
                  <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" onClick={()=>navigate(`/DoctorChat/${list.account.id}`)}>
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      H
                    </div>
                    <div className="ml-2 text-sm font-semibold">{list.account.first_name}</div>
                  </button>)
                })}
                </div>
                

                
              </div>
            </div>
            <div className="flex flex-col flex-auto h-full p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 h-[400px] p-4">
                <div className="bg-white flex flex-col h-full overflow-x-auto mb-4"ref={chatContainerRef}>
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                    {messages.map((message) => {
                      if (message.sender_username === recipientdetails.email) {
                        return (
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-100 flex-shrink-0">
                            A
                          </div>
                          <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div>{message.message}</div>
                          </div>
                        </div>
                      </div>
                        )}
                        else{
                          return(
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
                          <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                            <div>{message.message}</div>
                          </div>
                        </div>
                      </div>)}})
                    }
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        ref={messageRef}
                      />
                      <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button onClick={onButtonClicked} className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                      <span>Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

export default ChatDoccomponent;
