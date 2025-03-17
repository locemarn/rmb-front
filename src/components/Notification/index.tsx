import { useAppContext } from "@/store/global/global.provider"

export default function NotificationComponent() {
  const {getNotification, handlerNotification} = useAppContext()
  const {isVisible, message, notificationType } = getNotification()
  
  return (
    <>
      {isVisible && (
        <div className={`notification is-light mt-4 mr-4 ${notificationType}`}>
          <button className="delete" onClick={() => handlerNotification(false, '', 'is-success')}></button>
          {message}
        </div>)
      }
    </>  
  )
}