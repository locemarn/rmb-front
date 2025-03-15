import { useAppContext } from "@/store/global/global.provider"

export default function NotificationComponent() {
  const {getNotification, handlerNotification} = useAppContext()
  const {isVisible, message} = getNotification()
  
  return (
    <>
      {isVisible && (
        <div className="notification is-danger is-light mt-4 mr-4">
          <button className="delete" onClick={() => handlerNotification(false, '')}></button>
          {message}
        </div>)
      }
    </>  
  )
}